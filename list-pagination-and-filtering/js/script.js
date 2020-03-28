/******************************************
List Filter and Pagination
******************************************/

const studentList = document.querySelectorAll('.student-item');
const studentsPerPage = 10;
const headerDiv = document.querySelector('.page-header');
let filterStudentsArray = [];

// Shows the number of students per page, hides the rest of them.
const showPage = (list, page ) => {
   //Defines startIndex and endIndex to define limit of students
   const startIndex = ( page * studentsPerPage ) - studentsPerPage;
   const endIndex = ( page * studentsPerPage );
   //Shows the list of students per page
   for( let i = 0 ; i < list.length ; i++){
      if( i >= startIndex && i < endIndex ){
         list[i].style.display = ''
      }
      else{
         list[i].style.display = 'none';
      }
   }
}

//Creates the pagination buttons and gives functionality in order to show certain students per page
const appendPageLinks = (list) => {
   
   const pages = (list.length / studentsPerPage) + 1;
   
   //Creates the pagination div and unorder list
   const pageDiv = document.querySelector('div.page');
   const paginationDiv = document.createElement('div');
   const paginationUl = document.createElement('ul');

   paginationDiv.className = "pagination";
   pageDiv.appendChild(paginationDiv);
   paginationDiv.appendChild(paginationUl);

   //Appends li, a and creates pagination 
   for(let i = 1 ; i < pages ; i++ ){
      const paginationList = document.createElement('li');
      const paginationNumbers = document.createElement('a');
      paginationNumbers.setAttribute('href','#');
      paginationNumbers.textContent = i;
      paginationList.appendChild(paginationNumbers);
      paginationUl.appendChild(paginationList);
   }

   const aLinks =  document.querySelectorAll('a');
   
   //Changes className of first pagination element
   aLinks[0].className = 'active';

   //Shows students per page and manipulates classes of pagination
   paginationUl.addEventListener('click', (e) => {
      for(let i = 0 ; i < aLinks.length ; i++){
         aLinks[i].className = '';
      }
      e.target.className = 'active';
      clickedListNumber = e.target.textContent;
      showPage(list, clickedListNumber);
   });
};

const search = () => {
   //Creates search bar and related elements
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const button = document.createElement('button');
   const studentNames = document.querySelectorAll('h3');
   const pageDiv = document.querySelector('.page');
   const errorMessage = document.createElement('h2');

   headerDiv.appendChild(searchDiv);
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(button);

   searchDiv.className = 'student-search';
   searchInput.placeholder = 'Search for students...';
   button.innerText = 'Search';
   errorMessage.innerHTML = 'No result';
   errorMessage.style.color = '#E36165';
   errorMessage.style.fontSize ='1.75em';

//Filters the students according to input value in the search bar
   const filter = () => {
      //Clears the array to have an correct result each time user searchs
      filterStudentsArray = [];

      //Iterates through the list of the students and filters
      for(let i = 0 ; i < studentList.length ; i++){
         if(studentNames[i].textContent.includes(searchInput.value.toLowerCase())){
            studentList[i].style.display = ''
            filterStudentsArray.push(studentList[i]);
         }
         else{
            studentList[i].style.display = 'none'
         }
      }

      //If there is no result, shows error message
      if(filterStudentsArray.length === 0){
         pageDiv.appendChild(errorMessage);
      }
      else{
         errorMessage.remove();
      }

      //Removes initial pagination and adds the new one according to search result
      const paginationDiv = document.querySelector('.pagination');
      pageDiv.removeChild(paginationDiv);
      appendPageLinks(filterStudentsArray);
      showPage(filterStudentsArray,1);

   }
   
   //Executes filter function when there is an input in the search bar
   searchInput.addEventListener('keyup', () =>{
      filter();
   })

   //Executes filter function when the button is clicked
   button.addEventListener('click', () => {
      filter();
   })
};


//Loads the webpage with the first page of the pagination.
showPage(studentList,1);

search(studentList);

appendPageLinks(studentList);

