import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/authApiSlice.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { setCredentials } from "../../../redux/authSlice.js";
const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
    });

    const onSubmit = async (data) => {
        try {
            const userData = await login(data).unwrap();
            dispatch(setCredentials(userData))
            navigate("/");
        } catch (err) {
            setError("email", {
                type: "custom",
                message: err.data.message
            })
        }
    }
    return (
        <>
            <span className="form-header text-dark">Sign in</span>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3 mt-4" >
                    <Form.Label className="text-dark ">Email address</Form.Label>
                    <Form.Control  {...register("Email", { required: "please fill" })} type="text" name="Email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className=" mb-3 mt-4" >
                    <Form.Label className="text-dark " >Password</Form.Label>
                    <Form.Control {...register("Password", { required: "please fill" })} type="password" name="Password" />
                </Form.Group>
                <div>
                    <Button type="submit" className="login-submit-btn">Log in </Button>
                </div>
                <Button as={Link} to="/register" className="login-submit-btn mt-3 ">Register</Button>
            </Form>
        </>
    );
}
export default LoginPage;