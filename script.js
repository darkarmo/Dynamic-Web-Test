window.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');
  const exitButton = document.querySelector('.exit-button');
  const hoverBoxes = document.querySelector('.hover-boxes');
  let isPlaying = false;
  let isReversing = false;
  let reverseInterval = null;

  // Play Button Event Listener
  playButton.addEventListener('click', () => {
      if (isReversing) return;

      if (!isPlaying) {
          video.play();
          playButton.style.display = 'none';
          exitButton.classList.add('show');
          isPlaying = true;

          hoverBoxes.style.display = 'none'; // Hide hover boxes while playing
      }
  });

  // Exit Button Event Listener
  exitButton.addEventListener('click', () => {
      if (isReversing) return;

      video.pause();
      isReversing = true;
      if (reverseInterval) clearInterval(reverseInterval);

      // Hide hover boxes immediately when reverse is clicked
      hoverBoxes.style.display = 'none';

      reverseInterval = setInterval(() => {
          if (video.currentTime > 0) {
              video.currentTime -= 0.1;
          } else {
              clearInterval(reverseInterval);
              isReversing = false;
              isPlaying = false;
              playButton.style.display = 'block';
              exitButton.classList.remove('show');
          }
      }, 100);
  });

  // Video End Event Listener
  video.addEventListener('ended', () => {
      hoverBoxes.style.display = 'flex'; // Ensure hover boxes are visible at video end
  });
});
