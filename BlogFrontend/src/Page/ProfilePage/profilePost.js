import { Container, Image } from "react-bootstrap";
import { AiFillHeart, AiFillWechat } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



const ProfilePost = ({ like, id }) => {
    const randomInt = Math.floor(Math.random() * 20);
    const navigate = useNavigate();

    return (
        <Container onClick={() => { navigate(`/post/${id}`) }} className="position-relative profile_post_container p-0 ">
            <Image className="profile_post_ımg w-100" fluid src={`https://picsum.photos/id/${randomInt}/400/400`} />
            <div className="overlay">
                <div className="text">
                    <span>{like} <AiFillHeart className="ms-1" /></span>
                </div>
            </div>

        </Container>
    );
}
export default ProfilePost;