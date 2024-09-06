import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.linear_model import LinearRegression
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures

HousingData = pd.read_csv("melb_data.csv", usecols=["Rooms","Type", "Price","Distance","Landsize", "Car","BuildingArea", "YearBuilt"])
HousingData.dropna(subset = ["Rooms","Type", "Price","Distance","Landsize", "Car","BuildingArea", "YearBuilt"], inplace=True)

X = HousingData[["Rooms","Distance","Landsize", "Car","BuildingArea", "YearBuilt"]].values
y = HousingData["Price"].values

poly = PolynomialFeatures(degree=10)
x_poly = poly.fit_transform(X)

regr = LinearRegression()
regr.fit(x_poly, y)

new_data = np.array([[3,20,1000,1,700,2000]])  # Example values for median income, house age, and average rooms
new_data_poly = poly.transform(new_data)

pre = regr.predict(new_data_poly)
print(pre)


