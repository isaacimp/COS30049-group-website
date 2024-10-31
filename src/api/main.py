from RandomForest import RandomForestModel
from fastapi import FastAPI, HTTPException, Depends, Request, Form
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import BackgroundTasks
import time
import uvicorn

app = FastAPI()

#Defining Pydantic Models
class PredictionRequest(BaseModel):
    Type: str
    Distance: float
    BuildingArea: float
    LandSize: float
    YearBuilt: int
    Rooms: int
    Longitude: float
    Lattitude: float

#Database Connection
def get_db():
    db = "Database Connection"
    return db

#Middleware, used to calculate the time it takes to process requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"Request: {request.url} - Duration: {process_time} seconds")
    return response

#Exception Handler for errors
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "error": "An error occurred"})

#Initialize Model
model = RandomForestModel()

#Root message
@app.get("/")
async def root():
    return {"message": "Welcome to our House Price Prediction Website"}

@app.post("/predict/")
async def predict( 
    Type: str = Form(...), 
    Distance: float = Form(...), 
    BuildingArea: float = Form(...), 
    LandSize: float = Form(...), 
    YearBuilt: int = Form(...), 
    Rooms: int = Form(...), 
    Longitude: float = Form(...), 
    Lattitude: float = Form(...)
    ):
    try:
        price = model.predict_price(Type, Distance, BuildingArea, LandSize, YearBuilt, Rooms, Longitude, Lattitude)
        return {"predicted_price": price}
    except Exception as e:
        print("Prediction error:", e)
        raise HTTPException(status_code=500, detail="Prediction failed")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)