from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Category Schemas
class CategoryOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

# Location Schemas
class LocationOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    supplier: str
    description: Optional[str]
    website: Optional[str]
    category_id: int
    quantity: int
    required_by: datetime
    location_id: int
    required_for: str

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int

    class Config:
        orm_mode = True