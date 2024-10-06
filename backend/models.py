from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    supplier = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    website = Column(String(255), nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    quantity = Column(Integer, nullable=False)
    required_by = Column(DateTime, nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"))
    required_for = Column(String(255), nullable=False)

    category = relationship("Category")
    location = relationship("Location")