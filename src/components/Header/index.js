import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillCloseCircle} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Header extends Component {
  state = {
    searchText: '',
    openOptions: false,
    searchButtonClicked: false,
  }

  closeOrOpenOptions = () => {
    this.setState(prevState => ({
      openOptions: !prevState.openOptions,
      searchButtonClicked: false,
    }))
  }

  onClickMobileSearchButton = () => {
    this.setState(prevState => ({
      openOptions: !prevState.openOptions,
      searchButtonClicked: !prevState.searchButtonClicked,
    }))
  }

  onChangeSearchText = event => {
    this.setState({
      searchText: event.target.value,
    })
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderSearchBar = () => (
    <SearchContext.Consumer>
      {value => {
        const {onClickSearchButton} = value
        const {searchText} = this.state

        const onClickSearch = () => {
          if (searchText !== '') {
            onClickSearchButton(searchText)
          }
        }

        return (
          <div className="search-posts-container">
            <input
              type="search"
              placeholder="Search Caption"
              className="search-box"
              onChange={this.onChangeSearchText}
            />
            <button
              type="button"
              className="search-icon-button"
              onClick={onClickSearch}
              // eslint-disable-next-line react/no-unknown-property
              testid="searchIcon"
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  renderMobileOptions = () => (
    <SearchContext.Consumer>
      {value => {
        const {onClickRouteLink} = value

        const onClickLink = () => {
          onClickRouteLink()
        }

        return (
          <ul className="nav-mobile-links-container">
            <li className="nav-mobile-icon-button">
              <Link to="/" className="home-link" onClick={onClickLink}>
                Home
              </Link>
            </li>
            <li className="nav-mobile-icon-button">
              <button
                type="button"
                className="search-button"
                onClick={this.onClickMobileSearchButton}
              >
                Search
              </button>
            </li>
            <li className="nav-mobile-icon-button">
              <Link
                to="/my-profile"
                className="home-link"
                onClick={onClickLink}
              >
                Profile
              </Link>
            </li>
            <li className="nav-mobile-icon-button">
              <button
                type="button"
                className="nav-mobile-logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <li className="nav-mobile-icon-button">
              <button
                type="button"
                className="nav-mobile-close-button"
                onClick={this.closeOrOpenOptions}
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </li>
          </ul>
        )
      }}
    </SearchContext.Consumer>
  )

  renderLogoWebsite = () => (
    <SearchContext.Consumer>
      {value => {
        const {onClickRouteLink} = value

        const onClickLink = () => {
          onClickRouteLink()
        }

        return (
          <Link to="/" className="home-link" onClick={onClickLink}>
            <img
              src="https://res.cloudinary.com/ddfyeqdkj/image/upload/v1679746224/insta_share/insta_logo_pvnjre.png"
              className="header-website-logo"
              alt="website logo"
            />
            <h1 className="website-name">Insta Share</h1>
          </Link>
        )
      }}
    </SearchContext.Consumer>
  )

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {onClickRouteLink} = value
          const {openOptions, searchButtonClicked} = this.state

          const onClickLink = () => {
            onClickRouteLink()
          }

          return (
            <div className="header-container">
              <nav className="nav-mobile-container">
                <div className="nav-mobile-header">
                  {this.renderLogoWebsite()}
                  <div className="nav-sm-links-container">
                    <button
                      type="button"
                      onClick={this.closeOrOpenOptions}
                      className="hamburger-button"
                    >
                      <GiHamburgerMenu className="hamburger-icon" />
                    </button>
                  </div>
                </div>
                <div className="nav-mobile-option-container">
                  {openOptions && this.renderMobileOptions()}
                  {searchButtonClicked && this.renderSearchBar()}
                </div>
              </nav>

              <nav className="nav-md-container">
                {this.renderLogoWebsite()}
                <div className="nav-md-links-container">
                  {this.renderSearchBar()}
                  <ul className="nav-md-text-links-container">
                    <li className="nav-lg-link">
                      <Link to="/" className="nav-link" onClick={onClickLink}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-lg-link">
                      <Link
                        to="/my-profile"
                        className="nav-link"
                        onClick={onClickLink}
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="nav-lg-logout-button"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
