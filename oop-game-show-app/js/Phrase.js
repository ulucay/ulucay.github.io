class Phrase{
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay(){
        const letters = [...this.phrase];
        const phraseList = document.querySelector('#phrase ul');
        
        letters.forEach(letter => {
            if(letter == ' '){
                phraseList.innerHTML += `<li class="space"></li>`;
            }
            else{
                phraseList.innerHTML += `<li class="hide letter ${letter}">${letter}</li>`;
            }
        });
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(userLetter){
        for(let i = 0 ; i < this.phrase.length ; i++){
            if(this.phrase[i] == userLetter){
                return true;
            }
            else{
                return false
            }
        }
    }

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(userLetter){
        const listElements = document.querySelectorAll('#phrase ul li');
        for(let i = 0 ; i < this.phrase.length ; i++){
            if(this.phrase[i] == userLetter){
                listElements[i].classList.remove('hide');
                listElements[i].classList.add('show');
            }
        }
    }
    
}