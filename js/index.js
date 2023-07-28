// Function to generate a random 4-digit number between 0000 and 9999
function generateRandom4DigitNumber() {
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Function to generate a random lowercase letter
function generateRandomLetter() {
    const lowercaseLetters = 'QWERTYUIOPASDFGHJKLZXCVBNMabcdefghijklmnopqrstuvwxyz';
    return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
}

// Function to check if the URL is valid
async function isURLValid(url) {
    try {
        const response = await fetch(url, {
            mode: 'no-cors'
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

function assembleURL() {
    const random_4_digit_number = generateRandom4DigitNumber();
    const random_lowercase_letter = generateRandomLetter() + generateRandomLetter();
    return "https://prnt.sc/" + random_lowercase_letter + random_4_digit_number;
}

// Immediately invoked async function
(async () => {
    // Try up to 10 times to find a valid URL
    let attempts = 0;
    let foundValidURL = false;

    while (attempts < 10 && !foundValidURL) {
        const url = assembleURL();
        attempts++;

        // Check if the URL is valid before opening it
        const isValid = await isURLValid(url);
        if (isValid) {
            foundValidURL = true;
            // Open the URL in the same window
            window.open(url, '_self');
        } else {
            console.log(`Attempt ${attempts}: Invalid URL - ${url}`);
        }
    }

    // If after 10 tries, no valid URL is found
    if (!foundValidURL) {
        console.log("Exceeded 10 attempts. No valid URL found.");
    }
})();