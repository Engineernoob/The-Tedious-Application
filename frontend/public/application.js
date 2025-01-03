document.getElementById('application-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formStatus = document.getElementById('form-status');

  // Collect form data
  const formData = new FormData(e.target);

  try {
      const response = await fetch('https://your-backend-app-name.herokuapp.com/application', { // Replace with your backend URL
          method: 'POST',
          body: formData
      });

      if (response.ok) {
          formStatus.innerText = "Thank you for applying! We’ll definitely (not) be in touch.";
      } else {
          const errorData = await response.json();
          formStatus.innerText = `Error: ${errorData.message}`;
      }
  } catch (error) {
      formStatus.innerText = "An error occurred while submitting your application. Please try again.";
  }
});
