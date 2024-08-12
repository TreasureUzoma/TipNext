document.addEventListener('DOMContentLoaded', function() {
  const noResultsDiv = document.getElementById("noResultsFound");
  // Retrieve selected languages from local storage, convert to lowercase, or initialize an empty array
  const selectedLanguages = (JSON.parse(localStorage.getItem('selectedLanguages')) || [])
    .map(lang => lang.toLowerCase()); // Convert each language to lowercase

  // Log the selected languages to the console
  console.log('Selected languages from localStorage:', selectedLanguages);

  const posts = document.getElementsByClassName("post");
  const siteLanguages = [];

  // Collect all languages (tip classes) from the posts on the site
  for (let i = 0; i < posts.length; i++) {
    const tipClass = posts[i].getElementsByClassName("tip-class")[0].textContent.toLowerCase().replace('#', '');
    siteLanguages.push(tipClass);
  }

  // Log the languages found in the posts on the site to the console
  console.log('Languages (tip classes) on the site:', siteLanguages);

  // Function to filter posts based on selected languages
  function filterPostsByLanguage() {
    if (selectedLanguages.length > 0) {
      for (let i = 0; i < posts.length; i++) {
        const tipClass = posts[i].getElementsByClassName("tip-class")[0].textContent.toLowerCase().replace('#', '');
        if (selectedLanguages.includes(tipClass)) {
          posts[i].style.display = "block";
        } else {
          posts[i].style.display = "block";
        }
      }
    } else {
      // Show all posts if no language is selected
      for (let i = 0; i < posts.length; i++) {
        posts[i].style.display = "block";
      }
    }
  }

  // Function to search and filter posts
  window.search = function() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    let resultFound = false;

    for (let i = 0; i < posts.length; i++) {
      const title = posts[i].getElementsByClassName("tip-title")[0].textContent.toLowerCase();
      const description = posts[i].getElementsByClassName("tip-description")[0].textContent.toLowerCase();
      const tipClass = posts[i].getElementsByClassName("tip-class")[0].textContent.toLowerCase().replace('#', '');

      if (title.includes(searchInput) || description.includes(searchInput) || tipClass.includes(searchInput)) {
        posts[i].style.display = "block";
        resultFound = true;
      } else {
        posts[i].style.display = "none";
      }
    }

    // Show or hide the "No results found" div
    
    if (resultFound) {
      noResultsDiv.style.display = "none";
    } else {
      noResultsDiv.style.display = "block";
    }
  };

  // Initial filtering of posts by selected languages
  filterPostsByLanguage();
});
