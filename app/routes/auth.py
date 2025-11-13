from flask import Blueprint, request, jsonify
from app.models.user import User
from app.extensions import db, bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta
from pydantic import ValidationError
from app.schemas.auth_schema import SignUpSchema, LoginSchema

auth_bp = Blueprint('auth', __name__)

# Sign up
@auth_bp.route('/sign-up', methods=['POST'])
def sign_up():
    try:
        data = SignUpSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"Validation_error": e.errors()}), 400
    
    name = data.name
    email = data.email
    password = data.password

    if not all([name, email, password]):
        return jsonify({"error": "Missing required fields; All fields (name, email, password) are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = LoginSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"Validation_error": e.errors()}), 400
    
    email = data.email
    password = data.password

    if not all([email, password]):
        return jsonify({"error": "Missing required fields; Both email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401
    
    access_token = create_access_token(identity=str(user.user_id), expires_delta=timedelta(hours=2))
    return jsonify({"access_token": access_token, "user_id": user.user_id}), 200