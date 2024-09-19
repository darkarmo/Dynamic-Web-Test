// Wait until the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  const exitButton = document.querySelector('.exit-button');
  let isPlaying = false;

  // Initially hide the exit button (X)
  exitButton.style.display = 'none';

  // Play button functionality
  playButton.addEventListener('click', () => {
    if (!isPlaying) {
      // Play the video
      video.play();
      isPlaying = true;

      // Move the "X" button to the top right corner and make it visible
      exitButton.classList.add('top-right');  // Add a class to move the X button to the top-right
      exitButton.style.display = 'block';     // Ensure the X button is visible
      playButton.style.display = 'none';      // Hide the play button
    } 
  });

  // Exit button (X) functionality
  exitButton.addEventListener('click', () => {
    if (isPlaying) {
      // Pause the video and stop playback
      video.pause();
      isPlaying = false;

      // Hide the "X" button and reset its position
      exitButton.style.display = 'none';  // Hide the X button after pausing the video
      playButton.style.display = 'block';  // Show the play button again
    }
  });
});
