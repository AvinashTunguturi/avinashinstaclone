import Slider from 'react-slick'

import './index.css'

const StoriesSlider = props => {
  const {userStories} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="main-container">
      <div className="slick-container">
        <Slider {...settings}>
          {userStories.map(eachStory => {
            const {storyUrl, userId, userName} = eachStory
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="user story" />
                <p className="story-teller-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default StoriesSlider
