import './index.css'

const UserStories = props => {
  const {story, profileRoute} = props
  const {image} = story

  return (
    <li className="story-container">
      <img src={image} alt={`${profileRoute} story`} className="story-image" />
    </li>
  )
}

export default UserStories
