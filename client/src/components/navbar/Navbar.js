import { Container, Flex } from '@chakra-ui/react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {
  return (
    <Container className="navbar-container" maxW={[null, null, null, 1600]}>
      <NavbarDesktop />
      <NavbarMobile />
    </Container>
  )  
}

export default Navbar