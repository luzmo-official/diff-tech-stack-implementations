import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from luzmo.luzmo import Luzmo
from pydantic import BaseModel

load_dotenv()

LUZMO_API_KEY = os.environ["LUZMO_API_KEY"]
LUZMO_API_TOKEN = os.environ["LUZMO_API_TOKEN"]
LUZMO_API_HOST = os.environ.get("LUZMO_API_HOST", "https://api.luzmo.com")
LUZMO_APP_SERVER = os.environ.get("LUZMO_APP_SERVER", "https://app.luzmo.com")
LUZMO_COLLECTION_ID = os.environ["LUZMO_COLLECTION_ID"]
LUZMO_DASHBOARD_ID = os.environ["LUZMO_DASHBOARD_ID"]

client = Luzmo(LUZMO_API_KEY, LUZMO_API_TOKEN, LUZMO_API_HOST)

ROLE_PROFILES = {
    "wallace": {
        "username": "david.wallace",
        "name": "David Wallace",
        "email": "david.wallace@dundermifflin.com",
        "suborganization": "Corporate",
    },
    "michael": {
        "username": "michael.scott",
        "name": "Michael Scott",
        "email": "michael.scott@dundermifflin.com",
        "suborganization": "Scranton",
    },
    "dwight": {
        "username": "dwight.schrute",
        "name": "Dwight Schrute",
        "email": "dwight.schrute@dundermifflin.com",
        "suborganization": "Scranton",
    },
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmbedRequest(BaseModel):
    role: str


@app.post("/api/embed")
async def create_embed_token(req: EmbedRequest):
    profile = ROLE_PROFILES.get(req.role)
    if not profile:
        raise HTTPException(status_code=400, detail=f"Unknown role: {req.role}")

    try:
        response = client.create(
            "authorization",
            {
                "type": "embed",
                "username": profile["username"],
                "name": profile["name"],
                "email": profile["email"],
                "suborganization": profile["suborganization"],
                "access": {
                    "collections": [
                        {
                            "id": LUZMO_COLLECTION_ID,
                            "inheritRights": "use",
                        }
                    ]
                },
            },
        )
        return {
            "authKey": response["id"],
            "authToken": response["token"],
            "dashboardId": LUZMO_DASHBOARD_ID,
            "appServer": LUZMO_APP_SERVER,
            "apiHost": LUZMO_API_HOST,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
