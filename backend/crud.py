from sqlalchemy.orm import Session
from . import models, schemas

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_locations(db: Session):
    return db.query(models.Location).all()

def get_products_by_search(db: Session, query: str):
    return db.query(models.Product).filter(models.Product.name.ilike(f'{query}%')).all()

def get_product_by_id(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(
        name=product.name,
        supplier=product.supplier,
        description=product.description,
        website=product.website,
        category_id=product.category_id,
        quantity=product.quantity,
        required_by=product.required_by,
        location_id=product.location_id,
        required_for=product.required_for,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product