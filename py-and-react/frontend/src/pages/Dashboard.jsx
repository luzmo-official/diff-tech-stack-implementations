import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LuzmoDashboardComponent } from '@luzmo/react-embed';

const DASHBOARD_IDS = {
  wallace: '9743e36d-7d9c-4703-bf4c-f347cb85169f',
  michael: '3c47cf45-fcb6-4920-a5a8-b79852519552',
  sales: 'e43545ae-353b-46d8-b96d-bc882e0aaf33',
};

const SALES_REPS = new Set(['dwight', 'jim', 'phyllis', 'stanley', 'andy']);

const NAMES = {
  wallace: 'David',
  michael: 'Michael',
  dwight: 'Dwight',
  jim: 'Jim',
  phyllis: 'Phyllis',
  stanley: 'Stanley',
  andy: 'Andy',
};

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'wallace';
  const name = NAMES[role] || 'User';
  const dashboardId = SALES_REPS.has(role)
    ? DASHBOARD_IDS.sales
    : DASHBOARD_IDS[role] || DASHBOARD_IDS.wallace;

  const [embedConfig, setEmbedConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEmbedConfig(null);
    setError(null);

    fetch('/api/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => setEmbedConfig(data))
      .catch((err) => setError(err.message));
  }, [role]);

  return (
    <>
      <nav className="navbar">
        <h2>Here's your Dashboard, {name}</h2>
        <Link className="switch-profile" to="/">
          Switch Profile
        </Link>
      </nav>

      <div className="embed-container">
        {error && (
          <div className="embed-loading">
            <p>Failed to load dashboard: {error}</p>
          </div>
        )}

        {!embedConfig && !error && (
          <div className="embed-loading">
            <p>Loading dashboard...</p>
          </div>
        )}

        {embedConfig && (
          <LuzmoDashboardComponent
            appServer={embedConfig.appServer}
            apiHost={embedConfig.apiHost}
            authKey={embedConfig.authKey}
            authToken={embedConfig.authToken}
            dashboardId={dashboardId}
          />
        )}
      </div>
    </>
  );
}
