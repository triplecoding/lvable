from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AIChatRequest(BaseModel):
    prompt: str
    pdf_text: str


class AIRewriteRequest(BaseModel):
    text: str
    mode: str = "simplify"


class AdEventRequest(BaseModel):
    placement: str
    action: str = "click"
    source_page: str = "/"


class ContactEmailRequest(BaseModel):
    name: str
    email: EmailStr
    message: str
