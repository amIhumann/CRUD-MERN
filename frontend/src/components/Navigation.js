import React,{useEffect,useState} from 'react'
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage ,refreshToken} from './utils';

const Navigation = () => {
    const navigate=useNavigate()
    const [name, setName] = useLocalStorage('name', '')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    useEffect(() => {
        refreshToken(setToken, setName,setExpire, navigate)
    }, [])
    const logout = () => {
        Swal.fire({
            title: 'Logout',
            text: "Are you sure you want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete('http://localhost:5000/logout')
                navigate('/')
                localStorage.clear()
            }
        })
    }
    return (
        <Navbar bg="dark" expand="lg" w="100" variant="dark">
            <Container>
            <Navbar.Brand href="/users"><img src={process.env.PUBLIC_URL + "logo512.png"} width="30" height="30" className="d-inline-block align-top" /> React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Navbar.Brand style={{fontSize:'15px',marginTop:'2px'}}>{name}</Navbar.Brand>  
                        {/* <Nav.Link  href="#home">Home</Nav.Link> */}

                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        <Button variant="dark" onClick={logout} className="fa fa-sign-out"> Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation