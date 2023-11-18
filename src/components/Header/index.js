import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onDelete = () => {
    console.log('clicked')
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-image"
            />
          </Link>
        </li>
        <div>
          <li>
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-item">
              Jobs
            </Link>
          </li>
        </div>
        <div>
          <button type="button" className="button-element" onClick={onDelete}>
            Logout
          </button>
        </div>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
