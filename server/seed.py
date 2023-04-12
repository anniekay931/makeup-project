#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import User, Brand, Product, UserProduct

if __name__ == '__main__':
    fake = Faker()
    def create_users(num_users):
        for _ in range(num_users):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password(length=10)
            )
            db.session.add(user)
        db.session.commit()

    def create_brands(num_brands):
        for _ in range(num_brands):
            brand = Brand(name=fake.company())
            db.session.add(brand)
        db.session.commit()

    def create_products(num_products, num_brands):
        for _ in range(num_products):
            product = Product(
                name=fake.word(),
                brand_id=randint(1, num_brands),
                category=fake.word(),
                description=fake.sentence()
            )
            db.session.add(product)
        db.session.commit()

    def create_user_products(num_user_products, num_users, num_products):
        for _ in range(num_user_products):
            user_product = UserProduct(
                user_id=randint(1, num_users),
                product_id=randint(1, num_products),
                step_id=randint(1, 10)
            )
            db.session.add(user_product)
        db.session.commit()

if __name__ == '__main__':
    num_users = 10
    num_brands = 5
    num_products = 20
    num_user_products = 30

    with app.app_context():
        print("Starting seed...")

        create_users(num_users)
        create_brands(num_brands)
        create_products(num_products, num_brands)
        create_user_products(num_user_products, num_users, num_products)

        print("Seed complete!")