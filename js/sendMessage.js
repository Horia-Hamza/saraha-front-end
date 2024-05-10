const senderName = document.getElementById('sender')
const sender = document.getElementById('senderName')
const senderImage = document.getElementById('senderImage')
const message = document.getElementById('message')

const succussMessage = document.getElementById('succussMessage')
const alertMessage = document.getElementById('alert')
// Get the URL parameters
const params = new URLSearchParams(window.location.search);

// Get the user ID from the "userId" parameter
const userId = params.get('userId');

// Log the user ID to the console
console.log(userId);

async function getUserData(userId){
   try {
     const {data} = await axios.get(`https://saraha-gilt.vercel.app/user/${userId}`);
     console.log(data);
     if (data) {
      senderName.innerHTML = data.user.userName
      sender.innerHTML = data.user.userName
      if (data.image.image == null) {
        userImage.innerHTML = `<img class="" src="images/main/avatar.png" alt="profileImage" />`
     }else{
        userImage.innerHTML = `<img class="" src="${data.user.image.secure_url}" alt="profileImage" />`
     }      console.log(data.user.userName);
     }
   } catch (error) {
     console.log(error);
   }
         }

         getUserData(userId)

         async function sendMessage(event){
            event.preventDefault()
            try {
               console.log(message.value);
               if(message.value.length >200){
                  alertMessage.innerHTML ='<div class="alert alert-danger">لا يمكن ارسال اكثر من 200 حرف</div>'

               }else if(message.value.length == 0){
                 alertMessage.innerHTML = '<div class="alert alert-danger">لا يمكن ارسال رساله فارغه </div>'
              }else if(message.value.length < 5){
                alertMessage.innerHTML = '<div class="alert alert-danger">لا يمكن ارسال اقل من 5 احرف  </div>'

               }else{
                 const {data} = await axios.post(`https://saraha-gilt.vercel.app/user/${userId}/message/sendMessage`,
               {text:message.value}
               );
                 console.log(data);
                 succussMessage.innerHTML =' <div  class="alert alert-success">تم الارسال بنجاح</div>' ;
                 alertMessage.innerHTML = ''
                 message.value = ''

               }
            } catch (error) {
              console.log(error);
              if (error.response.data.message == "In-valid receiver") {
                alertMessage.innerHTML ='<div class="alert alert-danger">هذا المستخدم غير متاح او هذا الحساب متوقف</div>'

              }

            }
      }

      document.getElementById('sendMessage').addEventListener('submit', sendMessage);
