import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileDetails from '../ProfileDetails'
import Header from '../Header'
// import SearchContext from '../../context/SearchContext'
// import SearchFunction from '../SearchFunction'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: [],
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {userId} = params

    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedUserProfile = await response.json()

      const profileData = {
        profile: {
          id: fetchedUserProfile.user_details.id,
          userId: fetchedUserProfile.user_details.user_id,
          userName: fetchedUserProfile.user_details.user_name,
          profilePic: fetchedUserProfile.user_details.profile_pic,
          followersCount: fetchedUserProfile.user_details.followers_count,
          followingCount: fetchedUserProfile.user_details.following_count,
          userBio: fetchedUserProfile.user_details.user_bio,
          postsCount: fetchedUserProfile.user_details.posts_count,
          posts: fetchedUserProfile.user_details.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          stories: fetchedUserProfile.user_details.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
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

  renderUserProfileView = () => {
    const {profileData} = this.state

    return (
      <ul className="my-profile-container">
        <ProfileDetails profileData={profileData} profileRoute="user" />
      </ul>
    )
  }

  onRetry = () => this.getUserProfile()

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

  renderAllUserProfileViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfileView()
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
      <>
        <Header />
        {this.renderAllUserProfileViews()}
      </>
    )
  }
}

export default UserProfile

/*
<>
        <Header />
        {this.renderAllUserProfileViews()}
      </>

      <SearchContext.Consumer>
        {value => {
          const {searchInput, searchOn} = value
          return (
            <>
              <Header />
              <div className="bg-container">
                {searchOn ? (
                  <SearchFunction searchInput={searchInput} />
                ) : (
                  this.renderAllUserProfileViews()
                )}
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>

*/
