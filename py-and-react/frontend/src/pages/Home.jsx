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
    title: 'Sales Rep \u2022 Client Accounts',
    avatar:
      'https://www.myany.city/sites/default/files/styles/scaled_cropped_medium__260x260/public/field/image/node-related-images/sample-dwight-k-schrute.jpg?itok=8TfRscbA',
  },
  {
    role: 'jim',
    name: 'Jim Halpert',
    title: 'Sales Rep \u2022 Client Accounts',
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/7/7e/Jim-halpert.jpg',
  },
  {
    role: 'phyllis',
    name: 'Phyllis Vance',
    title: 'Sales Rep \u2022 Client Accounts',
    avatar:
      'https://img.buzzfeed.com/buzzfeed-static/static/2020-01/22/22/asset/2262703cf38d/sub-buzz-1828-1579733623-9.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
  },
  {
    role: 'stanley',
    name: 'Stanley Hudson',
    title: 'Sales Rep \u2022 Client Accounts',
    avatar:
      'https://www.looper.com/img/gallery/whatever-happened-to-stanley-from-the-office/intro-1574100890.jpg',
  },
  {
    role: 'andy',
    name: 'Andy Bernard',
    title: 'Sales Rep \u2022 Client Accounts',
    avatar:
      'https://akns-images.eonline.com/eol_images/Entire_Site/2020023/rs_600x600-200123145928-office1.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top',
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
          Welcome! Choose your persona to unlock the right dashboards. Sales
          reps see only their own client accounts.
        </div>
        <div className="chat-button">💬</div>
      </footer>
    </>
  );
}
