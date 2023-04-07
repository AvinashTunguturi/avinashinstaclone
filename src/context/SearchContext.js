import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  searchOn: false,
  searchOff: true,

  onClickSearchButton: () => {},
  onClickRouteLink: () => {},
})

export default SearchContext
