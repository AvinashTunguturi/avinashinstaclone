import {Component} from 'react'
import Cookies from 'js-cookie'
import DisplayPost from '../DisplayPost'
import LikeStatusContext from '../../context/LikeStatusContext'

import './index.css'

class PostItems extends Component {
  state = {
    postData: [],
  }

  componentDidMount() {
    const {postData} = this.props
    this.setState({
      postData,
    })
  }

  onLikePost = async postId => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likePost = {like_status: true}
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likePost),
      method: 'POST',
    }
    await fetch(apiUrl, options)

    this.setState(prev => ({
      postData: prev.postData.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount + 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  onUnLikePost = async postId => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const unLikePost = {like_status: false}
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(unLikePost),
      method: 'POST',
    }
    await fetch(apiUrl, options)
    this.setState(prev => ({
      postData: prev.postData.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount - 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  render() {
    const {postData} = this.state
    return (
      <LikeStatusContext.Provider
        value={{
          onLikePost: this.onLikePost,
          onUnLikePost: this.onUnLikePost,
        }}
      >
        <ul className="posts-container">
          {postData.map(post => (
            <DisplayPost post={post} key={post.postId} />
          ))}
        </ul>
      </LikeStatusContext.Provider>
    )
  }
}

export default PostItems
