// Pong Game Logic
const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');

let paddleWidth = 100, paddleHeight = 10, ballRadius = 8;
let x = canvas.width / 2, y = canvas.height - 30;
let dx = 2, dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let gamePaused = true;


document.addEventListener('keydown', (e) => {
  if (!gamePaused) {
    if (e.key === 'ArrowRight' && paddleX < canvas.width - paddleWidth) {
      paddleX += 20;
    } else if (e.key === 'ArrowLeft' && paddleX > 0) {
      paddleX -= 20;
    }
  }
});

function toggleGamePause(pause) {
  gamePaused = pause;
  if (!gamePaused) {
    draw(); // Resume the game loop
  }
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = '#007acc';
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = '#007acc';
  context.fill();
  context.closePath();
}

function draw() {
  if (gamePaused) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
  if (y + dy < ballRadius) dy = -dy;
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else {
      alert('Game Over!');
      document.location.reload();
      return;
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();


// Resume Upload Logic
const BACKEND_URL = "https://job-pong-backend-5599128385ea.herokuapp.com/"; // Replace with your backend URL
document.getElementById('resume-upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    const uploadStatus = document.getElementById('upload-status');
    uploadStatus.innerHTML = `
      <p>${result.message}</p>
      <p><a href="${BACKEND_URL}/uploads/${result.file}" target="_blank">View Uploaded Resume</a></p>
    `;
  } catch (err) {
    document.getElementById('upload-status').innerText = 'Error uploading resume.';
  }
});
