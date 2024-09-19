// Add this to your existing script
window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  const exitButton = document.querySelector('.exit-button');
  const hoverBoxes = document.querySelector('.hover-boxes'); // Select hover boxes container
  let isPlaying = false;
  let isReversing = false;
  let reverseInterval = null;

  // Function to handle the play functionality
  playButton.addEventListener('click', () => {
      if (isReversing) return;

      if (!isPlaying) {
          video.play();
          playButton.style.display = 'none';
          exitButton.classList.add('show');
          isPlaying = true;

          // Hide hover boxes when video starts playing
          hoverBoxes.style.display = 'none';
      }
  });

  // Functionality for the reverse button ("X")
  exitButton.addEventListener('click', () => {
      if (isReversing) return;

      video.pause();
      isReversing = true;
      if (reverseInterval) clearInterval(reverseInterval);

      reverseInterval = setInterval(() => {
          if (video.currentTime > 0) {
              video.currentTime -= 0.1;
          } else {
              clearInterval(reverseInterval);
              isReversing = false;
              isPlaying = false;
              playButton.style.display = 'block';
              exitButton.classList.remove('show');
              hoverBoxes.style.display = 'flex'; // Show hover boxes when video ends
          }
      }, 100);
  });

  // Show hover boxes when video ends
  video.addEventListener('ended', () => {
      hoverBoxes.style.display = 'flex'; // Ensure hover boxes are visible at video end
  });
});
