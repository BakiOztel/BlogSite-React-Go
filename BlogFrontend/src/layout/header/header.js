import { Navbar, Container, Nav, Form, InputGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai"
import "./header.css"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice.js";
const Header = () => {
    const data = useSelector(selectCurrentUser);
    return (
        <Navbar fixed="top" style={{ backgroundColor: "#242526" }} className="border-bottom border-secondary" variant="dark" >
            <Container fluid className="mx-4">
                <Navbar.Brand as={Link} to="/" className="fs-2">KküSohbet</Navbar.Brand>
                <Form style={{ width: "47em" }}>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                            <AiOutlineSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="border-start-0"
                        />
                    </InputGroup>
                </Form>
                <Nav className="header-nav">
                    {data === null ? (
                        <Button variant="secondary" as={Link} to={"/login"}>Log in</Button>
                    ) : (
                        <Nav.Link className="border rounded-circle border-secondary me-2" as={Link} to={`/profile/${data.Username}`}>
                            <Image className="header-profile-img p-0 " fluid roundedCircle src="https://picsum.photos/200" />
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
export default Header;