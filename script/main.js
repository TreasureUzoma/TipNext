import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async function() {
  const noResultsDiv = document.getElementById("noResultsFound");
  const postContainer = document.querySelector("main section"); // Container to hold the posts
  const selectedLanguages = (JSON.parse(localStorage.getItem('selectedLanguages')) || []).map(lang => lang.toLowerCase());

  console.log('Selected languages from localStorage:', selectedLanguages);

  const firebaseConfig = {
    apiKey: "AIzaSyBB5uEvjeAfYGUCEKDOr19jrryc55j_Dko",
    authDomain: "github-profile-roast.firebaseapp.com",
    projectId: "github-profile-roast",
    storageBucket: "github-profile-roast.appspot.com",
    messagingSenderId: "781404853532",
    appId: "1:781404853532:web:3a7a7af2d65714f26816d9",
    measurementId: "G-N1Q4MMEV24"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    const querySnapshot = await getDocs(collection(db, "tips"));
    postContainer.innerHTML = ''; // Clear any existing dummy posts

    if (querySnapshot.empty) {
      noResultsDiv.style.display = "block"; // Show "No results found" if no posts
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <h4 class="tip-title">${data.title}</h4>
        <p class="tip-description">${data.description}</p>
        ${data.tags.map(tag => `<span class="tip-class">#${tag.toLowerCase()}</span>`).join('')}
      `;
      postContainer.appendChild(postElement);
    });

    filterPostsByLanguage();

  } catch (error) {
    console.error("Error fetching tips:", error);
    alert("Failed to load tips. Please try again later.");
  }

  function filterPostsByLanguage() {
    const posts = document.getElementsByClassName("post");
    if (selectedLanguages.length === 0) {
      window.location.href = 'setup.html';
      return;
    }

    let hasVisiblePosts = false;
    for (let i = 0; i < posts.length; i++) {
      const tipClasses = Array.from(posts[i].getElementsByClassName("tip-class"))
        .map(tag => tag.textContent.toLowerCase().replace('#', ''));

      const matches = tipClasses.some(tipClass => selectedLanguages.includes(tipClass));

      if (matches) {
        posts[i].style.display = "block"; 
        hasVisiblePosts = true;
      } else {
        posts[i].style.display = "none"; 
      }
    }

    if (!hasVisiblePosts) {
      noResultsDiv.style.display = "block";
    }
  }

  window.search = function() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const posts = document.getElementsByClassName("post");
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

    noResultsDiv.style.display = resultFound ? "none" : "block";
  };

  filterPostsByLanguage();
});
