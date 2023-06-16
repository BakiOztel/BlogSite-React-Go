import { Container, Row } from "react-bootstrap";
import PostLayout from "./mainPost/post.js";
import SendPost from "./sendPost/sendPost.js";
import "./main.css";
import { useGetAllPostQuery } from "../../api/postApiSlice.js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice.js";
const MainPage = () => {
    const { data, isLoading, isSuccess } = useGetAllPostQuery();
    const userData = useSelector(selectCurrentUser)
    return (<Container className="mainContainer">
        {userData ? (<Row className="d-flex justify-content-center">
            <SendPost />
        </Row>) : (<></>)}
        {isLoading && <div>ASDASD</div>}
        {isSuccess && <>
            {data && <>
                {data.posts.map((datax) => (
                    <Row className="d-flex justify-content-center">
                        <PostLayout data={datax} />
                    </Row>
                ))}
            </>}
        </>}
    </Container>)
}
export default MainPage;