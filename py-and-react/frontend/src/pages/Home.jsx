import { Link } from 'react-router-dom';

const personas = [
  {
    role: 'wallace',
    name: 'David Wallace',
    title: 'Corporate Overview \u2022 CFO',
    avatar:
      'https://static0.colliderimages.com/wordpress/wp-content/uploads/2021/01/the-office-david-wallace-social.jpg',
  },
  {
    role: 'michael',
    name: 'Michael Scott',
    title: 'Regional Manager \u2022 Branch Trends',
    avatar:
      'https://www.nbc.com/sites/nbcblog/files/2022/07/the-office-how-to-watch.jpg',
  },
  {
    role: 'dwight',
    name: 'Dwight Schrute',
    title: 'Sales Rep \u2022 Daily Performance',
    avatar:
      'https://www.myany.city/sites/default/files/styles/scaled_cropped_medium__260x260/public/field/image/node-related-images/sample-dwight-k-schrute.jpg?itok=8TfRscbA',
  },
];

export default function Home() {
  return (
    <>
      <header className="logo">
        <h1>Dunder Mifflin Data</h1>
        <p>Built with Luzmo &bull; Scranton Branch Analytics</p>
        <div className="subtitle">SELECT A USER PROFILE</div>
      </header>

      <main className="profiles">
        {personas.map((p) => (
          <Link key={p.role} className="card" to={`/dashboard?role=${p.role}`}>
            <img className="avatar" src={p.avatar} alt={p.name} />
            <p className="name">{p.name}</p>
            <p className="role">{p.title}</p>
          </Link>
        ))}
      </main>

      <footer className="chat">
        <div className="chat-bubble">
          Welcome! Choose your persona to unlock the right dashboards (Dwight
          cannot be trusted with corporate KPIs).
        </div>
        <div className="chat-button">💬</div>
      </footer>
    </>
  );
}
