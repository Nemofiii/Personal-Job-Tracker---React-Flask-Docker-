from flask import Blueprint, request, jsonify, current_app, send_from_directory
from app.models.job import Job
from app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.schemas.job_schema import JobUpdateSchema, JobCreateSchema
from pydantic import ValidationError
import os
from werkzeug.utils import secure_filename


job_bp = Blueprint('job', __name__, url_prefix='/api/jobs')

UPLOAD_FOLDER = os.path.join(os.getcwd(), "app", "uploads", "resumes")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Create a new job entry
@job_bp.route('', methods=['POST'])
@jwt_required()
def create_job():
    user_id = int(get_jwt_identity())

    try:
        data = JobCreateSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"Validation_error": e.errors()}), 400

    try:
        new_job = Job(
            user_id = user_id,
            company_name = data.company_name,
            job_title = data.job_title,
            description = data.description,
            job_url = data.job_url,
            date_applied = datetime.utcnow(),
            follow_up_date = data.follow_up_date,
            status = data.status or 'Applied',
            priority = data.priority or 'Medium'
        )

        db.session.add(new_job)
        db.session.commit()
        return jsonify({"message": "Job created successfully", "job": serialize_job(new_job)}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

# Get all jobs for the current user
@job_bp.route('', methods=['GET'])
@jwt_required()
def get_jobs():
    user_id = int(get_jwt_identity())

    status = request.args.get('status', None)
    priority = request.args.get('priority', None)

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)

    # Start base query
    query = Job.query.filter(Job.user_id == user_id)

    # Apply valid filters only
    valid_status = ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Accepted']
    valid_priority = ['Low', 'Medium', 'High']

    if status in valid_status:
        query = query.filter(Job.status == status)
    if priority in valid_priority:
        query = query.filter(Job.priority == priority)

    # jobs = query.order_by(Job.date_applied.desc()).all()

    # Apply pagination
    pagination = query.order_by(Job.date_applied.desc()). paginate(page=page, per_page=per_page, error_out=False)
    jobs = pagination.items

    return jsonify({"jobs": [serialize_job(job) for job in jobs], 
        "pagination": {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total_pages": pagination.pages,
            "total_jobs": pagination.total}}), 200

    

# Get a specific job by ID
@job_bp.route('/<int:job_id>', methods=['GET'])
@jwt_required()
def get_job(job_id):
    user_id = int(get_jwt_identity())
    job = Job.query.filter_by(job_id=job_id, user_id=user_id).first()

    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    return jsonify({"job": serialize_job(job)}), 200


# Update a specific job by ID
@job_bp.route('/<int:job_id>', methods=['PUT'])
@jwt_required()
def update_job(job_id):
    user_id = int(get_jwt_identity())
    job = Job.query.filter_by(job_id=job_id, user_id=user_id).first()

    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    try:
        data = JobUpdateSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"Validation_error": e.errors()}), 400

    # Update fields only if provided
    job.company_name = data.company_name or job.company_name
    job.job_title = data.job_title or job.job_title
    job.description = data.description or job.description
    job.job_url = data.job_url or job.job_url
    job.status = data.status or job.status
    job.priority = data.priority or job.priority


    if data.date_applied:
        job.date_applied = data.date_applied
    if data.follow_up_date:
        job.follow_up_date = data.follow_up_date

    db.session.commit()
    return jsonify({"message": "Job updated successfully", "job": serialize_job(job)}), 200


# Delete a specific job by ID
@job_bp.route('/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    user_id = int(get_jwt_identity())
    job = Job.query.filter_by(job_id=job_id, user_id=user_id).first()

    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted successfully"}), 200


#resume upload endpoint
@job_bp.route('/<int:job_id>/upload_resume', methods=['POST'])
@jwt_required()
def upload_resume(job_id):
    user_id = int(get_jwt_identity())

    job = Job.query.filter_by(job_id=job_id, user_id=user_id).first()
    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    job.resume_file = filename
    db.session.commit()

    return jsonify({"message": "Resume uploaded successfully"}), 200


# Endpoint to view resume file
@job_bp.route('/resume/<filename>', methods=['GET'])
def view_resume(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# Helper function to serialize job objects
def serialize_job(job):
    return {
        "job_id": job.job_id,
        "user_id": job.user_id,
        "company_name": job.company_name,
        "job_title": job.job_title,
        "description": job.description,
        "job_url": job.job_url,
        "date_applied": job.date_applied.isoformat() if job.date_applied else None,
        "follow_up_date": job.follow_up_date.isoformat() if job.follow_up_date else None,
        "status": job.status,
        "priority": job.priority,
        "resume_file": job.resume_file
    }