const copyLinkBtn = document.querySelector(".copy-link__btn");
const copyLinkText = document.querySelector(".copy-link__text");

async function copyLink() {
    const link = copyLinkText.innerHTML;
    console.log(link);
    await navigator.clipboard.writeText(link);
}

copyLinkBtn.addEventListener("click", copyLink);
