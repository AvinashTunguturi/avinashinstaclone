import React from 'react'

const LikeStatusContext = React.createContext({
  onLikePost: () => {},
  onUnLikePost: () => {},
})

export default LikeStatusContext
