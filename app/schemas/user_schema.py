from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserUpdateSchema(BaseModel):
    name: Optional[str] = Field(..., min_length=2, max_length=100)
    password: Optional[str] = Field(..., min_length=6)