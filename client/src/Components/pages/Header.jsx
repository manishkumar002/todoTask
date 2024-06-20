import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
function ColorSchemesExample() {
  return (
    <>

      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand >TODOLIST</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='head' >Home</Link>
            <Link to="/view" className='ms-4 head'>View</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
