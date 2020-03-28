let game;
const startButton = document.querySelector('#btn__reset');
const screenKeyboard = document.querySelectorAll('.key');

//Starts the game
startButton.addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

//Handles interaction for mouse 
screenKeyboard.forEach( keyboardButton => {
    keyboardButton.addEventListener('click', (e) => {
        game.handleInteraction(e.target);
    });
});

//Handles interaction for keyboard
document.addEventListener("keydown", event => {
    if (event.keyCode > 64 && event.keyCode < 91) {
        for (let i = 0; i < screenKeyboard.length; i++) {
            if (screenKeyboard[i].textContent === event.key) {
                console.log(event.key)
                game.handleInteraction(screenKeyboard[i]);
                
            }
        }
    }
});


