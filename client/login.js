async function loginBtnClicked() {
    let username = document.querySelector("#username-input").value;
    let pass = document.querySelector("#user-pass").value;
    if (!username || !pass) return;
    document.querySelector("#username").innerText = username;
    document.querySelector("#login-button").innerText = "Logging in...";
    const response = await fetch(`http://localhost:3000/users/login?username=${username}&pass=${pass}`, {
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result = await response.json();
    if (result.ok) {
        userState.username = username;
        userState.pass = result.pass;
        userState.userid = result.id;
        console.log(userState);
        await getTasks(userState.userid);
        welcomeUser();
        setTimeout(displayApp, 1000);
    } else {
        document.querySelector("#login-button").innerText = "Log in";
        alert("Invalid username or password");
    }
};

async function signupBtnClicked() {
    let username = document.querySelector("#new-username-input").value;
    let pass = document.querySelector("#new-user-pass").value;
    if (!username || !pass) return;
    document.querySelector("#username").innerText = username;
    document.querySelector("#signup-button").innerText = "Creating account...";
    let newUserObject = {
        username: username,
        email: document.querySelector("#new-user-email").value,
        pass: pass
    }
    let response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserObject)
    });
    let user = await response.json();
    userState.username = username;
    userState.pass = pass;
    userState.userid = user.id;
    setTimeout(welcomeUser, 500);
    setTimeout(displayApp, 1500);
};

function welcomeUser() {
    document.querySelector(".welcome").style.display = "none";
    document.querySelector("#welcome").style.display = "block"
};

function displayApp() {
    let title = "Welcome to our To-Do App!!";
    document.querySelector("#welcome").style.display = "none";
    document.querySelector(".todo-container").style.display = "block";
    displayTasks();
    for (let i = 0; i < title.length; i++) {
        setTimeout(function () {
            let substring = title.substring(0, i + 1);
            if (i < title.length - 1) substring += "_"
            document.querySelector("#app-title").innerText = substring
        }, i * 100)
    }
}