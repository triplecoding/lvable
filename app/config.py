from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "DC PDF Editor"
    site_url: str = "https://dcpdfeditor.com"
    company_name: str = "DC PDF Editor Inc."
    support_email: str = "support@dcpdfeditor.com"

    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 60 * 24
    database_url: str = "postgresql+psycopg://neondb_owner:password@ep-xxxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

    openai_api_key: str | None = None

    google_client_id: str | None = None
    google_client_secret: str | None = None
    facebook_client_id: str | None = None
    facebook_client_secret: str | None = None
    apple_client_id: str | None = None
    apple_client_secret: str | None = None

    resend_api_key: str | None = None
    resend_from_email: str = "DC PDF Editor <no-reply@dcpdfeditor.com>"

    # SEO + analytics integrations
    gtm_id: str = "GTM-XXXXXXX"
    ga_measurement_id: str = "G-XXXXXXXXXX"
    google_site_verification: str = "replace_google_verification_token"
    bing_site_verification: str = "replace_bing_verification_token"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
