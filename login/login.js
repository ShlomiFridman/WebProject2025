import * as FakeData from "../utils/FakeData.js"

let flag = false;

export function changeToDarkMode(btn) {
    const htmlElement = document.documentElement;

    // Toggle the dark class
    htmlElement.classList.toggle('dark');
    btn.innerHTML = !flag? "Light Mode":"Dark Mode"
    console.log(btn.innerHTML)
    flag = !flag;
}

export function submitClicked(event){
    event.preventDefault();
    let infoText = document.getElementById("login_infoText");
    let formData = new FormData(event.target)
    let fakeAccounts = FakeData.getAccountExamples();
    let username = formData.get("username").toLocaleLowerCase();
    let password = formData.get("password");
    for (const ac of fakeAccounts){
        if (ac.username == username && ac.password == password){
            console.log(`Found user: ${ac}`)
            localStorage.setItem("username", username)
            window.location.href = "../home/home.html"
            return false;
        }
    }
    console.log("Invalid")
    infoText.innerHTML = "Invalid username or password"
    return false;
}

// Attach the function to the global window object so the HTML can access it
window.changeToDarkMode = changeToDarkMode;

window.submitClicked = submitClicked;
