import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/ddfyeqdkj/image/upload/v1680616219/insta_share/Page_Not_Found_nprux3.png"
      alt="page not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found <br /> Please go
      back to the homepage
    </p>
    <Link to="/" className="link">
      <button className="go-home-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
