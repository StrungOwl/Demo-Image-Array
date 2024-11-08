let imgArray = []; // Array to hold the images
const imgCount = 3; // Number of images
let currentImg = 0; // Index of the current image

let playAnim = false; // Flag to control animation
let forward = true; // Direction of animation (forward or backward)
let animSpeed = 5; // Speed of animation (higher value means slower)
let animCounter = 0; // Counter to control animation speed

let d; // Distance between mouse and center of image
let imgX, imgY, imgS; // Variables for image position and size

function preload() {
    // Load images into the array
    for (let i = 0; i < imgCount; i++) {
        let paddedIndex = String(i).padStart(3, '0'); // Pad index with zeros
        imgArray[i] = loadImage(`Flowers/whiteFlower${paddedIndex}.png`); // Load image
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight); // Create canvas
    imageMode(CENTER); // Set image mode to center

    imgS = height * 0.5; // Set image size
    imgX = width / 2; // Set image X position
    imgY = height / 2; // Set image Y position

    // Resize all images in the array
    imgArray.forEach(img => img.resize(0, imgS));
}

function draw() {
    background(220); // Set background color
    image(imgArray[currentImg], imgX, imgY); // Draw current image

    // Calculate distance between mouse and center of image
    d = dist(mouseX, mouseY, imgX, imgY);

    if (playAnim) { // If animation is playing
        animCounter++; // Increment counter
        if (animCounter >= animSpeed) { // If counter reaches speed
            animCounter = 0; // Reset counter
            if (forward) { // If moving forward
                currentImg++; // Increment image index
                if (currentImg >= imgCount) { // If index exceeds image count
                    currentImg = imgCount - 1; // Set to last image
                    forward = false; // Change direction to backward
                }
            } else { // If moving backward
                currentImg--; // Decrement image index
                if (currentImg <= 0) { // If index is less than or equal to 0
                    currentImg = 0; // Set to first image
                    forward = true; // Change direction to forward
                    playAnim = false; // Stop animation
                }
            }
        }
    }
}

function mousePressed() {
    // If mouse is close to the center of the image
    if (d < imgS / 6) { 
        playAnim = !playAnim; // Toggle animation
    }
}