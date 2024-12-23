import { Button, Navbar } from "react-bootstrap";

export default function NavBar({handleSignOut}) {
    
    return (
        <Navbar bg="primary" sticky="top">
            <Navbar.Collapse className="justify-content-between" style={{paddingRight: "10px", paddingLeft: "10px"}}>
                <Navbar.Brand style={{color: 'white'}}>MyBlog</Navbar.Brand>
                <Button onClick={handleSignOut}>Sign Out</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}