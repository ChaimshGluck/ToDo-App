export default function Welcome(){
    let title = "Welcome to our To-Do App!!";
            for (let i = 0; i < title.length; i++) {
                setTimeout(function () {
                    let substring = title.substring(0, i + 1);
                    if (i < title.length - 1) substring += "_"
                    document.querySelector("#welcome-title").innerText = substring
                }, i * 100)}

    return <h1 id="welcome-title"></h1>
}