const userData = JSON.parse(localStorage.getItem("userData"))
const token = JSON.parse(localStorage.getItem("token"))
const userEmail = document.getElementById('email_field')
const code = document.getElementById('code_field')
const password = document.getElementById('password_field')
const cPassword = document.getElementById('cPassword_field')

const succussMessage = document.getElementById('succussMessage')
const alertMessage = document.getElementById('alert')

async function sendCode(event) {
   event.preventDefault(); // Prevent default form submission
   try {
      
      const email =  userEmail.value
     const { data } = await axios.patch(
       'https://saraha-gilt.vercel.app/user/sendCode', {email} );
     console.log(data);
     if (data.message == "Done") {
      succussMessage.innerHTML = "check your email to get code"
      succussMessage.classList.remove('d-none');
      succussMessage.classList.add('d-block');
      alertMessage.classList.add('d-none');
      succussMessage.innerHTML = data.message

     }
   } catch (error) {
     console.log(error);
     if (error.response.data.message == "In-valid user") {
      alertMessage.innerHTML = 'in-valid email'
      alertMessage.classList.remove('d-none');
   alertMessage.classList.add('d-block');
   succussMessage.classList.add('d-none');
     }
   }
 }
 
document.getElementById('sendCodeForm').addEventListener('submit', sendCode);

async function forgetPass(event) {

   event.preventDefault(); // Prevent default form submission

   try {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

      if (!passwordRegex.test(password.value)||
      !passwordRegex.test(cPassword.value)) {

          alertMessage.innerHTML = 'كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم.'
          alertMessage.classList.remove('d-none');
       alertMessage.classList.add('d-block');
       succussMessage.classList.add('d-none');

        }
          if (password.value != cPassword.value) {
  alertMessage.innerHTML = 'password and confirm password miss match'
  alertMessage.classList.remove('d-none');
alertMessage.classList.add('d-block');
succussMessage.classList.add('d-none');
}
// if (code.value == null ||  password.value == null ||  cPassword.value == null || email.value == null ) {
//    alertMessage.classList.remove('d-none');
//    alertMessage.classList.add('d-block');
//    succussMessage.classList.add('d-none');
//    alertMessage.innerHTML = 'required fields'
//    console.log('sffffdfdf');
// }
      const userData = {
         email: userEmail.value,
         code: code.value,
         password: password.value,
         cPassword : cPassword.value 
      }

     const { data } = await axios.patch(
       'https://saraha-gilt.vercel.app/user/forgetPassword', userData );

     console.log(data);
if (data.message == 'Go to login') {
   window.location.href ='./signin.html';

}
   } catch (error) {
     console.log(error);
     console.log(error);
     if (error.response.data.message == "This code is wrong" ||
     error.response.data.message  == 'Validation error' ) {
      alertMessage.innerHTML = 'this code is wrong'
      alertMessage.classList.remove('d-none');
    alertMessage.classList.add('d-block');
    succussMessage.classList.add('d-none');     
   }
   }
 }
 
document.getElementById('forgetPassword').addEventListener('submit', forgetPass);