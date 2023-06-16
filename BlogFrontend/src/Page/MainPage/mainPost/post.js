import { Button, Container, Form, Image, Nav, Overlay, Row } from "react-bootstrap"
import "./post.css"
import { AiTwotoneLike } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useCommentPostMutation, useLikePostMutation } from "../../../api/postApiSlice.js";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/authSlice.js";

const PostLayout = ({ data }) => {
    const userData = useSelector(selectCurrentUser);

    const randomInt = Math.floor(Math.random() * 20);
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const [login] = useLikePostMutation({
        shouldUseNativeValidation: true,
    });

    const [commentPost] = useCommentPostMutation({
        shouldUseNativeValidation: true,
    });


    const { register, handleSubmit, setError } = useForm();

    const onSubmit = async (data) => {
        try {
            const like = await login(data).unwrap();
            setShow(!show)
        } catch (error) {
            console.warn(error);
        }
    }
    const onSubmitComment = async (datax) => {
        try {
            const comment = { postid: data.id, text: datax.text }
            const x = await commentPost(comment)
        } catch (err) {
            setError("custom", {
                type: "custom",
                message: err.data.message
            })
        }
    }

    const navigate = useNavigate();
    return <Container fluid className="post mb-2 mt-2">
        <Row >
            <div className="d-flex  align-items-center">
                <Image className="post_img_top p-0 ms-1" fluid roundedCircle src="https://picsum.photos/id/21/200" />
                <div className="d-flex flex-column ms-3">
                    <Link to={`/profile/${data.User.Username}`}><span >{data.User.Username}</span></Link>
                </div>
            </div>

        </Row>
        <Row>
            <p className="ms-2 mt-2">
                {data.desc}
            </p>
        </Row>
        <Row>
            <Image fluid onClick={() => { navigate(`/post/${data.id}`) }} className="post_img_main" src={`https://picsum.photos/id/${randomInt}/400/400`} />

        </Row>
        {userData ? (

            <Row>
                <Nav fill >
                    <Nav.Item>
                        <Form onSubmit={handleSubmit(onSubmitComment)} className="d-flex">
                            <Form.Control type="text" {...register("text", { required: "please fill" })} placeholder="Normal text" />
                            <Button type="submit" variant="dark">Gönder</Button>
                        </Form>
                    </Nav.Item>

                    <Nav.Item ref={target} onClick={() => { onSubmit({ id: data.id }) }} as={Button} variant="dark" className="p-0">
                        <AiTwotoneLike />
                    </Nav.Item>
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
                </Nav>
            </Row>
        ) : (<></>)}

    </Container>
}
export default PostLayout;