from django.conf import settings
from luzmo.luzmo import Luzmo
from rest_framework.decorators import api_view
from rest_framework.response import Response

client = Luzmo(
    settings.LUZMO_API_KEY,
    settings.LUZMO_API_TOKEN,
    settings.LUZMO_API_HOST,
)

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


@api_view(["POST"])
def create_embed_token(request):
    role = request.data.get("role")
    profile = ROLE_PROFILES.get(role)
    if not profile:
        return Response({"detail": f"Unknown role: {role}"}, status=400)

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
                        "id": settings.LUZMO_COLLECTION_ID,
                        "inheritRights": "use",
                    }
                ]
            },
        }

        if role in SALES_REPS:
            auth_payload["parameter_overrides"] = {
                "salesperson": profile["name"],
            }

        response = client.create("authorization", auth_payload)

        return Response({
            "authKey": response["id"],
            "authToken": response["token"],
            "appServer": settings.LUZMO_APP_SERVER,
            "apiHost": settings.LUZMO_API_HOST,
        })
    except Exception as e:
        return Response({"detail": str(e)}, status=500)
