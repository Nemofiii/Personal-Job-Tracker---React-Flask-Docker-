from app.extensions import db

class Job(db.Model):
    __tablename__ = 'jobs'

    job_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    company_name = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    job_url = db.Column(db.String(200))
    date_applied = db.Column(db.Date)
    follow_up_date = db.Column(db.Date)

    status = db.Column(db.Enum('Applied', 'Interviewing', 'Offered', 'Rejected', 'Accepted', name='job_status'), default='Applied', nullable=False)
    priority = db.Column(db.Enum('Low', 'Medium', 'High', name='job_priority'), default='Medium', nullable=False)
    resume_file = db.Column(db.String(255))

    def __repr__(self):
        return f"<Job: {self.job_title} at {self.company_name}, Status: {self.status}>"
