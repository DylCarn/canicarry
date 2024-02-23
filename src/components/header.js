import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-dark" sticky='top' style={{paddingTop:"15px"}}>
      <Container fluid="true">
      <Navbar.Brand href="#" className='text-center' style={{paddingLeft:"10px"}}><img src="logo192.png" width={30} height={30} alt="Logo"/></Navbar.Brand>
      </Container>
  </Navbar>
  );
}

export default Header;