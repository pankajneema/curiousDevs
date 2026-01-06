from fastapi import FastAPI
from routes import lead,newsletter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# ✅ Allow all origins (for development use only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lead.router)
app.include_router(newsletter.router)