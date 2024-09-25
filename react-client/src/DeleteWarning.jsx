import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function DeleteWarning({ taskToDelete, loadTasks, setShowDeleteBox }) {
    const { userid } = useContext(UserContext);

    async function confirmDelete() {
        await fetch(`http://localhost:3000/tasks/${taskToDelete.current}?userid=${userid}`, {
            method: "DELETE",
            credentials: 'include'
        });
        setShowDeleteBox(false);
        loadTasks();
    }

    function cancelDelete() {
        setShowDeleteBox(false);
    }

    return <div id="deleteBox" >
        <div id="deleteAlert">
            <p>Are you sure you want to delete?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
        </div>
    </div>
}
