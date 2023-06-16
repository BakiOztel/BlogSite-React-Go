import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./header/header.js";
import LeftSlide from "../Page/LeftSlide/leftslide.js";

const PostLayout = () => {
    return (
        <Container className="position-relative" fluid>
            <Row>
                <Header />
            </Row>
            <Row style={{ backgroundColor: "#18191A" }} className="pt-5">
                <Col className="pt-5 left_col" lg="2" >
                    <LeftSlide />
                </Col>
                <Col className="pt-5" lg="10">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}

export default PostLayout;