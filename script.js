const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote

function newQuote(){
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if auther field is blank and replace the text with 'Unknown'
    if(!quote.author){
        quoteAuthor.textContent = "Unknown";
    } else {
    quoteAuthor.textContent = quote.author;
    }
    // Check text length to determine the styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API

async function getQuotes (){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        // catch the error
    }

}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On load
getQuotes();