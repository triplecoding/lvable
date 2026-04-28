from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    full_name: str
    password_hash: str
    provider: str = "email"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Document(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: int = Field(index=True)
    title: str
    storage_url: str
    tags: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AdEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    placement: str = Field(index=True)
    action: str = "click"
    source_page: str = "/"
    created_at: datetime = Field(default_factory=datetime.utcnow)
