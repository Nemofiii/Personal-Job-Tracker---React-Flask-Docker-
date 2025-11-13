from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate, jwt, bcrypt

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(Config)

    #initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Import models to register with SQLAlchemy
    from app.models import User, Job

    #Register blueprints here
    from app.routes.auth import auth_bp
    from app.routes.user import user_bp
    from app.routes.job import job_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(job_bp)

    #temporary route for testing
    @app.route('/')
    def home():
        return "Welcome to the Job Tracker API"
    
    return app