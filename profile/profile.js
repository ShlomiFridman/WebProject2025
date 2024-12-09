
clickAction => function () {
    const name = prompt('Enter your name:', 'John Doe');
    const bio = prompt('Enter your bio:', 'Web Developer | Tech Enthusiast | Lifelong Learner');
    const about = prompt('Enter about me text:', 'I am a passionate web developer...');

    if (name) document.getElementById('name').textContent = name;
    if (bio) document.getElementById('bio').textContent = bio;
    if (about) document.getElementById('about').textContent = about;
};

// Toggle dark theme
const toggle = () => document.documentElement.classList.toggle('dark');

document.getElementById('homeBtn').addEventListener('click', gotoHome);
document.getElementById('profileBtn').addEventListener('click', gotoProfile);
document.getElementById('logoutBtn').addEventListener('click', gotoLogin);


// Navigation functions
function gotoLogin(){
    console.log("Going to login");
    window.location.href = "../login/login.html";
}

function gotoHome(){
    console.log("Going to home");
    window.location.href = "../home/home.html";
}

function gotoProfile(){
    console.log("Going to profile");
    window.location.href = "../profile/profile.html";
}

// Set up button listeners and event handlers
const menuButton = document.getElementById('menuButton');
const homePageBtn = document.getElementById('home2Btn');
const profilePageBtn = document.getElementById('profile2Btn');
const logoutBtn = document.getElementById('logout2Btn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeToggleBtnDark = document.getElementById('themeToggleBtnDark');

// Toggle menu visibility
menuButton.addEventListener('click', () => {
    document.getElementById('ddMenu').classList.toggle('hidden');
});

// Home, profile, and logout actions
homePageBtn.addEventListener('click', gotoHome);
profilePageBtn.addEventListener('click', gotoProfile);
logoutBtn.addEventListener('click', gotoLogin);

// Theme toggle action
themeToggleBtn.addEventListener('click', toggle);
themeToggleBtnDark.addEventListener('click', toggle);

