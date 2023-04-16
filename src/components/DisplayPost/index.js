import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import LikeStatusContext from '../../context/LikeStatusContext'
import SearchContext from '../../context/SearchContext'

import './index.css'

const DisplayPost = props => (
  <SearchContext.Consumer>
    {value => {
      const {onClickRouteLink} = value

      return (
        <LikeStatusContext.Consumer>
          {value1 => {
            const {onLikePost, onUnLikePost} = value1

            const onClickLink = () => {
              onClickRouteLink()
            }

            const {post} = props
            const {
              comments,
              createdAt,
              likesCount,
              postDetails,
              postId,
              profilePic,
              userId,
              userName,
              likeStatus,
            } = post

            const {caption, imageUrl} = postDetails

            const onClickLike = () => {
              onLikePost(postId)
            }

            const onClickUnLike = () => {
              onUnLikePost(postId)
            }

            return (
              <li className="post-container">
                <div className="post-header">
                  <div className="profile-pic__container">
                    <img
                      src={profilePic}
                      alt="post author profile"
                      className="profile-pic"
                    />
                  </div>
                  <Link
                    to={`/users/${userId}`}
                    className="username-link"
                    onClick={onClickLink}
                  >
                    <p className="username">{userName}</p>
                  </Link>
                </div>
                <img src={imageUrl} alt="post" className="post-pic" />
                <div className="post-details-container">
                  <div className="post-icons-container">
                    {likeStatus ? (
                      <button
                        type="button"
                        className="social-button"
                        onClick={onClickUnLike}
                        // eslint-disable-next-line react/no-unknown-property
                        testid="unLikeIcon"
                      >
                        <FcLike className="react-icon" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="social-button"
                        onClick={onClickLike}
                        // eslint-disable-next-line react/no-unknown-property
                        testid="likeIcon"
                      >
                        <BsHeart className="like-react-icon" />
                      </button>
                    )}
                    <button type="button" className="social-button">
                      <FaRegComment className="react-icon" />
                    </button>
                    <button type="button" className="social-button">
                      <BiShareAlt className="react-icon" />
                    </button>
                  </div>
                  <p className="post-likes">{likesCount} likes</p>
                  <p className="post-caption">{caption}</p>
                  <ul className="comments-container">
                    {comments.map(eachComment => (
                      <li key={eachComment.userId} className="comment">
                        <span className="commentator">
                          {' '}
                          {eachComment.userName}
                        </span>
                        <p>{eachComment.comment}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="post-published-at">{createdAt}</p>
                </div>
              </li>
            )
          }}
        </LikeStatusContext.Consumer>
      )
    }}
  </SearchContext.Consumer>
)

export default DisplayPost
