window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  const exitButton = document.querySelector('.exit-button');
  const hoverBoxes = document.querySelector('.hover-boxes');
  const whiteBoxes = document.querySelector('.white-boxes');
  let isPlaying = false;
  let isReversing = false;
  let reverseInterval = null;

  // Function to handle the play functionality
  playButton.addEventListener('click', () => {
      if (isReversing) return;

      if (!isPlaying) {
          video.play();
          playButton.style.display = 'none'; // Hide the play button
          exitButton.classList.add('show');  // Show the "X" button
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
              hoverBoxes.style.display = 'none'; // Hide the hover boxes
              whiteBoxes.classList.remove('show'); // Hide the white boxes
              whiteBoxes.querySelectorAll('.white-box').forEach(box => box.style.display = 'none'); // Hide all white boxes
          }
      }, 100); // Repeat every 100ms to create the reverse effect
  });

  // Show hover boxes and white boxes when the video ends
  video.addEventListener('ended', () => {
      if (isPlaying && !isReversing) {
          hoverBoxes.style.display = 'flex'; // Show the hover boxes
          whiteBoxes.classList.add('show');  // Ensure white boxes are shown
      }
  });

  // Function to handle hover on the hover boxes
  document.querySelectorAll('.hover-box').forEach(box => {
      box.addEventListener('mouseover', () => {
          const boxClass = box.classList[1]; // Get the class to identify which white box to show
          const whiteBox = document.querySelector(`.white-box.${boxClass}`);
          if (whiteBox) {
              whiteBox.style.display = 'flex'; // Show the white box
          }
      });
      box.addEventListener('mouseout', () => {
          const boxClass = box.classList[1]; // Get the class to identify which white box to hide
          const whiteBox = document.querySelector(`.white-box.${boxClass}`);
          if (whiteBox) {
              whiteBox.style.display = 'none'; // Hide the white box
          }
      });
  });
});
