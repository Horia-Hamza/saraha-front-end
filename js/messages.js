const userData = JSON.parse(localStorage.getItem("userData"))
const token = JSON.parse(localStorage.getItem("token"))
getUserData(userData._id)
const userImage = document.getElementById('userImage')
const copyLinkBtn = document.querySelector(".copy-link__btn");
const copyLinkText = document.querySelector(".copy-link__text");
const link = document.getElementById("link");
const userName = document.getElementById('name')
const messagesContainer = document.getElementById('messages-container')
const favMessagesContainer = document.getElementById('favMessages-container')
const noMessages = document.getElementById('noMessages')
const noFavoriteMessages = document.getElementById('noFavoriteMessages')
const counter = document.getElementById('counter')
const favCounter = document.getElementById('favCounter')
const faMessage = document.getElementById('fa-message')
const faStar = document.getElementById('fa-star')
const receivedMessages = document.getElementById('receivedMessages')
const favMessages = document.getElementById('favMessages')
if (userData.image == null) {
  userImage.innerHTML = `<img class="" src="images/main/avatar.png" alt="profileImage" />`
}else{
  console.log(userData.image.secure_url);
  userImage.innerHTML = `<img class="" src="${userData.image.secure_url}" alt="profileImage" />`
}
let favoriteMessages = []
userName.innerHTML  = userData.userName

favoriteMessages = userData.wishList
console.log('favoriteMessages',favoriteMessages);
if (favoriteMessages.length>0) {
  console.log('dfdfddff');
  noFavoriteMessages.classList.add('d-none')
  noFavoriteMessages.classList.remove('d-block')
  noMessages.classList.add('d-none')
  noMessages.classList.remove('d-block')
  favMessagesContainer.classList.add('d-block')
  favMessagesContainer.classList.remove('d-none')
  favCounter.innerHTML = `<p>الرسائل : ${favoriteMessages.length}</p>`
  for (let i = 0 ; i < favoriteMessages.length; i++) {
    favMessagesContainer.innerHTML += `
    <div class="message__card_container">
    <div class="image w-50">
      <img src="images/main/s-48.png" alt="" />
    </div>
    <div class="message overflow-hidden overflow-auto">
      <div class="logo-name">
      </div>
      <hr />
      <p class="text-message ">${favoriteMessages[i].text}</p>
      <hr />
    </div>
  </div>
    `
  }
}else{
  noFavoriteMessages.classList.remove('d-none')
  noFavoriteMessages.classList.add('d-block')
}

async function getLink (){
  const { data } = await axios.get('https://saraha-gilt.vercel.app/user/profileLink',{
    headers: {
      Authorization: `HAMADA__${token}`,
    }
  })
  //console.log(data);
  link.innerHTML = data.link
}
getLink ()

async function copyLink() {
  const link = copyLinkText.innerHTML;
  console.log(link);
  await navigator.clipboard.writeText(link);
 // copyLinkBtn.classList.add('bg-primary');
}

copyLinkBtn.addEventListener("click", copyLink);

faMessage.addEventListener("click",  function(){
  faMessage.classList.add('active')
  faStar.classList.remove('active')
  receivedMessages.classList.add('d-block')
  receivedMessages.classList.remove('d-none')
  favMessages.classList.add('d-none')
  favMessages.classList.remove('d-block')
});
faStar.addEventListener("click",  function(){
  faStar.classList.add('active')
  faMessage.classList.remove('active')
  favMessages.classList.add('d-block')
  favMessages.classList.remove('d-none')
  receivedMessages.classList.add('d-none')
  receivedMessages.classList.remove('d-block')
});

// nav profile 
// document.addEventListener('DOMContentLoaded', function() {
//   const menuLinks = document.querySelectorAll('#menu li');

//   // Add click event listener to each menu item
//   menuLinks.forEach(link => {
//     link.addEventListener('click', function() {
//       // const targetId = this.id.replace('Link', ''); // Extract target div ID
//       // const targetDiv = document.getElementById(targetId);

//       // Remove 'active' class from all menu items
//       menuLinks.forEach(link => {
//         link.classList.remove('active');
//       });

//       // Add 'active' class to the clicked menu item
//       this.classList.add('active');

//       // Hide all divs and show the target div
//       // document.querySelectorAll('.form').forEach(div => {
//       //   div.style.display = 'none';
//       // });
//       // targetDiv.style.display = 'block';
//     });
//   });
// });


async function getReceivedMessages (){
  try {
  let messages = []
    const { data } = await axios.get('https://saraha-gilt.vercel.app/message/receivedMessages',
    {
      headers: {
        Authorization: `HAMADA__${token}`,
      }
    })
    console.log(data);
if (data.messages.length>0) {
  noMessages.classList.add('d-none')
  noMessages.classList.remove('d-block')
  messagesContainer.classList.add('d-block')
  messagesContainer.classList.remove('d-none')
  messages = data.messages
  console.log('messages',messages);

counter.innerHTML = `<p>الرسائل : ${messages.length}</p>`
  for (let i = 0 ; i < messages.length; i++) {
    messagesContainer.innerHTML += `
    <div class="message__card_container">
    <div class="image w-50">
      <img src="images/main/s-48.png" alt="" />
    </div>
    <div class="message overflow-hidden overflow-auto">
      <div class="logo-name">
        <i onClick ="toggleFavorite('${messages[i]._id}',this)" class="fa-regular fa-star"></i>
      </div>
      <hr />
      <p class="text-message ">${messages[i].text}</p>
      <hr />
      <button onClick = "deleteMessage('${messages[i]._id}')">حذف</button>
    </div>
  </div>
    `
  }
}else{
  noMessages.classList.remove('d-none')
  noMessages.classList.add('d-block')
  messagesContainer.classList.remove('d-block')
  messagesContainer.classList.add('d-none')
}
  } catch (error) {
    console.log(error);
  }
}
getReceivedMessages ()

async function addToFavorite(id){
console.log('getMessageId',id)
try {
  const { data } = await axios.patch(`https://saraha-gilt.vercel.app/message/${id}/wishList/add`,
  {},
  {
    headers: {
      Authorization: `HAMADA__${token}`,
    }
  })
  console.log(data)
  if (data.message == 'Done') {
    getUserData(userData._id)
  }
} catch (error) {
  console.log(error);
}
}
async function removeFromFavorite(id){
  console.log('removeFromFavorite',id)
  try {
    const { data } = await axios.patch(`https://saraha-gilt.vercel.app/message/${id}/wishList/remove`,
    {},
    {
      headers: {
        Authorization: `HAMADA__${token}`,
      }
    })
    console.log(data)
    if (data.message == 'Done') {
      getUserData(userData._id)
    }
  } catch (error) {
    console.log(error);
  }
  }
async function getUserData(id){
  try {
    const {data} = await axios.get(`https://saraha-gilt.vercel.app/user/${id}`);
    //console.log(data);
    console.log(data.user);
    localStorage.setItem('userData',JSON.stringify(data.user));
  } catch (error) {
    console.log(error);
  }
        }

  async  function toggleFavorite(id,e) {
    if (e.classList != "fa-solid fa-star") {
      e.classList = "fa-solid fa-star";
        addToFavorite(id)
  }
  else {
     e.classList = "fa-regular fa-star" 
       removeFromFavorite(id)
    }   
    } 
    
    async function deleteMessage(id){
      try {
        const { data } = await axios.delete(`https://saraha-gilt.vercel.app/message/${id}`,
       
        {
          headers: {
            Authorization: `HAMADA__${token}`,
          }
        })
        console.log(data)
        // if (data.message == 'Done') {
        // }
      } catch (error) {
        console.log(error);
      }
      }
     // document.getElementById('deleteMessage').addEventListener('submit', deleteMessage)