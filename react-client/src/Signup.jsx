import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";
import UserSchema from "./UserSchema";

export default function Signup() {

    const navigate = useNavigate();
    const { setUserid } = useContext(UserContext);
    const { setProfileImg } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [dataUrl, setDataUrl] = useState();

    const onDrop = useCallback((files) => {
        let localFile = files?.[0]
        if (localFile) {
            setFile(localFile);
            let fileReader = new FileReader();
            fileReader.readAsDataURL(localFile);

            fileReader.onloadend = function () {
                setDataUrl(fileReader.result);
            }
        }
    }, [])

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg']
        }
    });

    // async function uploadFile() {
    // let fd = new FormData();
    // fd.append('profile', file);
    // console.log(`fd: ${fd}`);

    // let response = await fetch("http://localhost:3000/users/upload-profile", {
    //     method: "POST",
    //     body: fd
    // })
    // let responseData = await response.json();
    // console.log(responseData);
    // setUrl(responseData.url)
    // }

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
            // let fd = new FormData();
            // fd.append('profile', file);
            // console.log(`fd: ${fd}`);

            // let response = await fetch("http://localhost:3000/users/upload-profile", {
            //     method: "POST",
            //     body: fd
            // })
            // let responseData = await response.json();
            // console.log(responseData);
            // setUrl(responseData.url)
            let fd = new FormData();
            fd.append('firstName', values.first_name_input);
            fd.append('lastName', values.last_name_input);
            fd.append('email', values.new_user_email);
            fd.append('username', values.new_username_input);
            fd.append('pass', values.new_user_pass);
            if (file) {
                fd.append('profile', file);
            }
            let response = await fetch('http://localhost:3000/users', {
                method: "POST",
                body: fd
            });
            let user = await response.json();
            setUserid(user.id);
            setProfileImg(user.profileImg);
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
                            <img src={dataUrl} className="preview" alt="Profile Preview" width="250" height="150" /> :
                            <p>{isDragActive ? "Please drop your file here" : "Please drag and drop yor file here"}</p>
                        }
                    </div>
                </section>
                <section>
                    <button className={`signup-button ${Object.keys(formik.errors).length > 0 ? "disabled" : ""}`}
                        type="submit"
                    >
                        Sign up
                    </button>
                </section>
                <h3><a href="./">Log into</a> your existing account</h3>
            </div>
        </form>
    )
}