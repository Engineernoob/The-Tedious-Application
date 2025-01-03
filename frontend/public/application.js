document.getElementById('application-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formStatus = document.getElementById('form-status');
    formStatus.innerText = "Thank you for applying! We’ll definitely (not) be in touch.";
  });
  