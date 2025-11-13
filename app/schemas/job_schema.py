from pydantic import BaseModel, Field, HttpUrl, validator
from typing import Optional
from datetime import date

class JobCreateSchema(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=100)
    job_title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    job_url: Optional[str]
    date_applied: Optional[date]
    follow_up_date: Optional[date]
    status: Optional[str] = Field(default="Applied")
    priority: Optional[str] = Field(default="Medium")

    @validator("status")
    def validate_status(cls, v):
        allowed = ["Applied", "Interviewing", "Offered", "Rejected", "Accepted"]
        if v not in allowed:
            raise ValueError(f"Invalid status '{v}'. Must be one of {allowed}")
        return v

    @validator("priority")
    def validate_priority(cls, v):
        allowed = ["Low", "Medium", "High"]
        if v not in allowed:
            raise ValueError(f"Invalid priority '{v}'. Must be one of {allowed}")
        return v
    
    # ✅ Normalize empty strings to None
    @validator("job_url", "date_applied", "follow_up_date", pre=True)
    def empty_str_to_none(cls, v):
        if v == "" or v is None:
            return None
        return v

class JobUpdateSchema(BaseModel):
    company_name: Optional[str]
    job_title: Optional[str]
    description: Optional[str]
    job_url: Optional[str]
    date_applied: Optional[date]
    follow_up_date: Optional[date]
    status: Optional[str]
    priority: Optional[str]

    # ✅ Normalize empty strings to None
    @validator("job_url", "date_applied", "follow_up_date", pre=True)
    def empty_str_to_none(cls, v):
        if v == "" or v is None:
            return None
        return v
