import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";
import UserSchema from "./UserSchema";

export default function Signup() {

    const navigate = useNavigate();
    const { setUserid } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [dataUrl, setDataUrl] = useState();

    const onDrop = useCallback((files) => {
        let localFile = files?.[0]
        if (file) {
            setFile(localFile);
            let fileReader = new FileReader();
            fileReader.readAsDataURL(localFile);

            fileReader.onloadend = function () {
                setDataUrl(fileReader.result);
            }
        }
    }, [])

    const { getInputProps, getRootProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg']
        }
    });

    // const [file, setFile] = useState(null);
    // const [url, setUrl] = useState();
    // const [previewDataUrl, setPreviewDataUrl] = useState();

    // function fileChanged({ target }) {
    //     let localFile = target.files[0]
    //     setFile(localFile);
    //     console.log(`file: ${localFile}`)

    //     let fileReader = new FileReader();
    //     fileReader.readAsDataURL(localFile);

    //     fileReader.onloadend = function () {
    //         setPreviewDataUrl(fileReader.result);
    //     }
    // }

    async function uploadFile() {
        let fd = new FormData();
        fd.append('profile', file);
        console.log(`fd: ${fd}`);

        let response = await fetch("http://localhost:3000/users/upload-profile", {
            method: "POST",
            body: fd
        })
        let responseData = await response.json();
        console.log(responseData);
        setUrl(responseData.url)
    }

    const formik = useFormik({
        initialValues: {
            first_name_input: "",
            last_name_input: "",
            new_user_email: "",
            new_username_input: "",
            new_user_pass: ""
        },
        validationSchema: UserSchema,
        onSubmit: async (values) => {
            let newUser = {
                firstName: values.first_name_input,
                lastName: values.last_name_input,
                email: values.new_user_email,
                username: values.new_username_input,
                pass: values.new_user_pass,
            };
            let response = await fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            let user = await response.json();
            setUserid(user.id);
            navigate('/welcome')
            setTimeout(() => navigate(`/tasks`), 3000)
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <h3>Create an account</h3>
            </div>
            <div className="login-container">
                <section className={formik.touched.first_name_input && formik.errors.first_name_input ? "invalid" : ""}>
                    <label htmlFor="first_name_input">Please enter your first name</label>
                    <input
                        id="first_name_input"
                        name="first_name_input"
                        type="text"
                        value={formik.values.first_name_input}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.first_name_input && formik.errors.first_name_input ? (
                        <span>{formik.errors.first_name_input}</span>
                    ) : null}
                </section>
                <section>
                    <label htmlFor="last_name_input">Please enter your last name</label>
                    <input
                        id="last_name_input"
                        name="last_name_input"
                        type="text"
                        value={formik.values.last_name_input}
                        onChange={formik.handleChange}
                    />
                </section>
                <section className={formik.touched.new_user_email && formik.errors.new_user_email ? "invalid" : ""}>
                    <label htmlFor="new_user_email">Enter your email address</label>
                    <input
                        id="new_user_email"
                        name="new_user_email"
                        type="email"
                        value={formik.values.new_user_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.new_user_email && formik.errors.new_user_email ? (
                        <span>{formik.errors.new_user_email}</span>
                    ) : null}
                </section>
                <section className={formik.touched.new_username_input && formik.errors.new_username_input ? "invalid" : ""}>
                    <label htmlFor="new_username_input">Enter a username</label>
                    <input
                        id="new_username_input"
                        name="new_username_input"
                        type="text"
                        value={formik.values.new_username_input}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.new_username_input && formik.errors.new_username_input ? (
                        <span>{formik.errors.new_username_input}</span>
                    ) : null}
                </section>
                <section className={formik.touched.new_user_pass && formik.errors.new_user_pass ? "invalid" : ""}>
                    <label htmlFor="new_user_pass">Enter a password</label>
                    <input
                        id="new_user_pass"
                        name="new_user_pass"
                        type="password"
                        value={formik.values.new_user_pass}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.new_user_pass && formik.errors.new_user_pass ? (
                        <span>{formik.errors.new_user_pass}</span>
                    ) : null}
                </section>
                <section>
                    <label>Profile Picture</label>
                    <div className={"upload-section " + (isDragActive && "is-dragging")} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {file ?
                            <img src={dataUrl} className="preview" /> :
                            <p>{isDragActive ? "Please drop your file here" : "Please drag and drop yor file here"}</p>
                        }
                        {/* <input {...getInputProps()} type="file" onChange={(e) => fileChanged(e)} accept="image/png"></input> */}
                    </div>
                    {file && <button type="button" onClick={uploadFile}>Upload</button>}
                    {/* <p>Accepted Files</p>
                    {acceptedFiles.map((af) => {
                        return <p>{JSON.stringify(af)}</p>
                    })}
                    <p>Rejected Files</p>
                    {fileRejections.map((rf) => {
                        return <p>{JSON.stringify(rf)}</p>
                    })} */}
                    {/* {previewDataUrl && <img src={previewDataUrl} width="200" height="200" />}
                    {url && <img src={url} width="200" height="200"></img>} */}

                </section>
                <section>
                    <button className={`signup-button ${Object.keys(formik.errors).length > 0 ? "disabled" : ""}`}
                        type="submit"
                        id="signup-button"
                    >
                        Sign up
                    </button>
                </section>
                <h3><a href="./">Log into</a> your existing account</h3>
            </div>
        </form>
    )
}