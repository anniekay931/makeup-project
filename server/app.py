from flask import Flask, jsonify, make_response, request, json
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
        return jsonify(access_token=access_token, user=user.to_dict()), 200
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

    try:
        new_product = Product(
            name=data['name'],
            category=data['category'],
            description=data['description'],
            price=data['price'],
            brand_id=data['brand_id'], 
            image=data['image']
        )

        db.session.add(new_product)
        db.session.commit()

        product_dict = new_product.to_dict()

        response = make_response(
            jsonify(product_dict),
            201
        )

    except Exception as e:
        print("Error:", str(e))
        response = make_response(
            {'error': str(e)},
            400
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

@app.route('/products/<int:id>', methods = ['PUT'])
def productById(id):
    product = Product.query.get(id)

    if product:
        data = request.get_json()

        try:

            print("Before update:", product)
            product.name = data['name']
            product.image = data['image']
            product.brand_id = data['brand_id']
            product.description = data['description']
            product.price = data['price']

            db.session.commit()

            print("After update:", product)

            response = make_response(
                jsonify(product.to_dict()),
                200
                )
            
        except Exception as e:
            response = make_response(
                {'error': str(e)},
                400
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

@app.route('/routine', methods=['GET', 'POST', 'PUT', 'DELETE'])
# @jwt_required()
def handle_routine():
    if request.method == 'GET':
        # Retrieve all UserProduct entries for the logged-in user
        user_id = 53
        user_products = UserProduct.query.filter_by(user_id=user_id).all()
        return jsonify([user_product.to_dict() for user_product in user_products])

    if request.method == 'POST':
        # Create a new UserProduct entry for the logged-in user
        data = request.json
        user_id = 53
        data = request.get_json()
        new_user_product = UserProduct(user_id=user_id, product_id=data['product_id'], step_id=data['step_id'])
        db.session.add(new_user_product)
        db.session.commit()
        return jsonify(new_user_product.to_dict()), 201

    if request.method == 'PUT':
        # Update an existing UserProduct entry for the logged-in user
        data = request.get_json()
        user_product_id = data['id']
        user_id = 53
        user_product = UserProduct.query.filter_by(id=user_product_id, user_id=user_id).first()

        if not user_product:
            return jsonify({"error": "UserProduct not found"}), 404

        user_product.product_id = data['product_id']
        user_product.step_id = data['step_id']
        db.session.commit()
        return jsonify(user_product.to_dict())

    if request.method == 'DELETE':
        # Delete a UserProduct entry for the logged-in user
        user_product_id = request.args.get('id')
        user_id = 53
        user_product = UserProduct.query.filter_by(id=user_product_id, user_id=user_id).first()

        if not user_product:
            return jsonify({"error": "UserProduct not found"}), 404

        db.session.delete(user_product)
        db.session.commit()
        return jsonify({"message": "UserProduct deleted"}), 200
    
@app.errorhandler(Exception)
def handle_exception(e):
    response = {
        'message': str(e),
        'type': type(e).__name__
    }
    return jsonify(response), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True) 