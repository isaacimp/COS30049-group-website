import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd


# Load dataset
data = pd.read_csv('melb_data.csv')

# Handle missing values
data = data.dropna()
print(data.isnull().sum())

# Remove rows where 'Price' or 'Bedrooms' is 0
data = data[(data['Price'] != 0) & (data['Rooms'] != 0)& (data['Landsize'] != 0)& (data['BuildingArea'] < data['Landsize']) & (data['YearBuilt'] != 0) & (data['BuildingArea'] != 0)]

# Select only numeric columns
numeric_data = data.select_dtypes(include=['float64', 'int64'])

# Calculate Q1 (25th percentile) and Q3 (75th percentile)
Q1 = numeric_data.quantile(0.25)
Q3 = numeric_data.quantile(0.75)
IQR = Q3 - Q1

# Define bounds for outliers
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# Remove outliers
data = data[~((numeric_data < lower_bound) | (numeric_data > upper_bound)).any(axis=1)]

houses = data[data['Type'] == 'h']
townhouses = data[data['Type'] == 't']
units = data[data['Type'] == 'u']

# Create a pair plot of selected features and target variable
plt.figure(figsize=(10, 6))
sns.pairplot(houses[['Distance', 'BuildingArea', 'Landsize', 'YearBuilt', 'Rooms', 'Price']])
plt.show()
sns.pairplot(townhouses[['Distance', 'BuildingArea', 'Landsize', 'YearBuilt', 'Rooms', 'Price']])
plt.show()
sns.pairplot(units[['Distance', 'BuildingArea', 'Landsize', 'YearBuilt', 'Rooms', 'Price']])
plt.show()

sns.scatterplot(x='Longtitude', y='Lattitude', hue='Price', palette='coolwarm', data=data)
plt.title('Geographical Distribution of House Prices')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.show()