import SearchContext from '../../context/SearchContext'
import Stories from '../Stories'
import Posts from '../Posts'
import SearchFunction from '../SearchFunction'

import Header from '../Header'

import './index.css'

const Home = () => (
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
              <>
                <Stories />
                <Posts />
              </>
            )}
          </div>
        </>
      )
    }}
  </SearchContext.Consumer>
)

export default Home
