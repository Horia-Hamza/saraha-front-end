
const userData = JSON.parse(localStorage.getItem("userData"))
const token = JSON.parse(localStorage.getItem("token"))
console.log(userData);

const userName = document.getElementById('name')
const user = document.getElementById('userName')
const email = document.getElementById('email')
const gender = document.getElementById('gender')
const details = document.getElementById('details')
const alertMessage = document.getElementById('alert')
// if (user&&email&&gender&&details) {
   userName.innerHTML  = userData.userName
   user.value  = userData.userName
   email.value = userData.email;
   gender.value = userData.gender;
   details.value = userData.details;
   
// }

async function updateUser(event){
   event.preventDefault(); // Prevent default form submission

   try {
      const userDetails = {
         userName : user.value,
         email : email.value,
         gender : gender.value,
      }
      console.log(userDetails);
      const { data } = await axios.put('https://saraha-gilt.vercel.app/user/', 
      userDetails,
      {
         headers: {
           Authorization: `HAMADA__${token}`,
         },
       }
      )
      console.log(data);
      
      succussMessage.innerHTML = data.message
      succussMessage.classList.remove('d-none');
      succussMessage.classList.add('d-block');
      alertMessage.classList.add('d-none');

   } catch (error) {
      console.log(error);
      if (error.response.data.message == 'Expire token') {
         window.location.href ='./signup.html';
      }
      alertMessage.innerHTML = error.response.data.message
      alertMessage.classList.remove('d-none');
      alertMessage.classList.add('d-block');
      succussMessage.classList.add('d-none');

   }
}

document.getElementById('updateForm').addEventListener('submit', updateUser);

