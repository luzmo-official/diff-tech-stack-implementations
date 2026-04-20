import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LuzmoDashboardComponent } from '@luzmo/react-embed';

const roleConfig = {
  wallace: {
    name: 'David Wallace \u2022 Corporate Overview',
    desc: 'Big-picture KPIs: revenue, growth, branch comparisons.',
    kpis: ['Company Revenue', 'Top Branches', 'YoY Growth', 'Profit Margin'],
  },
  michael: {
    name: 'Michael Scott \u2022 Regional Manager',
    desc: 'Scranton vs other branches. Trends, vibes, and bragging rights.',
    kpis: [
      'Branch Rankings',
      'Regional Sales Trend',
      'Customer Retention',
      "That's what she said",
    ],
  },
  dwight: {
    name: 'Dwight Schrute \u2022 Top Sales Rep',
    desc: 'Daily performance, best sellers, personal scoreboards.',
    kpis: [
      "Today's Sales",
      'Top Products',
      'Leaderboard',
      'Beets Sold (Secret KPI)',
    ],
  },
};

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'wallace';
  const config = roleConfig[role] || roleConfig.wallace;

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
        <h2>Dashboard</h2>
        <Link className="switch-profile" to="/">
          Switch Profile
        </Link>
      </nav>

      <section className="role-banner">
        <h1>{config.name}</h1>
        <p>{config.desc}</p>
      </section>

      <section className="kpis">
        {config.kpis.map((kpi) => (
          <div key={kpi} className="kpi-card">
            <h3>{kpi}</h3>
            <p>Metric placeholder</p>
          </div>
        ))}
      </section>

      <section className="dashboard-section">
        <h2>Embedded Luzmo Dashboard</h2>

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
              dashboardId={embedConfig.dashboardId}
            />
          )}
        </div>
      </section>
    </>
  );
}
