// a function should be for one function (single task)
//   1. function to addBookMarks ()
//   2. function to checkDuplicate ()  returns (true or false) 
//   3. function to validateURL ()     returns (true or false) 
//   4. function to displayData ()
//   5. function to clearForm ()  clear the user inputs values
//   6. function to deleteItem () 
//   7. function showDialog()  controls show and close of the dialog

// DOM Elements
var dialog = document.getElementById("userDialog");
var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');

// Variables
var bookMarksList;
var cartona;
var urlRegex;
var isUrlvalid;


// Retrieve data from localStrorage
if ( localStorage.getItem('userBookmarks') ) { // Returns a string if the key exists, which is a truthy value.
  bookMarksList = JSON.parse( localStorage.getItem('userBookmarks') );
  displayData();
}
else {
  // Initialize as an empty array if no data exists
  bookMarksList = [];
}



function addBookMark() {
  if (checkDuplicate(siteNameInput.value, siteUrlInput.value)) {
    if (validateURL(siteUrlInput.value)) {
      
      bookMark = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
      };

       // Add bookmark to the list and save to localStorage
      bookMarksList.push(bookMark);
      //console.log(bookMarksList);
      localStorage.setItem('userBookmarks', JSON.stringify(bookMarksList));

      // Refresh the UI and clear the form
      displayData();
      clearForm();
    } 
    else {
      // Show dialog if URL is invalid
      showDialog();
    }
  }

  else {
    // Show dialog if Name OR URL already exists
    showDialog();
  }
}



function checkDuplicate(matchSiteName, matchSiteUrl) {
  for (var i = 0; i < bookMarksList.length; i++) {
    if (matchSiteName === bookMarksList[i].siteName || matchSiteUrl === bookMarksList[i].siteUrl) {
    
      return false; //duplicates found
    }
  }
  return true; // No duplicates found
}


function validateURL(siteUrl) {
  
  urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  isUrlvalid = urlRegex.test(siteUrl);  // The result (true or false)
  //console.log(isUrlvalid);
  return isUrlvalid;
}


function displayData () {
  
  cartona = '' ;
  for ( i = 0; i < bookMarksList.length; i++ ) {
    
    cartona += `
      <tr>
        <td>${i+1}</td>
        <td>${bookMarksList[i].siteName}</td>
        <td>
          <a class="visit-btn"  href="${bookMarksList[i].siteUrl}" target="_blank">
            <i class="fa-solid fa-eye"></i>
            visit
          </a>
        </td>
        <td>
          <button onclick="deleteItem(${i});" class="delete-btn"> 
            <i class="fa-solid fa-trash"></i>
            Delete  
          </button>
        </td>
      </tr>`
  }
  document.getElementById('logTable').innerHTML = cartona;
}


function clearForm () {
  siteNameInput.value = null;
  siteUrlInput.value  = null;
}


function deleteItem (index) {
  bookMarksList.splice( index, 1);
  //console.log(bookMarksList);
  localStorage.setItem( 'userBookmarks', JSON.stringify(bookMarksList) );
  displayData();
}


function showDialog() {
  dialog.showModal();
  dialog.addEventListener('click', () => {
    dialog.close();
  });
}


