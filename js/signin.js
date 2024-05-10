const succussMessage = document.getElementById('succussMessage')
const alertMessage = document.getElementById('alert')

async function getUserData(id){
   try {
     const {data} = await axios.get(`https://saraha-gilt.vercel.app/user/${id}`);
     console.log(data);
     localStorage.setItem('userData',JSON.stringify(data.user));
     window.location.href ='./messages.html';
   } catch (error) {
     console.log(error);
   }
         }
  //        function decodeToken(token) {
  //    const base64Url = token.split('.')[1];
  //    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //    const jsonPayload = decodeURIComponent(
  //      atob(base64)
  //        .split('')
  //        .map((char) => {
  //          return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
  //        })
  //        .join('')
  //    );
   
  //    return JSON.parse(jsonPayload);
  //  }
         //https://saraha-gilt.vercel.app/auth/signin
         const email = document.getElementById('email_field')
         const password =document.getElementById('password_field');
   
         async function signIn(event) {
       event.preventDefault(); // Prevent default form submission
   
   
       const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
       if (!passwordRegex.test(password.value)) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = 'كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم.'
           return;
       }
       try {
           const {data} = await axios.post('https://saraha-gilt.vercel.app/auth/signin', {
               email: email.value,
               password: password.value
           });
           console.log(data);
   if (data.message == "Done") {
    // const decodedPayload = decodeToken(data.token);
    // console.log(decodedPayload);
     getUserData(data.id)
    //const userData = encodeURIComponent(data.token);
     localStorage.setItem('token',JSON.stringify(data.token));

   }
   
       } catch (error) {
         console.log(error);
         if (error.response.data.message == "Password miss match" ) {
          alertMessage.classList.add('d-block');
          alertMessage.classList.remove('d-none');
          alertMessage.innerHTML = 'رقم سري خاطئ'
             
           }else if(error.response.data.message == "Validation error"){
            alertMessage.classList.add('d-block');
            alertMessage.classList.remove('d-none');
            alertMessage.innerHTML = 'اميل خاطئ'
           }else if(error.response.data.message == "Confirm your email first"){
            alertMessage.classList.add('d-block');
            alertMessage.classList.remove('d-none');
            alertMessage.innerHTML = 'تحقق من الاميل الخاص بك لتأكيد الحساب'
           }else if(error.response.data.message == "In-valid user"){
            alertMessage.classList.add('d-block');
            alertMessage.classList.remove('d-none');
            alertMessage.innerHTML = 'الايميل غير موجود'
           }
       }
   }
   
   // Add event listener to the sign-in form
   document.getElementById('signinForm').addEventListener('submit', signIn);