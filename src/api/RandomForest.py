import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib


# Load Data (replace with your own dataset)
data = pd.read_csv('melb_data.csv')

# Remove null Values
data = data.dropna()
# Remove rows where values are 0, and when the building area is more than the land size.
data = data[(data['Price'] != 0) & (data['Rooms'] != 0)& (data['Landsize'] != 0)& (data['BuildingArea'] < data['Landsize']) & (data['YearBuilt'] != 0) & (data['BuildingArea'] != 0)]

# Data Cleaning, by removing outliers with IQR, and 
numeric_data = data.select_dtypes(include=['float64', 'int64'])# Select only numeric columns to perform cleaning

# Calculate Q1 (25th percentile) and Q3 (75th percentile)
Q1 = numeric_data.quantile(0.25)
Q3 = numeric_data.quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# Remove outliers
data = data[~((numeric_data < lower_bound) | (numeric_data > upper_bound)).any(axis=1)]
houses = data[data['Type'] == 'h']
townhouses = data[data['Type'] == 't']
units = data[data['Type'] == 'u']

#function to define X and Y variables for each data set
def prepare_data(df):
    X = df[['Distance', 'BuildingArea', 'Landsize', 'YearBuilt', 'Rooms', 'Longtitude', 'Lattitude']]
    y = df['Price']
    return X, y

X_h, y_h = prepare_data(houses)
X_t, y_t = prepare_data(townhouses)
X_u, y_u = prepare_data(units)

#Function to train random forest models
def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model, X_test, y_test

#Evaluate mse and R^2 score
def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"r2 score: {r2}")
    print(f"msescore: {mse}")
    return mse, r2

class RandomForestModel:
    def __init__(self):
        #Initialize models
        self.rf_h = RandomForestRegressor()
        self.rh_u = RandomForestRegressor()
        self.rf_t = RandomForestRegressor()
        
    
    def train(self):
        #Initialize models for each housing type and training split
        self.rf_h, self.X_test_h, self.y_test_h = train_model(X_h, y_h)
        self.rf_t, self.X_test_t, self.y_test_t = train_model(X_t, y_t)
        self.rf_u, self.X_test_u, self.y_test_u = train_model(X_u, y_u)
        
        #Measure/evaluate mse and r2 score
        self.mse_h, self.r2_h = evaluate_model(self.rf_h, self.X_test_h, self.y_test_h)
        self.mse_t, self.r2_t = evaluate_model(self.rf_t, self.X_test_t, self.y_test_t)
        self.mse_u, self.r2_u = evaluate_model(self.rf_u, self.X_test_u, self.y_test_u)

        #Save models usinh joblib
        joblib.dump([self.rf_h, self.rf_u, self.rf_t], 'models.joblib')
        
    def predict_price(self, type, distance, building_area, land_size, year_built, rooms, longtitude, lattitude):
        
        #Load Models
        rf_h, rf_u, rf_t = joblib.load('models.joblib')

        if(type == "House"):
            model = rf_h
        elif(type == "Unit"):
            model = rf_u
        elif(type == "Townhouse"):
            model = rf_t
        else:
            raise ValueError("Invalid property type specified.")
        
        # Create a DataFrame from the input parameters
        input_data = pd.DataFrame({
            'Distance': [distance],
            'BuildingArea': [building_area],
            'Landsize': [land_size],
            'YearBuilt': [year_built],
            'Rooms': [rooms],
            'Longtitude': [longtitude],
            'Lattitude': [lattitude]
        })
        
        # Make the prediction
        predicted_price = model.predict(input_data)
        print(f"Predicted Price for Property: ${predicted_price[0]:,.2f}")
        
        return predicted_price[0]
    
if __name__ == "__main__":
    model = RandomForestModel()
    model.train()



