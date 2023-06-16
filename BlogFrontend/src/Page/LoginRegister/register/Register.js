import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../api/authApiSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [Register, { isLoading }] = useRegisterMutation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
    });
    const onSubmit = async (data) => {
        try {
            const userData = await Register(data).unwrap();
            navigate("/login");
        } catch (err) {
            console.log(err)
            setError("email", {
                type: "custom",
                message: err.data.message
            })
        }
    }
    return (<div>
        <span className="form-header text-dark">Sign in</span>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3 mt-4" >
                <Form.Label className="text-dark ">Username</Form.Label>
                <Form.Control {...register("Username", { required: "please fill" })} type="text" />
            </Form.Group>
            <Form.Group className="mb-3 mt-4" >
                <Form.Label className="text-dark ">Email address</Form.Label>
                <Form.Control {...register("Email", { required: "please fill" })} type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className=" mb-3 mt-4" >
                <Form.Label className="text-dark " >Password</Form.Label>
                <Form.Control {...register("Password", { required: "please fill" })} type="password" />
            </Form.Group>
            <Form.Group className=" mb-3 mt-4" >
                <Form.Label className="text-dark " >Password Check</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <div>
                <Button type="submit" className="login-submit-btn">Start having fun  </Button>
            </div>
        </Form>
    </div>);
}
export default RegisterPage;