from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes.TodoRoute import router as TodoRouter
from routes.AuthRoute import router as AuthRouter
from utils.auth import require_auth

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from your React app
    allow_credentials=True,  # Allows cookies/authentication headers
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers (Content-Type, Authorization, etc.)
)

app.include_router(AuthRouter)
app.include_router(TodoRouter, dependencies=[Depends(require_auth)])


@app.get("/")
def read_root():
    return "app is running"
