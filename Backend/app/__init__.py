from flask import Flask, request,jsonify
from flask_jwt_extended import create_access_token, JWTManager,get_jwt,unset_jwt_cookies, jwt_required,get_jwt_identity
from flask_cors import CORS
from config import Config
from models import db, User
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
jwt = JWTManager(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/logintoken', methods=['POST'])
def create_token():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    
    user = User.query.filter_by(email= email).first()
    
    if user is None:
        return jsonify({"error":"Wrong email or password"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({"error":"Wrong password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token" : access_token,
        "email": email,  
}),201
    
@app.route('/signup', methods=['POST'])
def signup():
    try:
        email = request.json["email"]
        password = request.json["password"]
        name = request.json["name"]
        
        user_exist = User.query.filter_by(email=email).first()
        
        if user_exist:
            return jsonify({"error": "Email already exists"}), 409

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password, name=name)
        # access_token = create_access_token(identity=new_user.email)
        # new_user.token = access_token
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "email": new_user.email,
            "password": new_user.password,
            "name": new_user.name,
            "id": new_user.id,
            # "access_token": new_user.token
        }), 201

    except Exception as e:
        # Log the exception for debugging
        app.logger.error(f"Error in signup route: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500
       
# @app.route('/signup', methods=['POST'])
# def signup():
#     email = request.json["email"]
#     password = request.json["password"]
#     name = request.json["name"]
    
#     user_exist = User.query.filter_by(email= email).first() is not None
    
#     if user_exist:
#         return jsonify({"error":"email already exists"}), 409

#     hashed_password = generate_password_hash(password)
#     new_user = User(email=email, password=hashed_password, name=name)
#     access_token = create_access_token(identity=new_user.email)
#     new_user.token = access_token
#     db.session.add(new_user)
#     db.session.commit()
    
#     return jsonify ({
#         "email": new_user.email,
#         "password" : new_user.password,
#         "name": new_user.name,
#         "id": new_user.id,
#         "access_token": new_user.token
#     }), 201
    
# @app.route('/signin', methods=['POST'])
# def signin():
#     email = request.json["email"]
#     password = request.json["password"]
#     user = User.query.filter_by(email=email).first()
#     if user:
#         if check_password_hash(user.password, password):
#             return jsonify ({
#                 "email": user.email,
#                 "password" : user.password,
#                 "name": user.name,
#                 "id": user.id,
#                 "access_token": user.token
#             }), 201
        
#         else:
#             return jsonify({"error": "Incorrect password"}), 401
#     else:
#         return jsonify({"error": "User not found"}), 404
    
    
@app.route('/profile/<getemail>')
@jwt_required() 
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
       
    user = User.query.filter_by(email=getemail).first()
  
    response_body = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "about" : user.about
    }
    
    return response_body, 201

    
@app.route('/logout', methods=["POST"])
def logout():
    response = jsonify({"msg":"logout successful"})
    unset_jwt_cookies(response)
    return response, 201
    

if __name__ == '__main__':
    app.debug = True
    app.run()
    
migrate = Migrate(app, db)
db.init_app(app)