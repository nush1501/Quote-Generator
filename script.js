// Define an array of quotes (you can fetch quotes from an API later)
const quotes = [
    "Quote 1",
    "Quote 2",
    "Quote 3",
    // Add more quotes here
];

// Define an array of background images (you can fetch images from an API later)
const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    // Add more image URLs here
];

// Get DOM elements
const quoteElement = document.getElementById("quote");
const generateButton = document.getElementById("generate");
const downloadLink = document.getElementById("download");

// Function to generate a random quote
function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteElement.textContent = randomQuote;
}

// Function to generate a random image URL
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

// Event listener for the "Generate Quote" button
generateButton.addEventListener("click", () => {
    generateRandomQuote();
    const imageURL = getRandomImage();

    // You can use the imageURL to set the background of your quote container
    // For now, let's assume it's an Unsplash image URL
    // Replace 'your-access-key' with your actual Unsplash API access key
    // You can get an access key by signing up at https://unsplash.com/developers
    const unsplashAPI = `https://api.unsplash.com/photos/random?client_id=your-access-key`;

    fetch(unsplashAPI)
        .then((response) => response.json())
        .then((data) => {
            const backgroundImage = `url(${data.urls.regular})`;
            quoteElement.style.backgroundImage = backgroundImage;

            // Show the download link
            downloadLink.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching image:", error);
        });
});

// Event listener for the "Download Quote Image" link
downloadLink.addEventListener("click", () => {
    // Create a canvas to render the quote and background image
    const canvas = document.createElement("canvas");
    canvas.width = quoteElement.clientWidth;
    canvas.height = quoteElement.clientHeight;

    const context = canvas.getContext("2d");

    // Draw the background image on the canvas
    const img = new Image();
    img.src = quoteElement.style.backgroundImage.match(/url\("(.+)"\)/)[1];
    img.crossOrigin = "anonymous"; // Enable CORS for the image
    img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw the quote text on top of the image
        context.fillStyle = "#fff"; // Text color
        context.font = "24px Arial"; // Text font
        context.fillText(quoteElement.textContent, 20, 40); // Adjust text position

        // Convert the canvas to a data URL (PNG format)
        const dataURL = canvas.toDataURL("image/png");

        // Create a download link for the image
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "quote.png";

        // Trigger a click event on the download link to start the download
        downloadLink.click();
    };
});
