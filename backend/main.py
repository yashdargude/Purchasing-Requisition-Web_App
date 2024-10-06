from fastapi import FastAPI, Depends

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud
from .database import engine, get_db

# Initialize the models and create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)



# Routes
@app.get("/categories", response_model=List[schemas.CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)

@app.get("/locations", response_model=List[schemas.LocationOut])
def get_locations(db: Session = Depends(get_db)):
    return crud.get_locations(db)

@app.get("/products/search", response_model=List[schemas.ProductOut])
def search_products(query: str, db: Session = Depends(get_db)):
    return crud.get_products_by_search(db, query)

@app.post("/products", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@app.get("/products/{product_id}", response_model=schemas.ProductOut)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product