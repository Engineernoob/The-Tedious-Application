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
  