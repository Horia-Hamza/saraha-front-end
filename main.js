// Function to fetch and insert the navbar into the page
async function includeNavbar() {
   try {
     const response = await fetch('navbar.html');
     const navbarHtml = await response.text();
     document.querySelector('body').insertAdjacentHTML('afterbegin', navbarHtml);
   } catch (error) {
     console.error('Error loading navbar:', error);
   }
 }
 
 // Call the includeNavbar function to load the navbar
 includeNavbar();