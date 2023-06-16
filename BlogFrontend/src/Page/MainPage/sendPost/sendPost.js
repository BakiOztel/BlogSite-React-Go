import { Button, Form } from "react-bootstrap";
import "./sendPost.css";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../../../api/postApiSlice.js";
const SendPost = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
    });
    const [crpost] = useCreatePostMutation();
    const onSubmit = async (data) => {

        try {

            const x = await crpost(data).unwrap();
        } catch (err) {
            console.log(err)
            setError("email", {
                type: "custom",
                message: err.data.message
            })
        }
    }

    return (
        <div className="wrapper mb-2">

            <Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group >
                    <Form.Label>Ne düşünüyorsun</Form.Label>
                    <Form.Control as="textarea" {...register("Desc", { required: "please fill" })} rows={3} />
                </Form.Group>
                <Form.Group className="w-50"  >
                    <Form.Label>
                        Foto yükle
                    </Form.Label>
                    <Form.Control {...register("media_file", { required: "please fill" })} type="file" />
                </Form.Group>
                <Button type="submit" className="mainUploadbutton">Paylaş</Button>
            </Form>
        </div>
    );
}
export default SendPost;