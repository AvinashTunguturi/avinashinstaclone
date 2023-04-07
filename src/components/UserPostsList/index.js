import {BiCamera} from 'react-icons/bi'
import './index.css'

const UserPostsList = props => {
  const {posts, profileRoute} = props

  const renderPostListItems = () => (
    <ul className="user-posts-container">
      {posts.map(each => (
        <li className="post-image-container" key={each.id}>
          <img
            src={each.image}
            alt={`${profileRoute} post`}
            className="post-image"
          />
        </li>
      ))}
    </ul>
  )

  const renderNoPostView = () => (
    <div className="no-post-container">
      <div className="no-post-image-container">
        <BiCamera className="no-post-image" />
      </div>
      <h1 className="no-post-heading">No Posts Yet</h1>
    </div>
  )

  return <>{posts.length === 0 ? renderNoPostView() : renderPostListItems()}</>
}

export default UserPostsList
