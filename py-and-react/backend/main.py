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

client = Luzmo(LUZMO_API_KEY, LUZMO_API_TOKEN, LUZMO_API_HOST)

SALES_REPS = {"dwight", "jim", "phyllis", "stanley", "andy"}

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
    "jim": {
        "username": "jim.halpert",
        "name": "Jim Halpert",
        "email": "jim.halpert@dundermifflin.com",
        "suborganization": "Scranton",
    },
    "phyllis": {
        "username": "phyllis.vance",
        "name": "Phyllis Vance",
        "email": "phyllis.vance@dundermifflin.com",
        "suborganization": "Scranton",
    },
    "stanley": {
        "username": "stanley.hudson",
        "name": "Stanley Hudson",
        "email": "stanley.hudson@dundermifflin.com",
        "suborganization": "Scranton",
    },
    "andy": {
        "username": "andy.bernard",
        "name": "Andy Bernard",
        "email": "andy.bernard@dundermifflin.com",
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
        auth_payload = {
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
        }

        if req.role in SALES_REPS:
            auth_payload["parameter_overrides"] = {
                "salesperson": profile["name"],
            }

        response = client.create("authorization", auth_payload)

        return {
            "authKey": response["id"],
            "authToken": response["token"],
            "appServer": LUZMO_APP_SERVER,
            "apiHost": LUZMO_API_HOST,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
