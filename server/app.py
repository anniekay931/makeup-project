from flask import jsonify, make_response
from config import app, db
from models import User, UserProduct, Brand, Product

@app.route("/")
def hello():
    return jsonify(message="hello")

@app.route('/users', methods = ['GET'])
def users():
    users = User.query.all()
    users_dict = [user.to_dict() for user in users]

    response = make_response(
        jsonify(users_dict),
        200
    )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
