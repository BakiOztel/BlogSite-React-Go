import { Col, Container, Row, Image, Button, Figure } from "react-bootstrap";
import "./profile.css"
import Emptyimage from "../../img/empty.jpg"
import ProfilePost from "./profilePost.js";
import { useParams } from "react-router-dom";
import { useGetProfilePostQuery } from "../../api/postApiSlice.js";

const ProfilePage = () => {

    const { username } = useParams();
    const { data, isSuccess, isError } = useGetProfilePostQuery(username);
    return (<Container className="ps-5 profile_cont">
        <Row className="border-bottom border-secondary">
            <Col lg="4" className="d-flex justify-content-center">
                {
                    isSuccess && <>
                        {data.profileImg ? (<Image className="profile_pp_img p-0" fluid roundedCircle src="https://picsum.photos/id/20/200" />) : (
                            <Image className="profile_pp_img p-0" fluid roundedCircle src={Emptyimage} />
                        )}
                    </>
                }

            </Col>
            <Col lg="8">
                {isSuccess && <>
                    <Row className="d-flex flex-row">
                        <span className="profile_name">{data.username}</span>
                        <Button variant="light" className="border profile_setting_pd">Profili Düzenle</Button>
                    </Row>
                    <Row className="d-flex flex-row  profile_stat">
                        <span className="w-25"> {data.posts.length} gönderi</span>
                        <span className="w-25">{data.followers} followers</span>
                        <span className="w-25">{data.following} following</span>

                    </Row>
                </>}
            </Col>
        </Row>
        <Row>


            {isSuccess && <>
                {data.posts.map((datax) => (
                    <Col lg={4} className="p-0 mt-2">
                        <ProfilePost like={datax.like} id={datax.id} />
                    </Col>
                ))}
            </>}
        </Row>
    </Container>)
}
export default ProfilePage;