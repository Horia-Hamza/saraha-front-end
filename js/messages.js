const userData = JSON.parse(localStorage.getItem("userData"))
const token = JSON.parse(localStorage.getItem("token"))

const copyLinkBtn = document.querySelector(".copy-link__btn");
const copyLinkText = document.querySelector(".copy-link__text");
const link = document.getElementById("link");
const userName = document.getElementById('name')
userName.innerHTML  = userData.userName


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

async function getReceivedMessages (){
  const { data } = await axios.get('/message/receivedMessages',{
    headers: {
      Authorization: `HAMADA__${token}`,
    }
  })
  console.log(data);
}
//getReceivedMessages ()