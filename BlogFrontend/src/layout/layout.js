import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./header/header.js";
import LeftSlide from "../Page/LeftSlide/leftslide.js";
import { useIsLoginMutation } from "../api/authApiSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logOut, setCredentials } from "../redux/authSlice.js";

const Layout = () => {

    const [getUser, { isLoading }] = useIsLoginMutation();

    const dispatch = useDispatch();

    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const userData = await getUser();
                if (userData.error?.status === 401) {
                    dispatch(logOut())
                } else {
                    dispatch(setCredentials({ ...userData.data }));
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                dispatch(logOut)
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    return (
        <Container className="position-relative layout-container" fluid>
            {Loading ? (<div></div>) : (
                <>
                    <Row>
                        <Header />
                    </Row>
                    <Row style={{ backgroundColor: "#18191A" }} className="pt-5">
                        <Col className="pt-5 border-right border-secondary" lg="2" >
                            <LeftSlide />
                        </Col>
                        <Col className="pt-5" lg="8">
                            <Outlet />
                        </Col>
                        <Col lg="2">

                        </Col>
                    </Row>
                    <Row>

                    </Row>

                </>
            )}
        </Container>
    );
}

export default Layout;

