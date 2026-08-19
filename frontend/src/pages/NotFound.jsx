import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './NotFound.css';

const NotFound = () => (
  <>
    <SEO title="Page Not Found" description="The page you are looking for does not exist." />
    <section className="not-found">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for may have been moved or does not exist.</p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </section>
  </>
);

export default NotFound;
