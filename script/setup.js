// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

  // Event listener for the button click on the setup page
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      // Display "Setting up..." message
      this.textContent = 'Setting up...';

      // Collect selected values
      const selectedValues = [];
      document.querySelectorAll('.custom-checkbox[data-checked="true"]').forEach(function(checkbox) {
        selectedValues.push(checkbox.textContent.trim());
      });

      // Save the selected values to local storage
      localStorage.setItem('selectedLanguages', JSON.stringify(selectedValues));

      // Redirect to home.html after a short delay
      setTimeout(function() {
        window.location.href = 'home.html';
      }, 1000); // 1 second delay
    });
  });

  // Add event listeners to the custom checkboxes
  document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      // Toggle the data-checked attribute between true and false
      const isChecked = this.getAttribute('data-checked') === 'true';
      this.setAttribute('data-checked', !isChecked);
    });
  });
});
