import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <h1 className="not-found-header">Lost Your Way ?</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="not-found-link">
      <button className="button" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)
export default NotFound
