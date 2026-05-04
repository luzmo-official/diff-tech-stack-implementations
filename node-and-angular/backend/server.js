import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Luzmo from '@luzmo/nodejs-sdk';

const {
  LUZMO_API_KEY,
  LUZMO_API_TOKEN,
  LUZMO_COLLECTION_ID,
  LUZMO_API_HOST = 'https://api.luzmo.com',
  LUZMO_APP_SERVER = 'https://app.luzmo.com',
} = process.env;

const client = new Luzmo({
  api_key: LUZMO_API_KEY,
  api_token: LUZMO_API_TOKEN,
  host: LUZMO_API_HOST,
});

const SALES_REPS = new Set(['dwight', 'jim', 'phyllis', 'stanley', 'andy']);

const ROLE_PROFILES = {
  wallace: {
    username: 'david.wallace',
    name: 'David Wallace',
    email: 'david.wallace@dundermifflin.com',
    suborganization: 'Corporate',
  },
  michael: {
    username: 'michael.scott',
    name: 'Michael Scott',
    email: 'michael.scott@dundermifflin.com',
    suborganization: 'Scranton',
  },
  dwight: {
    username: 'dwight.schrute',
    name: 'Dwight Schrute',
    email: 'dwight.schrute@dundermifflin.com',
    suborganization: 'Scranton',
  },
  jim: {
    username: 'jim.halpert',
    name: 'Jim Halpert',
    email: 'jim.halpert@dundermifflin.com',
    suborganization: 'Scranton',
  },
  phyllis: {
    username: 'phyllis.vance',
    name: 'Phyllis Vance',
    email: 'phyllis.vance@dundermifflin.com',
    suborganization: 'Scranton',
  },
  stanley: {
    username: 'stanley.hudson',
    name: 'Stanley Hudson',
    email: 'stanley.hudson@dundermifflin.com',
    suborganization: 'Scranton',
  },
  andy: {
    username: 'andy.bernard',
    name: 'Andy Bernard',
    email: 'andy.bernard@dundermifflin.com',
    suborganization: 'Scranton',
  },
};

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.post('/api/embed', async (req, res) => {
  const { role } = req.body;
  const profile = ROLE_PROFILES[role];
  if (!profile) {
    return res.status(400).json({ detail: `Unknown role: ${role}` });
  }

  try {
    const authPayload = {
      type: 'embed',
      username: profile.username,
      name: profile.name,
      email: profile.email,
      suborganization: profile.suborganization,
      access: {
        collections: [
          { id: LUZMO_COLLECTION_ID, inheritRights: 'use' },
        ],
      },
    };

    if (SALES_REPS.has(role)) {
      authPayload.parameter_overrides = {
        salesperson: profile.name,
      };
    }

    const response = await client.create('authorization', authPayload);

    res.json({
      authKey: response.id,
      authToken: response.token,
      appServer: LUZMO_APP_SERVER,
      apiHost: LUZMO_API_HOST,
    });
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
});

app.listen(8000, () => console.log('API running on http://localhost:8000'));
