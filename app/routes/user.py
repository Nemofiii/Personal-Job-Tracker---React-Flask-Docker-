from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.extensions import db
from app.extensions import bcrypt
from pydantic import ValidationError
from app.schemas.user_schema import UserUpdateSchema

user_bp = Blueprint("user", __name__)

# Get current user's profile
@user_bp.route("", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "user_id": user.user_id,
        "name": user.name,
        "email": user.email
    }), 200


# Update current user's profile
@user_bp.route("", methods=["PUT"])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    try:
        data = UserUpdateSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"Validation_error": e.errors()}), 400

    name = data.name
    password = data.password

    if name:
        user.name = name
    if password:
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200