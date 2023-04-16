import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import SearchContext from '../../context/SearchContext'

import SearchFunction from '../SearchFunction'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: [],
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedProfile = await response.json()

      const profileData = {
        profile: {
          followersCount: fetchedProfile.profile.followers_count,
          followingCount: fetchedProfile.profile.following_count,
          id: fetchedProfile.profile.id,
          posts: fetchedProfile.profile.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          postsCount: fetchedProfile.profile.posts_count,
          profilePic: fetchedProfile.profile.profile_pic,
          stories: fetchedProfile.profile.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
          userBio: fetchedProfile.profile.user_bio,
          userId: fetchedProfile.profile.user_id,
          userName: fetchedProfile.profile.user_name,
        },
      }

      this.setState({
        profileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderMyProfileView = () => {
    const {profileData} = this.state

    return (
      <ul className="my-profile-container">
        <ProfileDetails profileData={profileData} profileRoute="my" />
      </ul>
    )
  }

  onRetry = () => this.getMyProfile()

  renderFailureView = () => (
    <div className="profile-failure-container">
      <img
        src="https://res.cloudinary.com/ddfyeqdkj/image/upload/v1680616247/insta_share/Something_Went_Wrong_cardz5.png"
        alt="failure view"
        className="profile-failure-img"
      />
      <p className="profile-failure-description">
        Something went wrong. Please try again
      </p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderAllProfileViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput, searchOn, searchOff} = value
          return (
            <>
              <Header />
              {searchInput !== '' && searchOn && !searchOff && (
                <SearchFunction searchInput={searchInput} />
              )}

              {searchInput !== '' && !searchOn && searchOff && (
                <SearchFunction searchInput={searchInput} />
              )}

              {searchOff && this.renderAllProfileViews()}
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default MyProfile
