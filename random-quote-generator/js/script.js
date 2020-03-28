/******************************************
A Random Quote Generator
******************************************/

//Creates array of objects for the quotes
const quotes = [
  {
    quote:'Everything we see in the world is the creative work of women.',
    source:'Ataturk',
    citation:'The Macmillan Dictionary of Political Quotations',
    year:'1934',
    categorization:'woman'
  },
  {
    quote:'Believe you can and you\'re halfway there.',
    source:'Theodore Roosevelt',
    categorization:'courage, inspirational'
  },
  {
    quote:'Wondering is the seed of genius.',
    source:'William Mocca',
    categorization:'motivational'
  },
  {
    quote:'The best ideas come as jokes. Make your thinking as funny as possible.',
    source:'David Ogilvy',
    categorization:'entrepreneurship'
  },
  {
    quote:'I never let my schooling get in the way of my education.',
    source:'Mark Twain',
    categorization:'educational'
  },
  {
    quote:'Quality is much better than quantity. One home run is much better than two doubles.',
    source:'Steve Jobs',
    citation:'Bloomberg BusinessWeek',
    year:'2006',
    categorization:'business'
  },
  {
    quote:'Life is what happens to you while you’re busy making other plans.',
    source:'John Lennon',
    categorization:'inspirational'
  },
  {
    quote:'The only person you are destined to become is the person you decide to be.',
    source:'Ralph Waldo Emerson',
    categorization:'inspirational'
  },
]

//Creates array of colors
const colors = ['#24ebfc','#d15c87','#544a7b','#cd9588','#1b6e62','#a9c1cd', '#48e59a','#c591eb','#bfbd02','#0dcfcf'];

//Get a random quote from array
const getRandomQuote = () => {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  return quotes[randomNumber];
}

//Get a random color for background and button
const changeColor = () => {
  const randomColor = Math.floor(Math.random() * colors.length);
  const button = document.querySelector('#loadQuote');
  button.style.backgroundColor = colors[randomColor];
  document.body.style.backgroundColor = colors[randomColor]; 
}

//Print the quote into the div with the id of quote-box
const printQuote = () => {
  changeColor();

  const randomQuote = getRandomQuote();

  const quotebox = document.querySelector('#quote-box');
  let displayQuote = '';

  displayQuote += `<p class="quote"> ${randomQuote.quote} </p>`;
  displayQuote += `<p class="source"> ${randomQuote.source}`;

  randomQuote.citation ? displayQuote += `<span class="citation"> ${randomQuote.citation} </span>`: null;

  randomQuote.year ? displayQuote += `<span class="year"> ${randomQuote.year} </span>`: null;

  displayQuote += `<br><br><span class="tag"><strong>Tag: </strong>${randomQuote.categorization}</span>`
  displayQuote += `</p>`;
  
  quotebox.innerHTML = displayQuote;
  
  resetTimer();
}

// Set the timer to change quote every 10 seconds
let timer = setInterval(printQuote, 10000);

// Reset the timer when the printQuote function is called
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(printQuote, 10000);
}

//Starts the random-quote-generator when the page loads
printQuote();

//Starts the event listener to get new quote when the button is clicked
document.getElementById('loadQuote').addEventListener("click", printQuote, false);



