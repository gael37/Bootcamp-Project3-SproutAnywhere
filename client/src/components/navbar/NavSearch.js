import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Flex, Select, Input } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const NavSearch = () => {

  // When search bar is clicked open a dropdown menu and query plants DB to get all plants 
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState(null)

  const [ plants, setPlants ] = useState([])
  const [ filteredPlants, setFilteredPlants ] = useState([])
  const [ search, setSearch ] = useState([])
 
  const handleSearchClick = () => {
    console.log('search clicked')
    setOpen(!open)
  }

  const clickOutDropdown = (e) => {
    if (e.target.classList.contains('search-list-input')) return
    if (!e.target.classList.contains('search-dropdown-container')) {
      setOpen(false)
      setFilteredPlants([])
    }
  }

  // Display search results in the drop downmenu
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/plants')
        setPlants(data)
      } catch (err) {
        console.error(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])

  // takes input from search bar
  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }
  const filterByName = () => {
    const regex = new RegExp(search, 'i')
    const selectedPlants = plants.filter(plant => {
      return regex.test(plant.name)
    })
    setFilteredPlants(selectedPlants)    
  }

  const clearSearch = (e) => {
    setFilteredPlants([])
  }


  useEffect(() => {
    filterByName()
  }, [search])

  return (
    <>
      <SearchIcon onClick={handleSearchClick} className="search-icon" w={17} h={17} />
      {open && <div className="search-dropdown-container" onClick={clickOutDropdown}>
        <input onChange={handleSearchInput} className="search-list-input" placeholder="Search by plant name" />
        {filteredPlants ? 
          filteredPlants.map(plant => {
            const { _id, name, thumbnail } = plant
            return (
              <Link onClick={clearSearch} key={_id} to={`/plants/${_id}`}>
                <div className="search-list">
                  <img className="search-img" src={thumbnail} />
                  <h6 className="search-title">{name}</h6>
                </div>
              </Link>
            )
          }
          )
          :
          errors ? <h2>Enter a plant name</h2> : <p>Loading...</p>
        }
      </div>}

    </>
    
  )
}

export default NavSearch