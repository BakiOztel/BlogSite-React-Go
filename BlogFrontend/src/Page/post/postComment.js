import { Col, Image, Row } from "react-bootstrap";
const PostComment = (data) => {
    return (
        <>
            <Row className="d-flex m-3">
                <Col lg={2}>
                    <Image className="post_profile_img_sp p-0" fluid roundedCircle src="https://picsum.photos/200" />

                </Col>
                <Col>
                    <span className="ms-0">{data.data.username}</span>
                    <hr
                        style={{
                            color: "gray",
                            backgroundColor: "gray",
                            height: 2
                        }}
                    />
                    <p className="post_comment_txt">{data.data.comment}</p>
                </Col>
            </Row>
            <hr
                style={{
                    color: "gray",
                    backgroundColor: "gray",
                    height: 5
                }}
            />
        </>
    );
}
export default PostComment;