import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  const postButton = document.getElementById('post');
  const spamWords = [' spam ', ' scam ', ' fake ', ' pussy ', ' dick ', ' whatsapp ', ' wa.me ', ' telegram ', ' please ', ' sex ', ' fuck ', ' t.me ', ' phone number ', ' mad ', ' crazy ', ' werey ', ' ass ', ' foolish ', 'opay ', 'palmpay ', 'send ', 'pls ', '081', '+234', '080', '+91', 'bitcoin ', 'wallet ', 'giveaway ']; // list of spam words

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBB5uEvjeAfYGUCEKDOr19jrryc55j_Dko",
    authDomain: "github-profile-roast.firebaseapp.com",
    projectId: "github-profile-roast",
    storageBucket: "github-profile-roast.appspot.com",
    messagingSenderId: "781404853532",
    appId: "1:781404853532:web:3a7a7af2d65714f26816d9",
    measurementId: "G-N1Q4MMEV24"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  postButton.addEventListener('click', async function() {
    // Get the title and description
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    // Validate title and description lengths
    const titleWordCount = title.split(/\s+/).filter(word => word.length > 0).length;
    const descriptionWordCount = description.split(/\s+/).filter(word => word.length > 0).length;

    if (titleWordCount < 3) {
      alert("The title must contain at least 3 words.");
      return;
    }

    if (descriptionWordCount < 5) {
      alert("The description must contain at least 5 words.");
      return;
    }

    // Get selected tags
    const selectedTags = [];
    document.querySelectorAll('.custom-checkbox[data-checked="true"]').forEach(function(checkbox) {
      selectedTags.push(checkbox.textContent.trim());
    });

    // Check if any tag is selected
    if (selectedTags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }

    // Convert title and description to lowercase for spam detection
    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();

    // Check for spam words in the lowercase title or description
    const isSpam = spamWords.some(word => titleLower.includes(word) || descriptionLower.includes(word));
    if (isSpam) {
      alert("Your post contains spam words and cannot be posted.");
      return;
    }
    postButton.textContent ="Posting..."
    // Prepare the tip data (keeping original case)
    const tipData = {
      title: title, // Original case
      description: description, // Original case
      tags: selectedTags,
      createdAt: serverTimestamp()
    };

    try {
      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, "tips"), tipData);
      console.log("Tip successfully posted with ID: ", docRef.id);
      postButton.textContent ="Post"
      alert("Tip successfully posted!");

      // Optionally clear the form after posting
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.querySelectorAll('.custom-checkbox').forEach(checkbox => checkbox.setAttribute('data-checked', 'false'));
    } catch (error) {
      console.error("Error adding tip: ", error);
      postButton.textContent ="Post"
      alert("Error posting tip, please try again.");
    }
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