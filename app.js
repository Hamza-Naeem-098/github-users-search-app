// Function to fetch user data from GitHub API
async function getUser(username) {
    const apiUrl = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to display user profile
function displayUser(user) {
    const userProfile = document.getElementById('userProfile');
    userProfile.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" style="width: 100px; height: 100px; border-radius: 50%;">
        <h2>${user.login}</h2>
        <p>${user.name ? user.name : ''}</p>
        <p>${user.bio ? user.bio : ''}</p>
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        <p>Public Repositories: ${user.public_repos}</p>
        <a href="${user.html_url}" target="_blank">View profile</a>
    `;
}

// Function to handle search button click
async function searchUser() {
    const username = document.getElementById('searchInput').value.trim();
    if (username) {
        const user = await getUser(username);
        if (user) {
            displayUser(user);
        } else {
            alert('User not found. Please enter a valid GitHub username.');
        }
    } else {
        alert('Please enter a GitHub username.');
    }
}
