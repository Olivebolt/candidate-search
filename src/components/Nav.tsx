import {Link, useLocation} from 'react-router-dom';

const Nav = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className="nav">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            to="/SavedCandidates"
            className={`nav-link ${location.pathname === '/SavedCandidates' ? 'active' : ''}`}
          >
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;