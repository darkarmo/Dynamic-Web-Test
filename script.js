// Wait until the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  const exitButton = document.querySelector('.exit-button'); // Select the "X" button
  let isPlaying = false;
  let isReversing = false;
  let reverseInterval = null; // To store the interval for reversing the video

  // Function to handle the play functionality
  playButton.addEventListener('click', () => {
      // If the video is currently reversing, stop the reverse and play normally
      if (isReversing) return;

      if (!isPlaying) {
          // Play the video normally
          video.play();
          playButton.style.display = 'none'; // Hide the play button
          exitButton.classList.add('show');  // Show the "X" button after playing
          isPlaying = true;

      }
  });

  // Functionality for the reverse button ("X")
  exitButton.addEventListener('click', () => {
      if (isReversing) return;

      // Pause the video and start reversing it
      video.pause();
      isReversing = true;

      // Clear any previous intervals for safety
      if (reverseInterval) clearInterval(reverseInterval);

      // Reverse the video by reducing the current time in small intervals
      reverseInterval = setInterval(() => {
          if (video.currentTime > 0) {
              video.currentTime -= 0.1; // Move the video time back by 0.1 seconds
          } else {
              // Stop reversing when it reaches the start
              clearInterval(reverseInterval);
              isReversing = false;
              isPlaying = false;
              playButton.style.display = 'block'; // Show the play button again
              exitButton.classList.remove('show'); // Hide the "X" button
          }
      }, 100); // Repeat every 100ms to create the reverse effect
  });
});
