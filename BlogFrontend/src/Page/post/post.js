import { Col, Container, Row, Image, Form, Button, Overlay } from "react-bootstrap";
import "./post.css";
import PostComment from "./postComment.js";
import { useParams } from "react-router-dom";
import { useCommentPostMutation, useGetPostQuery, useLikePostMutation } from "../../api/postApiSlice.js";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice.js";
const Post = () => {
    const userData = useSelector(selectCurrentUser)

    const { postid } = useParams();

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const randomInt = Math.floor(Math.random() * 20);

    const { data, isSuccess } = useGetPostQuery(postid);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
    });


    const [commentPost] = useCommentPostMutation({
        shouldUseNativeValidation: true,
    });
    const [Like] = useLikePostMutation({
        shouldUseNativeValidation: true,
    });

    const onSubmit = async (data) => {
        try {
            const comment = { postid: parseInt(postid), text: data.text }
            const x = await commentPost(comment)
        } catch (err) {
            setError("email", {
                type: "custom",
                message: err.data.message
            })
        }
    }

    const onSubmitLike = async (data) => {
        try {
            const like = await Like(data).unwrap();
            setShow(!show)
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <Container className="post_container_sp">
            {isSuccess && <>
                <Row className="post_row_sp">

                    <Col className=" p-0" lg={7}>
                        <Image className="p-0 post_img_sp w-100" fluid src={`https://picsum.photos/id/${randomInt * 2}/400/400`} />
                    </Col>
                    <Col className="p-0" lg={5}>
                        <Row className="post_profile_sp m-0">
                            <Col lg={2}>
                                <Image className="post_profile_img_sp p-0" fluid roundedCircle src={`https://picsum.photos/id/${randomInt}/400/400`} />
                            </Col>
                            <Col className="p-0" lg={10}>
                                <Row>
                                    {data.User.Username}
                                </Row>
                                <Row>
                                    {data.desc}
                                </Row>
                            </Col>
                        </Row>
                        <hr
                            style={{
                                color: "white",
                                backgroundColor: "white",
                                height: 5
                            }}
                        />
                        <Row className="pt-3 post_comment_row m-0">
                            {data.comments.Length === 0 ? (
                                <Row>
                                    <div style={{ color: "Red" }}>Şuanlık bir yorum bulunmuyor</div>
                                </Row>
                            ) : (
                                <>
                                    {data.comments.map((xy) => (
                                        <Row className="m-0 ">
                                            <PostComment data={xy} />
                                        </Row>
                                    ))}
                                </>
                            )}
                        </Row>
                        <Row >
                            <span className="post_span_like_sp">
                                {data.like} kişi beğendi
                            </span>
                        </Row>
                        {userData ? (<Row>
                            <Col lg={10}>
                                <Form onSubmit={handleSubmit(onSubmit)} className="d-flex">
                                    <Form.Control type="text" {...register("text", { required: "please fill" })} placeholder="Normal text" />
                                    <Button type="submit" variant="dark">Gönder</Button>
                                </Form>
                            </Col>

                            <Col>
                                <Button ref={target} onClick={() => { onSubmitLike({ id: data.id }) }} variant="secondary" className="p-0 w-100">
                                    <AiTwotoneLike />
                                </Button>
                                <Overlay target={target.current} show={show} placement="right">
                                    {({
                                        placement: _placement,
                                        arrowProps: _arrowProps,
                                        show: _show,
                                        popper: _popper,
                                        hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                        ...props
                                    }) => (
                                        <div
                                            {...props}
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: 'rgba(200, 200, 200, 0.75)',
                                                padding: '2px 10px',
                                                color: 'white',
                                                borderRadius: 3,
                                                ...props.style,
                                            }}
                                        >
                                            Liked
                                        </div>
                                    )}
                                </Overlay>
                            </Col>

                        </Row>) : (<></>)}

                    </Col>
                </Row>
            </>}
        </Container>
    )
}

export default Post;