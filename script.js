// Wait until the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  const exitButton = document.querySelector('.exit-button'); // Select the pre-created exit button
  let isPlaying = false;
  let isReversing = false;
  let reverseInterval = null; // To store the interval for reversing the video

  // Function to handle the play and reverse functionality
  playButton.addEventListener('click', () => {
    // If the video is currently reversing, do nothing until the reverse finishes
    if (isReversing) return;

    if (!isPlaying) {
      // Play the video normally
      video.play();
      playButton.textContent = 'Reverse'; // Change button text to 'Reverse'
      isPlaying = true;

    } else {
      // Pause the video and start reversing it
      video.pause();

      // Start the reversing process
      isReversing = true;
      playButton.style.display = 'none'; // Hide the play button during reverse

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
          playButton.textContent = '>'; // Reset the button back to '>'
          playButton.style.display = 'block'; // Show the play button again
        }
      }, 100); // Repeat every 100ms to create the reverse effect
    }
  });

  // Functionality for the exit button (visible from the start)
  exitButton.addEventListener('click', () => {
    if (isReversing) {
      // If the video is reversing, stop the reverse process
      clearInterval(reverseInterval);
      isReversing = false;
      isPlaying = false;
      playButton.textContent = '>'; // Reset play button to its initial state
      playButton.style.display = 'block'; // Show play button again
    } else {
      // If the video is not reversing, you can implement additional logic here
      alert('Video is not reversing currently.');
    }
  });
});
