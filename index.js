const quoteElement = document.getElementById('quote');
const generateBtn = document.getElementById('generateBtn');
const likeBtn = document.getElementById('likeBtn');
const shareBtn = document.getElementById('shareBtn');
const likedQuotesList = document.getElementById('likedQuotesList');
const downloadBtn = document.getElementById('downloadBtn');

let likedQuotes = [];

// Event listener for generating a random quote
generateBtn.addEventListener('click', getRandomQuote);

// Event listener for liking a quote
likeBtn.addEventListener('click', likeQuote)

// Event listener for sharing a quote
shareBtn.addEventListener('click', shareQuote);

// Event listener for downloading a quote
downloadBtn.addEventListener('click', downloadQuote)


// Function to fetch a random quote from the API
function getRandomQuote() {
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty('content') && data.hasOwnProperty('author')) {
            quoteElement.innerHTML = `${data.content}<br>- ${data.author}`
   
        } 
    })
    .catch(error => {
       
    });
}

// Function to like a quote
function likeQuote() {
    const currentQuote = quoteElement.innerHTML;
    likedQuotes.push(currentQuote);
    alert('Quote liked!');
    displayLikedQuotes();
}

// Function to share a quote
function shareQuote() {
    const quoteToShare = quoteElement.textContent;
    const shareURL = `https://api.quotable.io/randome=${encodeURIComponent(quoteToShare)}`;
    window.open(shareURL, '_blank');
}

// Function to download a quote
function downloadQuote() {
    const quoteToDownload = quoteElement.textContent;
    const blob = new Blob([quoteToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quote.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
