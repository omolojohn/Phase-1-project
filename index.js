const quoteElement = document.getElementById('quote');
const generateBtn = document.getElementById('generateBtn');
const likeBtn = document.getElementById('likeBtn');
const likedQuotesList = document.getElementById('likedQuotesList');

let likedQuotes = [];

// Event listener for generating a random quote
generateBtn.addEventListener('click', getRandomQuote);

// Event listener for liking a quote
likeBtn.addEventListener('click', likeQuote)

// Function to fetch a random quote from the API
function getRandomQuote() {
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty('content') && data.hasOwnProperty('author')) {
            quoteElement.innerHTML = `${data.content}<br>- ${data.author}`;


            
        } else {
            quoteElement.innerHTML = "Failed to fetch a random quote. Please try again later.";
        }
    })
    .catch(error => {
        //console.error('Error fetching random quote:', error);
        quoteElement.innerHTML = "Failed to fetch a random quote. Please try again later.";
    });
}

// Function to like a quote
function likeQuote() {
    const currentQuote = quoteElement.innerHTML;
    likedQuotes.push(currentQuote);
    alert('Quote liked!');
    displayLikedQuotes();
}

// Function to display liked quotes
function displayLikedQuotes() {
    likedQuotesList.innerHTML = '';
    likedQuotes.forEach(quote => {
        const li = document.createElement('li');
        li.textContent = quote;
        likedQuotesList.appendChild(li);
    });
}
