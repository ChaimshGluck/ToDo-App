import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useRef, useContext } from "react";

export default function Login() {
    const navigate = useNavigate();
    const usernameElem = useRef(null);
    const passwordElem = useRef(null);
    const { setUserid } = useContext(UserContext);

    async function loginHandler(event) {
        event.preventDefault();
        let username = usernameElem.current.value;
        let pass = passwordElem.current.value;
        if (!username || !pass) return;

        try {
            let response = await fetch(`http://localhost:3000/users/login?username=${username}&password=${pass}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                credentials: 'include'
            });

            if (!response.ok) {
                let error = await response.json();
                alert(error.message);
                return;
            }

            let user = await response.json();
            if (user.ok) {
                console.log(user);
                setUserid(user.id);
                // navigate('/welcome');
                setTimeout(() => navigate(`/tasks`), 300);
            }
        } catch (error) {
            alert("An error occurred while trying to log in. Please try again.");
        }
    };

    return <form onSubmit={loginHandler}>
        <h3>Sign into your account</h3>
        <div className="login-container">
            <div>
                <label htmlFor="username_input">Please enter your username</label>
                <input id="username_input" name="username_input" type="text" ref={usernameElem} />
            </div>
            <div>
                <label htmlFor="user_pass">Enter your password</label>
                <input id="user_pass" name="user_pass" type="password" ref={passwordElem} />
            </div>
            <div>
                <button type="submit" className="login_button" >Log in</button>
            </div>
        </div>
        <h3>If you don't have an account <a href="./signup" >create one</a></h3>
    </form>
}