const userContainer = document.getElementById('user-container');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
const limit = 6;
const totalPages = 2; // Since JSONPlaceholder has only 10 users

// Fetch users for a given page
async function fetchUsers(page) {
  userContainer.innerHTML = 'Loading...';

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch users');

    const data = await response.json();
    displayUsers(data);
  } catch (error) {
    userContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}

// Display user data
function displayUsers(users) {
  userContainer.innerHTML = '';

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;
    userContainer.appendChild(card);
  });
}

// Create pagination buttons
function createPagination() {
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.addEventListener('click', () => {
      currentPage = i;
      fetchUsers(currentPage);
      createPagination();
    });
    paginationContainer.appendChild(btn);
  }
}

// Initial render
fetchUsers(currentPage);
createPagination();
