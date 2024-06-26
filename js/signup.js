const succussMessage = document.getElementById('succussMessage')
const alertMessage = document.getElementById('alert')
// Function to handle sign-up
      async function signUp(event) {
         event.preventDefault(); // Prevent default form submission
         //
         const userName = document.getElementById("signupUserName").value;
         const email = document.getElementById("signupEmail").value;
         const password = document.getElementById("signupPassword").value;
         const cPassword = document.getElementById(
           "signupConfirmPassword"
         ).value;
         const gender = document.getElementById("gender").value;
 
         // Validate password and confirm password
         if (password !== cPassword) {
          alertMessage.classList.add('d-block');
          alertMessage.classList.remove('d-none');
          alertMessage.innerHTML = "كلمات المرور غير متطابقة"
           return;
         }
 
         // Validate password format
         const passwordRegex =
           /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
         if (!passwordRegex.test(password)) {
          alertMessage.classList.add('d-block');
          alertMessage.classList.remove('d-none');
          alertMessage.innerHTML = 'كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم.'
           return;
         }
 
         try {
           const response = await axios.post(
             "https://saraha-gilt.vercel.app/auth/signup",
             {
               userName: userName,
               email: email,
               password: password,
               cPassword: cPassword,
               gender: gender,
             }
           );
 
           // Handle response, such as displaying a success message or redirecting to another page
           console.log("Sign up successful:", response.data);
           window.location.href = "./verifyEmail.html";
         } catch (error) {
           // Handle error, such as displaying an error message to the user
           console.error("Sign up failed:", error.response.data.message);
           alertMessage.classList.add('d-block');
           alertMessage.classList.remove('d-none');
           alertMessage.innerHTML = error.response.data.message
         }
       }
 
       // Add event listener to the form
       document.getElementById("signupForm").addEventListener("submit", signUp);