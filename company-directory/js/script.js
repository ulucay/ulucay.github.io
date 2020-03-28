const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.querySelector('#gallery');
const modalContainer = document.querySelector('.modal-container');
const search = document.querySelector('#search-input');
let peopleArray;

//Fetchs data from API
fetch(url)
    .then(res => res.json())
    .then(data =>{
        peopleArray = data.results;
        generatePeople(peopleArray);
        generateModal(peopleArray);
    })
    .catch(error => console.log('Looks like there was a problem!', error))


//Generates people and inserts into HTML
function generatePeople(data){
        //Creates card template according to fetched data, and stores inside a variable
        const people = data.map( (person, index) => `
        <div class="card" id="${index}">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.country}</p>
            </div>
        </div>
        `).join('');

        gallery.innerHTML = people;

        //Stores card elements from HTML
        let cards = document.querySelectorAll('.card');
        
        //If any cards clicked, then show the corresponding modal on the screen
        cards.forEach( card => card.addEventListener('click', e => {
            const cardId = e.currentTarget.id; // Get clicked card item's id
            popUpModal(cardId);
        }));
}

//Generates modals and insert into HTML
function generateModal(data){
    //Creates modal template according to fetched data, and stores inside a variable
    const modal = data.map( (person, index) => `
        <div class="modal" id="${index}">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${person.phone}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${new Date(person.registered.date).toLocaleDateString()}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `).join("")

    modalContainer.innerHTML = modal;
}

//Pops up clicked card as a modal
function popUpModal(cardId){
    let modals = document.querySelectorAll('.modal'); //Stores all modals
    let closeButtons = document.querySelectorAll('#modal-close-btn'); //Stores all close buttons
    let nextButtons = document.querySelectorAll('#modal-next');
    let prevButtons = document.querySelectorAll('#modal-prev');

    //If card is clicked, pop up the correct model by checking the id
    modals.forEach((modal) => {
        if(modal.id == cardId){
            modalContainer.style.display = 'block';
            modal.style.display = 'block';
        }else{
            modal.style.display = 'none';
        }
    });

    //Adds features to buttons when user clicks, it modifys css of modal-container and modals
    closeButtons.forEach((button) => button.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        modals.forEach((modal) =>{
            modal.style.display = 'block'
        })
    }));

    //Toggles to next modal after button is clicked if there isn't any sibling then goes back to main page
    nextButtons.forEach((button) => button.addEventListener('click', (e) => {
        currentModal = e.currentTarget.parentNode.parentNode;
        nextModal = e.currentTarget.parentNode.parentNode.nextElementSibling;

        modals.forEach((modal) => {
            if(nextModal == modal){
                nextModal.style.display = 'block';
            }
            else{
                modal.style.display = 'none';
                if(!nextModal){
                    modalContainer.style.display = 'none';
                }
            }
        });
    }));

    //Toggles to previous modal after button is clicked, if there isn't any sibling then goes back to main page
    prevButtons.forEach((button) => button.addEventListener('click', (e) => {
        currentModal = e.currentTarget.parentNode.parentNode;
        prevModal= e.currentTarget.parentNode.parentNode.previousElementSibling;

        modals.forEach((modal) => {
            if(prevModal == modal){
                prevModal.style.display = 'block';
            }
            else{
                modal.style.display = 'none';
                if(!prevModal){
                    modalContainer.style.display = 'none';
                }
            }
        });
    }));   
}

//Search functionality for directory
search.addEventListener("keyup", (e) => {
    e.preventDefault();
    let names = document.querySelectorAll('.card-info-container #name');
    let userInput = search.value;
    names.forEach( name => {
        if(name.textContent.toLowerCase().includes(userInput.toLowerCase())){
            console.log(name.parentNode.parentNode);
            name.parentNode.parentNode.style.display = 'flex';
        }
        else{
            name.parentNode.parentNode.style.display = 'none';
        }
    })
})






