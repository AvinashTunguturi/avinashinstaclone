import {BsGrid3X3} from 'react-icons/bs'

import UserStories from '../UserStories'
import UserPostsList from '../UserPostsList'

import './index.css'

const ProfileDetails = props => {
  const {profileData, profileRoute} = props
  const {profile} = profileData
  const {
    followersCount,
    followingCount,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = profile

  return (
    <>
      <li className="profile-details-container">
        <h1 className="profile-name-sm">{userName}</h1>
        <div className="image-user-details">
          <img
            src={profilePic}
            alt={`${profileRoute} profile`}
            className="profile-image"
          />
          <div className="user-detail-container">
            <h1 className="profile-name-lg">{userName}</h1>
            <div className="stats-container">
              <div className="stat-container">
                <p className="stat-count">{postsCount}</p>
                <p className="stat-name">Posts</p>
              </div>
              <div className="stat-container">
                <p className="stat-count">{followersCount}</p>
                <p className="stat-name">followers</p>
              </div>
              <div className="stat-container">
                <p className="stat-count">{followingCount}</p>
                <p className="stat-name">following</p>
              </div>
            </div>
            <div className="bio-container-lg">
              <p className="bio-name">{userId}</p>
              <p className="bio">{userBio}</p>
            </div>
          </div>
        </div>

        <div className="bio-container-sm">
          <p className="bio-name">{userId}</p>
          <p className="bio">{userBio}</p>
        </div>

        <ul className="user-stories">
          {stories.map(story => (
            <UserStories
              key={story.id}
              story={story}
              profileRoute={profileRoute}
            />
          ))}
        </ul>
        <hr className="line" />

        <div className="posts-container-user">
          <div className="post-heading-container">
            <BsGrid3X3 className="post-grid-logo" />
            <h1 className="post-heading">Posts</h1>
          </div>
          <UserPostsList posts={posts} profileRoute={profileRoute} />
        </div>
      </li>
    </>
  )
}

export default ProfileDetails
