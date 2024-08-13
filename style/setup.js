// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  const setupButton = document.getElementById('setupButton');

  // Function to update the button state based on selected tags
  function updateButtonState() {
    const selectedValues = document.querySelectorAll('.custom-checkbox[data-checked="true"]');

    if (selectedValues.length >= 5) {
      // Enable the button by removing the 'disabled' class and attribute
      setupButton.classList.remove('disabled');
      setupButton.removeAttribute('disabled');
    } else {
      // Disable the button by adding the 'disabled' class and attribute
      setupButton.classList.add('disabled');
      setupButton.setAttribute('disabled', true);
    }
  }

  // Add event listeners to the custom checkboxes
  document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      // Toggle the data-checked attribute between true and false
      const isChecked = this.getAttribute('data-checked') === 'true';
      this.setAttribute('data-checked', !isChecked);

      // Update the button state based on the number of selected tags
      updateButtonState();
    });
  });

  // Event listener for the button click on the setup page
  setupButton.addEventListener('click', function() {
    // Collect selected values
    const selectedValues = [];
    document.querySelectorAll('.custom-checkbox[data-checked="true"]').forEach(function(checkbox) {
      selectedValues.push(checkbox.textContent.trim());
    });

    // Display "Setting up..." message
    this.textContent = 'Setting up...';

    // Save the selected values to local storage
    localStorage.setItem('selectedLanguages', JSON.stringify(selectedValues));

    // Redirect to home.html after a short delay
    setTimeout(function() {
      window.location.href = 'home.html';
    }, 1000); // 1 second delay
  });
  
  // Initialize button state on page load
  updateButtonState();
});
