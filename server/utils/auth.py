from fastapi import Request, HTTPException, status
from utils.jwtHelper import JwtHelper


def require_auth(request: Request) -> dict:
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: No token provided",
        )

    try:
        payload = JwtHelper.verify_token(token)
        # In FastAPI, we return the payload so it can be injected into routes
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid token",
        )
