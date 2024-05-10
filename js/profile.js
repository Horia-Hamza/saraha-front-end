
let userData = JSON.parse(localStorage.getItem("userData"))
const token = JSON.parse(localStorage.getItem("token"))
getUserData(userData._id)
const oldEmail = userData.email
const userName = document.getElementById('name')
const userImage = document.getElementById('userImage')
const user = document.getElementById('userName')
const email = document.getElementById('email')
const gender = document.getElementById('gender')

const oldPassword = document.getElementById('oldPassword')
const password = document.getElementById('password')
const cPassword = document.getElementById('cPassword')

const fileInput = document.getElementById('fileInput')

const succussMessage = document.getElementById('succussMessage')
const alertMessage = document.getElementById('alert')

const succussMessage1 = document.getElementById('succussMessage1')
const alertMessage1 = document.getElementById('alert1')

const succussMessage2 = document.getElementById('succussMessage2')
const alertMessage2 = document.getElementById('alert2')

const deleteBtn = document.getElementById('deleteBtn')
const deleteImage = document.getElementById('deleteImage')
if (userData.image == null) {
   userImage.innerHTML = `<img class="" src="images/main/avatar.png" alt="profileImage" />`
}else{
   deleteImage.innerHTML = ` <p>هل تريد مسح صورتك الشخصيه</p>
   <button onClick="deleteProfileImage()" type="button">مسح الصوره الشخصيه</button>
   `
   console.log(userData.image.secure_url);
   userImage.innerHTML = `<img class="" src="${userData.image.secure_url}" alt="profileImage" />`
}
// nav profile 
document.addEventListener('DOMContentLoaded', function() {
   const menuLinks = document.querySelectorAll('#menu li');
 
   // Add click event listener to each menu item
   menuLinks.forEach(link => {
     link.addEventListener('click', function() {
       const targetId = this.id.replace('Link', ''); // Extract target div ID
       const targetDiv = document.getElementById(targetId);
 
       // Remove 'active' class from all menu items
       menuLinks.forEach(link => {
         link.classList.remove('active');
       });
 
       // Add 'active' class to the clicked menu item
       this.classList.add('active');
 
       // Hide all divs and show the target div
       document.querySelectorAll('.form').forEach(div => {
         div.style.display = 'none';
       });
       targetDiv.style.display = 'block';
     });
   });
 });
 
 

// if (user&&email&&gender) {
   userName.innerHTML  = userData.userName
   user.value  = userData.userName
   email.value = userData.email;
   gender.value = userData.gender;
// }

async function updateUser(event){
   event.preventDefault(); // Prevent default form submission

   try {
      let userDetails
      if ( oldEmail === email.value ) {
        userDetails = {
            userName : user.value,
            gender : gender.value,
         }
      }else{
        userDetails = {
            userName : user.value,
            email : email.value,
            gender : gender.value,
         }
      }
      //console.log(userDetails);

      const { data } = await axios.put('https://saraha-gilt.vercel.app/user/', 
      userDetails,
      {
         headers: {
           Authorization: `HAMADA__${token}`,
         },
       }
      )
      console.log(data);
      if (data.message == 'Done') {
         if ( oldEmail != email.value ) {
            localStorage.removeItem('userData');
           window.location.href = './signin.html'
          }else{
             localStorage.setItem('userData',JSON.stringify(data.user));
              succussMessage.innerHTML = data.message
              succussMessage.classList.remove('d-none');
              succussMessage.classList.add('d-block');
              alertMessage.classList.add('d-none');
              succussMessage.innerHTML = data.message
          }
         }

   } catch (error) {
      console.log(error);
      if (error.response.data.message == 'Expire token') {
         alertMessage.innerHTML = 'please sign in first'
         alertMessage.classList.remove('d-none');
      alertMessage.classList.add('d-block');
      succussMessage.classList.add('d-none');     
    }
      if (error.response.data.message == "Validation error") {
         alertMessage.innerHTML = 'بعض الحقول مفقوده'
         alertMessage.classList.remove('d-none');
      alertMessage.classList.add('d-block');
      succussMessage.classList.add('d-none');
      }
   }
}

document.getElementById('updateForm').addEventListener('submit', updateUser);

async function updatePassword(event){
   event.preventDefault(); // Prevent default form submission

   try {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

       if (!passwordRegex.test(oldPassword.value)||
       !passwordRegex.test(password.value)||
       !passwordRegex.test(cPassword.value)) {

           alertMessage1.innerHTML = 'كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم.'
           alertMessage1.classList.remove('d-none');
        alertMessage1.classList.add('d-block');
        succussMessage1.classList.add('d-none');

         }
           if (password.value != cPassword.value) {
   alertMessage1.innerHTML = 'كلمه المرور غير متطابقه'
   alertMessage1.classList.remove('d-none');
alertMessage1.classList.add('d-block');
succussMessage1.classList.add('d-none');
}
      userDetails = {
         oldPassword : oldPassword.value,
         password : password.value,
         cPassword : cPassword.value,
      }
      //console.log(userDetails);

      const { data } = await axios.patch('https://saraha-gilt.vercel.app/user/updatePassword', 
      userDetails,
      {
         headers: {
           Authorization: `HAMADA__${token}`,
         },
       }
      )
      console.log('data',data);
      if (data.message == 'Done') {
         succussMessage1.classList.remove('d-none');
         succussMessage1.classList.add('d-block');
         alertMessage1.classList.add('d-none');
         succussMessage1.innerHTML = 'تم تغير الرقم السري بنجاح'
      }

   } catch (error) {
      console.log(error);

      if (error.response.data.message ==  "Password miss match") {
         alertMessage1.innerHTML = 'رقم سري خاطئ'
         alertMessage1.classList.remove('d-none');
      alertMessage1.classList.add('d-block');
      succussMessage1.classList.add('d-none');
      }
      
   }
}

document.getElementById('updatePassword').addEventListener('submit', updatePassword);


async function uploadImage(event) {
   event.preventDefault(); // Prevent default form submission
   try {
     const fileInput = document.getElementById('fileInput');
     let file;
     const formData = new FormData(); // Define formData here
 
     if (fileInput.files.length > 0) {
       file = fileInput.files[0];
       formData.append('image', file); // Append file to formData
     }
 
     console.log('file', file);
     const { data } = await axios.patch(
       'https://saraha-gilt.vercel.app/user/profilPic',
       formData, // Use formData directly here
       {
         headers: {
           Authorization: `HAMADA__${token}`,
           'Content-Type': 'multipart/form-data', // Specify content type for FormData
         },
       }
     );
     console.log(data);
     if (data.message == "Done") {
    await getUserData(userData._id)

     }
   } catch (error) {
     console.log(error);
   }
 }
 
document.getElementById('changeImage').addEventListener('submit', uploadImage);


async function deleteUser(event){
   event.preventDefault(); // Prevent default form submission

   try {
      const { data } = await axios.patch('https://saraha-gilt.vercel.app/user/softdelete',
      {},
      {
         headers: {
           Authorization: `HAMADA__${token}`,
         },
       }
   )
   console.log(data);
   getUserData(userData._id)
      
   } catch (error) {
      console.log(error);
   }
   
}
document.getElementById('deleteBtn').addEventListener('submit', deleteUser);

async function getUserData(id){
   try {
     const {data} = await axios.get(`https://saraha-gilt.vercel.app/user/${id}`);
     //console.log(data);
     console.log(data.user);
     if (data.user.stopped == true) {
      deleteBtn.innerHTML = `<p>هل تريد تشغيل الحساب؟</p>
      <button class="deleteBtn" type="submit">تشغيل الحساب</button>`
     }else{
      deleteBtn.innerHTML = `<p>هل تريد ايقاف الحساب؟</p>
      <button class="deleteBtn " type="submit">ايقاف الحساب</button>`
     }
     if (data.user.image) {  
        deleteImage.innerHTML = ` <p>هل تريد مسح صورتك الشخصيه</p>
        <button onClick="deleteProfileImage()" type="button">مسح الصوره الشخصيه</button> `

        userImage.innerHTML = `<img class="" src="${data.user.image.secure_url}" alt="profileImage" />`;
     }
     else{
      userImage.innerHTML = `<img class="" src="images/main/avatar.png" alt="profileImage" />`;
      deleteImage.innerHTML = '';
     }
     localStorage.setItem('userData',JSON.stringify(data.user));
   } catch (error) {
     console.log(error);
   }
         }

      async function deleteProfileImage(){
            try {
               console.log("del");
               const {data} = await axios.patch(`https://saraha-gilt.vercel.app/user/deleteProfilePic`,
               {},
               {
                  headers: {
                    Authorization: `HAMADA__${token}`,
                  },
                }
            );
            console.log(data);
            if (data.message == "Done") {
               
              await getUserData(userData._id)
              if (data.image == null) {
               userImage.innerHTML = `<img class="" src="images/main/avatar.png" alt="profileImage" />`
               deleteImage.innerHTML =''
            }else{
               deleteImage.innerHTML = ` <p>هل تريد مسح صورتك الشخصيه</p>
               <button onClick="deleteProfileImage()" type="button">مسح الصوره الشخصيه</button>
               `;
               console.log(userData.image.secure_url);
               userImage.innerHTML = `<img class="" src="${data.image.secure_url}" alt="profileImage" />`;
            }
            
            }
             } catch (error) {
               console.log(error);
             }
         }