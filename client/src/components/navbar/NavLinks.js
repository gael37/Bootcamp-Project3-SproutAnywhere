import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../../helpers/auth'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'

const NavLinks = (open, isOpen, closeDropdown) => {
  const navigate = useNavigate()
  return (
    <nav>
      <ul className="nav-drop-ul slide-in-top slide-out-elliptic-top-bck">
        <Link to="/plants" className="nav-drop-link">plants</Link>
        <Link to="/blogs" className="nav-drop-link">blog</Link>
        <Link to="/aboutus" className="nav-drop-link">about us</Link>
        {isAuthenticated() ?
          <>
            <span className="nav-drop-link" onClick={() => handleLogout(navigate)}>logout</span>
            <Link to="/profile" className="nav-drop-link">my profile</Link>
          </>
          :
          <>
            <Link to="/register" className="nav-drop-link">register</Link>
            <Link to="/login" className="nav-drop-link">log in</Link>
          </>
        }
      </ul>
    </nav>
  )
}

export default NavLinks
