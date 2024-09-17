// Wait until the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  let exitButton = null; // Placeholder for the dynamically created exit button
  let isPlaying = false;
  let isReversing = false;
  let reverseInterval = null; // To store the interval for reversing the video

  // Function to create an exit button (reverse button in top left)
  const createExitButton = () => {
    exitButton = document.createElement('button');
    exitButton.classList.add('exit-button');
    exitButton.textContent = 'X'; // The exit symbol (or use an icon here if needed)
    document.body.appendChild(exitButton);

    // Event listener for the exit button to stop reversing
    exitButton.addEventListener('click', () => {
      // Stop the reverse process and reset everything
      clearInterval(reverseInterval);
      isReversing = false;
      isPlaying = false;
      playButton.textContent = '>'; // Show the play button (right arrow)
      exitButton.style.display = 'none'; // Hide the exit button
    });
  };

  // Create the exit button once the DOM is loaded
  createExitButton();

  // Function to handle the play and reverse functionality
  playButton.addEventListener('click', () => {
    // If the video is currently reversing, do nothing until the reverse finishes
    if (isReversing) return;

    if (!isPlaying) {
      // Play the video normally
      video.play();
      playButton.textContent = 'Reverse'; // Change button text to 'Reverse'
      isPlaying = true;

      // Hide the exit button when playing
      exitButton.style.display = 'none';
    } else {
      // Pause the video and start reversing it
      video.pause();

      // Start the reversing process
      isReversing = true;
      playButton.style.display = 'none'; // Hide the play button during reverse

      // Display the exit button in the top left
      exitButton.style.display = 'block';

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
          exitButton.style.display = 'none'; // Hide the exit button when done
        }
      }, 100); // Repeat every 100ms to create the reverse effect
    }
  });
});
