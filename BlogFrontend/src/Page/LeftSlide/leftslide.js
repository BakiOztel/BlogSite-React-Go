import { Nav, Image } from "react-bootstrap";
import { SlHome } from "react-icons/sl"
import { Link } from "react-router-dom";
import "./leftslide.css"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice.js";
const LeftSlide = () => {
    const data = useSelector(selectCurrentUser);
    return (
        <Nav className="flex-column pt-3 position-fixed" style={{ color: "white" }}>
            <Nav.Item className="border-bottom border-secondary ">
                <Nav.Link as={Link} to="/">
                    <SlHome color="white" size={25} />
                    <span className="ms-3">Ana Sayfa</span>
                </Nav.Link>
                {data ? (<Nav.Link as={Link} to={`/profile/${data.Username}`}>
                    <Image className="left_slide_img p-0" fluid roundedCircle src="https://picsum.photos/200" />
                    <span className="ms-3">{data.Username}</span>
                </Nav.Link>) : (<></>)}
            </Nav.Item>
        </Nav>
    );
}
export default LeftSlide;