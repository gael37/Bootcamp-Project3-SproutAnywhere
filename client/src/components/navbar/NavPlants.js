import { Link } from 'react-router-dom'

const NavPlants = (isOpen, closeDropdown) => {

  return (
    <nav>
      <ul className="nav-plants-drop-ul">
        <Link to="/plants" className="nav-drop-plants nav-drop-all">all plants</Link>
        <Link to="/plants/succulents" className="nav-drop-plants nav-drop-succulent">succulents</Link>
        <Link to="/plants/palms" className="nav-drop-plants nav-drop-palms">palms</Link>
        <Link to="/plants/bonsai" className="nav-drop-plants nav-drop-bonsai">bonsai</Link>
        <Link to="/plants/ferns" className="nav-drop-plants nav-drop-ferns">ferns</Link>
        <Link to="/plants/foliage" className="nav-drop-plants nav-drop-foliage">foliage</Link>
      </ul>
    </nav>
  )
}

export default NavPlants
