// Get the video and play button elements
const video = document.getElementById('myVideo');
const playButton = document.querySelector('.play-button');

// Add an event listener to the play button
playButton.addEventListener('click', () => {
    // Play the video when the button is clicked
    video.play();
});