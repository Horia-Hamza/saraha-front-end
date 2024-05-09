async function includeNavbar() {
  try {
    const response = await fetch('navbar.html');
    const navbarHtml = await response.text();
    document.querySelector('body').insertAdjacentHTML('afterbegin', navbarHtml);
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

// Function to execute after the navbar is included
async function initializeApp() {
  console.log(window.location.pathname);
  await includeNavbar(); // Wait for navbar to be included
  
  // Now you can safely access elements in the navbar
  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');
  const myMessages = document.getElementById('myMessages');
  const myProfile = document.getElementById('myProfile');
  const signOut = document.getElementById('signOut');

  if (JSON.parse(localStorage.getItem("userData"))) {
    signInBtn.classList.add('d-none'); // Add class to hide
    signUpBtn.classList.add('d-none'); // Ensure it's visible
  } else {
    console.log(signInBtn);
    signInBtn.classList.remove('d-none'); // Ensure it's visible
    signUpBtn.classList.remove('d-none'); // Hide it
    myMessages.classList.add('d-none'); // Hide it
    myProfile.classList.add('d-none'); // Hide it
    signOut.classList.add('d-none'); // Hide it
  }
}

// Initialize the app
initializeApp();

if (JSON.parse(localStorage.getItem("userData"))) {
if (window.location.pathname=='/signin.html') {
  window.location.href ='./index.html';

}
}
else{
  if (window.location.pathname!='/signin.html') {
    window.location.href ='./signin.html';
    
  }
}


  
// });
// Function to fetch and insert the navbar into the page

 function logout(){
  console.log('dsdsds');
  localStorage.removeItem('userData')
  localStorage.removeItem('token')
  window.location.href ='./signin.html';
}
