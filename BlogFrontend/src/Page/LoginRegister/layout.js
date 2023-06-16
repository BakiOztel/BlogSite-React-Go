import { Container } from "react-bootstrap";
import LoginLogo from "../../img/logo.jpg";
import "./layout.css";
import { Outlet } from "react-router-dom";
const LoginRegisterLayout = () => {
    return (
        <Container fluid className="w-100 h-100 LoginForm" style={{ backgroundImage: `url(${LoginLogo})` }}>
            <div className="loginFormDiv">
                <Outlet />
            </div>
        </Container>
    );
}

export default LoginRegisterLayout;