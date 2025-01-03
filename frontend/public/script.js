// Pong Game Logic
const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');

let paddleWidth = 100, paddleHeight = 10, ballRadius = 8;
let x = canvas.width / 2, y = canvas.height - 30;
let dx = 2, dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && paddleX < canvas.width - paddleWidth) {
    paddleX += 20;
  } else if (e.key === 'ArrowLeft' && paddleX > 0) {
    paddleX -= 20;
  }
});

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
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
  if (y + dy < ballRadius) dy = -dy;
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else return; // Game Over
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();

// Resume Upload Logic
document.getElementById('resume-upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    const uploadStatus = document.getElementById('upload-status');
    uploadStatus.innerHTML = `
      <p>${result.message}</p>
      <p><a href="${result.fileUrl}" target="_blank">View Uploaded Resume</a></p>
    `;
  } catch (err) {
    document.getElementById('upload-status').innerText = 'Error uploading resume.';
  }
});
