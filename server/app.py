from flask import Flask, jsonify, make_response, request
from config import app, db, jwt
from models import User, UserProduct, Brand, Product
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
import os

jwt.init_app(app)
os.environ['JWT_SECRET_KEY'] = '12345'

@app.route("/")
def hello():
    return jsonify(message="hello")

#LOGIN 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(
            {'error': 'Invalid username or password'},
            401
        )

# USER ENDPOINTS
# 1. GET: Retrieves all users
@app.route('/users', methods = ['GET'])
def get_users():
    users = User.query.all()
    users_dict = [user.to_dict() for user in users]

    response = make_response(
        jsonify(users_dict),
        200
    )

    return response

# 2. POST: Create a new user
@app.route('/users', methods = ['POST'])
def create_user():
    data = request.get_json()

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )

    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()
    access_token = create_access_token(identity=user_dict['id'])

    response = make_response(
        jsonify(access_token),
        201
    )

    return response

# 3. GET: Retrieve a signle user by ID
@app.route('/users/<int:id>', methods = ['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()

    if user:

        user_dict = user.to_dict()

        response = make_response(
            jsonify(user_dict),
            200
        )

    else:

        response = make_response(
            {'error': 'User not found'},
            404
        )

    return response

# 4. PUT: Update a user by ID
@app.route('/users/<int:id>', methods = ['PUT'])
def userById(id):
    user = User.query.filter_by(id = id).first()

    if user:

        data = request.get_json()

        user.username = data['username']
        user.email = data['email']
        user.password = data['password']

        db.session.commit()

        response = make_response(
            jsonify(user.to_dict()),
            200
            )
        
    else:

        response = make_response(
            {'error': 'User not found'},
            404
        )
        
    return response

# 5. DELETE: Delete a user by ID
@app.route('/users/<int:id>', methods = ['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id = id).first()

    if user:

        db.session.delete(user)
        db.session.commit()

        response = make_response(
            {},
            200
        )
    else:

        response = make_response(
            {'error': 'User not found'},
            404
        )

    return response

# BRAND ENDPOINTS

# 1. GET: Retrieves all brands
@app.route('/brands', methods = ['GET'])
def get_brands():
    brands = Brand.query.all()
    brands_dict = [brand.to_dict() for brand in brands]

    response = make_response(
        jsonify(brands_dict),
        200
    )

    return response

# 2. POST: Create a new brand
@app.route('/brands', methods = ['POST'])
def create_brand():
    data = request.get_json()

    new_brand = Brand(
      name=data['name']
    )

    db.session.add(new_brand)
    db.session.commit()

    brand_dict = new_brand.to_dict()

    response = make_response(
        jsonify(brand_dict),
        201
    )

    return response

# 3. GET: Retrieve a signle brand by ID
@app.route('/brands/<int:id>', methods = ['GET'])
def get_brand(id):
    brand = Brand.query.filter_by(id=id).first()

    if brand:

        brand_dict = brand.to_dict()

        response = make_response(
            jsonify(brand_dict),
            200
        )

    else:

        response = make_response(
            {'error': 'Brand not found'},
            404
        )

    return response

# 4. PUT: Update a brand by ID
@app.route('/brands/<int:id>', methods = ['PUT'])
@jwt_required()
def brandById(id):
    brand = Brand.query.filter_by(id = id).first()

    if brand:

        data = request.get_json()

        brand.name = data['name']

        db.session.commit()

        response = make_response(
            jsonify(brand.to_dict()),
            200
            )
        
    else:

        response = make_response(
            {'error': 'Brand not found'},
            404
        )
        
    return response

# 5. DELETE: Delete a brand by ID
@app.route('/brands/<int:id>', methods = ['DELETE'])
@jwt_required()
def delete_brand(id):
    brand = Brand.query.filter_by(id = id).first()

    if brand:

        db.session.delete(brand)
        db.session.commit()

        response = make_response(
            {},
            200
        )
    else:

        response = make_response(
            {'error': 'Brand not found'},
            404
        )

    return response

# PRODUCT ENDPOINTS

# 1. GET: Retrieves all products
@app.route('/products', methods = ['GET'])
def get_products():
    products = Product.query.all()
    products_dict = [product.to_dict() for product in products]

    response = make_response(
        jsonify(products_dict),
        200
    )

    return response

# 2. POST: Create a new product
@app.route('/products', methods = ['POST'])
def create_product():
    data = request.get_json()

    new_product = Product(
      name=data['name'],
      image=data['image'],
      price=data['price'],
      category=data['category'],
      description=data['description'],
      brand_id=data['brand_id']
    )

    db.session.add(new_product)
    db.session.commit()

    product_dict = new_product.to_dict()

    response = make_response(
        jsonify(product_dict),
        201
    )

    return response

# 3. GET: Retrieve a signle product by ID
@app.route('/products/<int:id>', methods = ['GET'])
def get_product(id):
    product = Product.query.filter_by(id=id).first()

    if product:

        product_dict = product.to_dict()

        response = make_response(
            jsonify(product_dict),
            200
        )

    else:

        response = make_response(
            {'error': 'Product not found'},
            404
        )

    return response

# 4. PUT: Update a product by ID
@app.route('/products/<int:id>', methods = ['PUT'])
def productById(id):
    product = Product.query.get(id)

    if product:

        data = request.get_json()

        print("Before update:", product)
        product.name = data['name']

        product.name = data['name']
        product.image = data['image']
        product.brand_id = data['brand_id']
        product.category = data['category']
        product.description = data['description']
        product.price = data['price']
        

        db.session.commit()

        print("After update:", product)

        response = make_response(
            jsonify(product.to_dict()),
            200
            )
        
    else:

        response = make_response(
            {'error': 'Product not found'},
            404
        )
        
    return response

# 5. DELETE: Delete a product by ID
@app.route('/products/<int:id>', methods = ['DELETE'])
def delete_product(id):
    product = Product.query.filter_by(id = id).first()

    if product:

        db.session.delete(product)
        db.session.commit()

        response = make_response(
            {},
            200
        )

    else:

        response = make_response(
            {'error': 'Product not found'},
            404
        )

    return response

# USERPRODUCT ENDPOINTS

# 1. GET: Retrieves all user_products
@app.route('/user_products', methods = ['GET'])
def get_user_products():
    user_products = UserProduct.query.all()
    user_products_dict = [user_product.to_dict() for user_product in user_products]

    response = make_response(
        jsonify(user_products_dict),
        200
    )

    return response

# 2. POST: Create new user_products
@app.route('/user_products', methods=['POST'])
def create_user_products():
    try:
        data = request.get_json()
        new_user_products = []
        for item in data:
            new_user_product = UserProduct(
                user_id=item['user_id'],
                product_id=item['product_id'],
                step_id=item['step_id']
            )
            db.session.add(new_user_product)
            new_user_products.append(new_user_product)
        db.session.commit()
        user_products_dict = [user_product.to_dict() for user_product in new_user_products]
        response = make_response(jsonify(user_products_dict), 201)
        return response
    except TypeError as e:
        error_dict = {"error": "Invalid data format. Please provide user_id, product_id, and step_id as integers."}
        response = make_response(jsonify(error_dict), 400)
        return response

# 3. GET: Retrieve a signle user_product by ID
@app.route('/user_products/<int:id>', methods = ['GET'])
def get_user_product(id):
    user_product = UserProduct.query.filter_by(id=id).first()

    if user_product:

        user_product_dict = user_product.to_dict()

        response = make_response(
            jsonify(user_product_dict),
            200
        )

    else:

        response = make_response(
            {'error': 'UserProduct not found'},
            404
        )

    return response

# 4. PUT: Update a user_product by ID
@app.route('/user_products/<int:id>', methods = ['PUT'])
def user_productById(id):
    user_product = UserProduct.query.filter_by(id = id).first()

    if user_product:

        data = request.get_json()

        user_product.user_id = data['user_id']
        user_product.product_id = data['product_id']
        user_product.step_id = data['step_id']
        user_product.image = data['image']

        db.session.commit()

        response = make_response(
            jsonify(user_product.to_dict()),
            200
            )
        
    else:

        response = make_response(
            {'error': 'UserProduct not found'},
            404
        )
        
    return response

# 5. DELETE: Delete a user_product by ID
@app.route('/user_products/<int:id>', methods = ['DELETE'])
def delete_user_product(id):
    user_product = UserProduct.query.filter_by(id = id).first()

    if user_product:

        db.session.delete(user_product)
        db.session.commit()

        response = make_response(
            {},
            200
        )

    else:

        response = make_response(
            {'error': 'UserProduct not found'},
            404
        )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)