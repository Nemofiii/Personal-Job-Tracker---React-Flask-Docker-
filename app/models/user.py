from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(200), nullable = False)    # Store hashed password

    #One-to-many relationship with Job
    jobs = db.relationship('Job', backref='user', lazy=True, cascade="all, delete-orphan") # cascade delete jobs when user is deleted

    def __repr__(self):
        return f"<User: {self.name}, Email: {self.email}>"
