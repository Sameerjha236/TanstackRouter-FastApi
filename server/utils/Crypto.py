import bcrypt
import hashlib


class CryptoHelper:
    @classmethod
    def _prepare_password(cls, password: str) -> bytes:
        """Hashes the password with SHA-256 first to avoid bcrypt's 72-byte limit."""
        return hashlib.sha256(password.encode("utf-8")).hexdigest().encode("utf-8")

    @classmethod
    def hash_password(cls, password: str) -> str:
        """Hashes a plain text password safely using SHA-256 + native bcrypt."""
        prepared = cls._prepare_password(password)
        # Generate salt and hash the password
        salt = bcrypt.gensalt()
        hashed_bytes = bcrypt.hashpw(prepared, salt)
        # Convert bytes back to string for database storage
        return hashed_bytes.decode("utf-8")

    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        """Verifies a plain text password against a stored bcrypt string."""
        prepared = cls._prepare_password(plain_password)
        # Convert database string back to bytes for bcrypt comparison
        hashed_bytes = hashed_password.encode("utf-8")
        return bcrypt.checkpw(prepared, hashed_bytes)
