import { useRef, useContext, useState, useCallback } from "react";
import { UserContext } from "./UserContext";
import { useDropzone } from "react-dropzone";

export default function NewTask({ loadTasks }) {

    const newTaskInputRef = useRef(null);
    const { userid } = useContext(UserContext);
    const [taskImg, setTaskImg] = useState(null);
    const [previewTaskImgUrl, setPreviewTaskImg] = useState(null);
    const [isLoadingImg, setIsLoadingImg] = useState(false);
    const [maxSize, setMaxSize] = useState(false)

    const onDrop = useCallback((files) => {
        let taskImg = files[0];
        console.log(taskImg.size)
        if (taskImg.size > 2 * 1024 * 1024) {
            setMaxSize(true);
            return;
        }
        setMaxSize(false)
        setTaskImg(taskImg);
        console.log('task image:', taskImg)

        let fileReader = new FileReader();
        fileReader.readAsDataURL(taskImg);
        fileReader.onloadend = function () {
            setPreviewTaskImg(fileReader.result)
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg']
        }
    });

    async function addTask(event) {
        event.preventDefault();
        if (newTaskInputRef.current.value == '') return;
        let fd = new FormData();
        if (taskImg) {
            fd.append('taskImage', taskImg);
        }
        fd.append('userid', userid);
        fd.append('title', newTaskInputRef.current.value);

        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            credentials: "include",
            body: fd
        });
        loadTasks();
        newTaskInputRef.current.value = '';
        setIsLoadingImg(false);
        setTaskImg(null);
        setPreviewTaskImg(null);
        setMaxSize(false);
    };

    return <form className="input-container" onSubmit={addTask}>
        <input
            type="text"
            id="new_task"
            name="new_task"
            placeholder="Add a new task"
            ref={newTaskInputRef}
            onChange={() => setIsLoadingImg(true)}
        />
        {isLoadingImg && <>
            <div {...getRootProps()} className="task-img-container" >
                <p>Upload task image (optional)</p>
                {maxSize && <p>Image size is too large</p>}

                <input {...getInputProps()} />
                {taskImg && <img src={previewTaskImgUrl} width="250" height="150" />}
            </div>
        </>}
        <button
            id='addButtonStyle'
            type="submit"
            className="add_task buttonStyle"
        >+</button>
    </form>
}