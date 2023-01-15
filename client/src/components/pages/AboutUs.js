import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AboutUs = () => {
  return (
    <div className='about-us-flex-container'>
      <h3>Creators:</h3>
      <hr></hr>
      <div className='about-us-flex'>
        <p>Shawn Fladager</p>
        <a href="https://github.com/sfladager" target="blank"><i className="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/shawnfladager/" target="blank"><i className="fa-brands fa-linkedin"></i></a>
      </div>
      <hr></hr>
      <div className='about-us-flex'>
        <p id="loksze-links">Lok Sze Chung</p>
        <a href="https://github.com/lokszechung" target="blank"><i className="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/lokszechung" target="blank"><i className="fa-brands fa-linkedin"></i></a>
      </div>
      <hr></hr>
      <div className='about-us-flex'>
        <p id="gael-links">Gael Duchesne</p>
        <a href="https://github.com/gael37" target="blank"><i className="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/gael-duchesne-285858256/" target="blank"><i className="fa-brands fa-linkedin"></i></a>
      </div>
      <hr></hr>
    </div>
  )
}

export default AboutUs