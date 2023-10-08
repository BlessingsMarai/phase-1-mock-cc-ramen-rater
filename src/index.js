// write your code here
// Get all ramen from the API
async function getAllRamen() {
    const response = await fetch('http://localhost:3000/ramens');
    const data = await response.json();
    return data;
  }
  
  // Display all ramen images in the #ramen-menu div
  async function displayRamenMenu() {
    const ramens = await getAllRamen();
  
    const ramenMenuDiv = document.querySelector('#ramen-menu');
    ramens.forEach((ramen) => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => {
        displayRamenDetails(ramen);
      });
  
      ramenMenuDiv.appendChild(img);
    });
  }
  
  // Display the ramen details in the #ramen-detail div
  function displayRamenDetails(ramen) {
    const ramenDetailDiv = document.querySelector('#ramen-detail');
  
    const img = document.querySelector('.detail-image');
    img.src = ramen.image;
  
    const name = document.querySelector('.name');
    name.textContent = ramen.name;
  
    const restaurant = document.querySelector('.restaurant');
    restaurant.textContent = ramen.restaurant;
  
    const ratingDisplay = document.querySelector('#rating-display');
    ratingDisplay.textContent = ramen.rating;
  
    const commentDisplay = document.querySelector('#comment-display');
    commentDisplay.textContent = ramen.comment;
  }
  
  // Create a new ramen
  async function createNewRamen(ramen) {
    const response = await fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ramen),
    });
  
    const data = await response.json();
    return data;
  }
  
  // Add a new ramen to the #ramen-menu div
  function addNewRamenToMenu(ramen) {
    const ramenMenuDiv = document.querySelector('#ramen-menu');
  
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener('click', () => {
      displayRamenDetails(ramen);
    });
  
    ramenMenuDiv.appendChild(img);
  }
  
  // Handle the submit event for the new ramen form
  document.querySelector('#new-ramen').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const ramen = {
      name: document.querySelector('#new-name').value,
      restaurant: document.querySelector('#new-restaurant').value,
      image: document.querySelector('#new-image').value,
      rating: document.querySelector('#new-rating').value,
      comment: document.querySelector('#new-comment').value,
    };
  
    const newRamen = await createNewRamen(ramen);
  
    addNewRamenToMenu(newRamen);
  });
  
  // Display the ramen menu when the page loads
  displayRamenMenu();
  