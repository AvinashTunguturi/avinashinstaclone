import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PostItems from '../PostItems'

import './index.css'

const apiSearchPostsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class SearchFunction extends Component {
  state = {
    apiSearchPost: apiSearchPostsStatus.initial,
    searchPostsData: [],
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({
      apiSearchPost: apiSearchPostsStatus.inProgress,
    })

    const {searchInput} = this.props
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      if (fetchedData.posts.length === 0) {
        this.setState({apiSearchPost: apiSearchPostsStatus.empty})
      } else {
        const searchPostsData = fetchedData.posts.map(post => ({
          comments: post.comments.map(commentItem => ({
            userName: commentItem.user_name,
            userId: commentItem.user_id,
            comment: commentItem.comment,
          })),
          createdAt: post.created_at,
          likesCount: post.likes_count,
          likeStatus: false,
          postDetails: {
            imageUrl: post.post_details.image_url,
            caption: post.post_details.caption,
          },
          postId: post.post_id,
          profilePic: post.profile_pic,
          userId: post.user_id,
          userName: post.user_name,
        }))

        this.setState({
          searchPostsData,
          apiSearchPost: apiSearchPostsStatus.success,
        })
      }
    } else {
      this.setState({apiSearchPost: apiSearchPostsStatus.failure})
    }
  }

  renderSearchPostsView = () => {
    const {searchPostsData} = this.state

    return (
      <>
        <h1 className="search-heading">Search Results</h1>
        <PostItems postData={searchPostsData} />
      </>
    )
  }

  onRetry = () => this.getSearchResults()

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

  renderEmptySearchView = () => (
    <div className="search-not-found-container">
      <img
        src="https://res.cloudinary.com/ddfyeqdkj/image/upload/v1680616192/insta_share/Search_Not_Found_gfgdfl.png"
        alt="search not found"
        className="search-not-found-img"
      />
      <h1 className="search_not-found-heading">Search Not Found</h1>
      <p className="search_not-found-description">
        Try different keyword or search again
      </p>
    </div>
  )

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderAllSearchPostsView = () => {
    const {apiSearchPost} = this.state

    switch (apiSearchPost) {
      case apiSearchPostsStatus.success:
        return this.renderSearchPostsView()
      case apiSearchPostsStatus.failure:
        return this.renderFailureView()
      case apiSearchPostsStatus.inProgress:
        return this.renderLoadingView()
      case apiSearchPostsStatus.empty:
        return this.renderEmptySearchView()
      default:
        return null
    }
  }

  render() {
    return this.renderAllSearchPostsView()
  }
}

export default SearchFunction
