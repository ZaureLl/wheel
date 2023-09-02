console.log("before");

window.addEventListener('DOMContentLoaded', () => {
    console.log("after");
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    // Send GET request to the API
    fetch('http://api.tvoyafortuna.com/v1/prize/')
        .then(response => response.json())
        .then(data => {
            // Hide the loader
            loader.style.display = 'none';

            // Show the content
            content.style.display = 'block';

            // Display the number of objects in the array
            const prizes = data.length;
            content.innerText = `Quantity of prizes: ${prizes}`;

            // Display each object's name and quantity
            data.forEach(prize => {
                const row = document.createElement('div');
                row.innerText = `${prize.name} - ${prize.qty} шт`;
                content.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            loader.innerText = 'Error while loading prizes.';
        });
});

// Get references to the button and banner elements
const showBannerButton = document.getElementById('showBannerButton');
const closeBannerButton = document.getElementById('closeBannerButton');
const banner = document.getElementById('banner');
const overlay = document.getElementById('overlay');
const qtyOfTriesMessege = document.getElementById("qtyOfTriesMessege");

// Function to show the banner
function showBanner() {
    banner.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(() => {
        banner.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 10);
}

// Function to hide the banner
function hideBanner() {
    banner.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
        banner.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 300);
}

// Attach event listener to the "Show Banner" button
showBannerButton.addEventListener('click', showBanner);

// Attach event listener to the "Close" button in the banner
closeBannerButton.addEventListener('click', hideBanner);





// Store the number of tries initially
let tries = 0;
let currentPosition = 0; // Variable to store the current position of the image
let prevDegree = 0;


// Function to update the spin button state
function updateSpinButton() {
    const spinButton = document.getElementById("spinButton");
    if (tries > 0) {
        spinButton.disabled = false;
        spinButton.classList.remove("notActiveBtn");
        spinButton.classList.add("activeBtn")
        qtyOfTriesMessege.textContent = "You can speen the whell!"
    } else {
        spinButton.disabled = true;
        spinButton.classList.remove("activeBtn");
        spinButton.classList.add("notActiveBtn")
        qtyOfTriesMessege.textContent = "sorry, but you can't speen the weel"
    }
}

// Event listener for the verify button
document.getElementById("verifyButton").addEventListener("click", function () {
    const promocode = document.getElementById("promocodeInput").value;
    const url = "http://api.tvoyafortuna.com/v1/promocode/" + '?code=' + promocode;
    const message = document.getElementById("verifiedPromocodeText");

    // Make a GET request to the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle the response
            if (data.error) {
                message.textContent = "opps... something wrong! Try again";

            } else {
                const triesResponse = data.tries;
                tries = parseInt(triesResponse);
                message.textContent = "you can speen the wheel!";
                // Update the spin button
                updateSpinButton();
            }

        })
        .catch(error => {

            console.log("Error:", error);
        });
});



const closeBannerButton2 = document.getElementById('closeBannerButton2');
const bannerWithPrize = document.getElementById('bannerWithPrize');
const prizeBlockMessage = document.getElementById("prizeBlockMessage");

// Function to show the banner
function showBanner2(wonnedPrize) {
    prizeBlockMessage.textContent = "your prize - " + wonnedPrize;
    bannerWithPrize.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(() => {
        bannerWithPrize.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 10);
}

// Function to hide the banner
function hideBanner2() {
    bannerWithPrize.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
        bannerWithPrize.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 300);
}

// // Attach event listener to the "Show Banner" button
// showBannerButton.addEventListener('click', showBanner);

// Attach event listener to the "Close" button in the banner
closeBannerButton2.addEventListener('click', hideBanner2);


// Event listener for the spin button
document.getElementById("spinButton").addEventListener("click", function () {
    console.log("ff");
    const spinButton = document.getElementById("spinButton");
    if (!spinButton.disabled) {
        const promocode = document.getElementById("promocodeInput").value;
        const url = "http://api.tvoyafortuna.com/v1/winner_check/" + '?code=' + promocode;


        // Make a GET request to the API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Handle the response
                const id = data.id;
                const name = data.name;
                const qty = data.qty;

                // Determine the degree based on the name
                let degree = 40;
                let wonnedPrize = "test";
                // switch (name) {
                //     case "Видеокурс":
                //         degree = 36;
                //         wonnedPrize = "Видеокурс"
                //         break;
                //     case "Автомобиль":
                //         degree = 108;
                //         wonnedPrize = "Автомобиль"
                //         break;
                //     case "Брелок":
                //         degree = 180;
                //         wonnedPrize = "Брелок"
                //         break;
                //     case "Яйца Гордона":
                //         degree = 252;
                //         wonnedPrize = "Яйца Гордона"
                //         break;
                //     case "Палка":
                //         degree = 324;
                //         wonnedPrize = "Палка"
                //         break;
                //     default:
                //         degree = 0;
                //         wonnedPrize = "sorry, but we don't have a prize for you (:"
                // }

                // Calculate the target position
                const targetPosition = currentPosition + degree - prevDegree + 720;
                console.log(targetPosition);
                // Rotate the image
                rotateImage(targetPosition);

                // Update the current position
                currentPosition = targetPosition;
                prevDegree = degree;

                // Decrease the number of tries
                tries--;

                // Update the spin button
                updateSpinButton();
                setTimeout(() => {
                    showBanner2(wonnedPrize);
                }, 2500);


            })
            .catch(error => {
                console.log("Error:", error);
            });
    }
});

// Function to rotate the image
function rotateImage(targetPosition) {
    const img = document.getElementById("img");
    // const rotation = targetPosition % 360; // Normalize the target position to a value between 0 and 359

    img.style.transform = `rotate(${-targetPosition}deg)`;
}


