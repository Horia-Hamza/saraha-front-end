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
  // await includeNavbar(); // Wait for navbar to be included
  
  // Now you can safely access elements in the navbar
  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');
  const myMessages = document.getElementById('myMessages');
  const myProfile = document.getElementById('myProfile');
  const signOut = document.getElementById('signOut');
  const signOutLogo = document.getElementById('signOutLogo');
  const signInLogo = document.getElementById('signInLogo');
  const index = document.getElementById('index');

  if (JSON.parse(localStorage.getItem("userData"))) {
    signInBtn.classList.add('d-none'); // Add class to hide
    signUpBtn.classList.add('d-none'); // Ensure it's visible
    signOutLogo.classList.add('d-none'); // Ensure it's visible
    signInLogo.classList.remove('d-none');
    index.classList.add('d-none');
    index.classList.remove('d-block');
    myMessages.classList.remove('d-none');
    myProfile.classList.remove('d-none');
    signOut.classList.remove('d-none');

  } else {
    console.log(signInBtn);
    signInBtn.classList.remove('d-none'); // Ensure it's visible
    signUpBtn.classList.remove('d-none'); // Hide it
    signOutLogo.classList.remove('d-none');
    signInLogo.classList.add('d-none');// Ensure it's visible
    myMessages.classList.add('d-none'); // Hide it
    myProfile.classList.add('d-none'); // Hide it
    signOut.classList.add('d-none'); // Hide it
    index.classList.remove('d-none');
    index.classList.add('d-block');

  }
}

// Initialize the app
initializeApp();

if (JSON.parse(localStorage.getItem("userData"))) {
  if (window.location.pathname=='/signin.html'
    ||window.location.pathname=='/'
  ) {
    window.location.href ='./messages.html';
  }
  }
  else{
    if (window.location.pathname !='/signin.html'
    &&window.location.pathname != '/index.html'
    &&window.location.pathname != '/signup.html'   
    &&window.location.pathname != '/forget-password.html'   
    &&window.location.pathname != '/send-message.html'   
    ) {
      if (window.location.pathname == '/') {
        window.location.href ='./index.html';
      } else {
        
        window.location.href ='./signin.html';
      }
      
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
