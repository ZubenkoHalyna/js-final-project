window.addEventListener("load", async function () {
    const userId = getIdFromUrl('user');
    fillUserInfo(await getCachedData("user", userId, fetchUser));

    const postsContainer = document.getElementById('cards-container');
    const postsView = document.getElementById('cards-area');
    document.getElementById('btn-posts').onclick = async function () {
        if (postsContainer.children.length === 0) {
            addPagination(await fetchUserPosts(userId), 5, createPostCard);
        }
        const isVisible = postsView.style.display !== 'none';
        postsView.style.display = isVisible ? 'none' : 'flex';
        this.textContent = isVisible ? 'Show posts' : 'Hide posts';
    };
});

function fillUserInfo(user) {
    document.getElementById('user-id').innerText = `#${user.id}`;
    document.getElementById('user-name').innerText = user.name;
    document.getElementById('email').innerText = user.email;
    document.getElementById('user-pen-name').innerText = user.username;
    document.getElementById('phone').innerText = user.phone;
    document.getElementById('site').innerText = user.website;
    document.getElementById('gps').innerText = `${user.address.geo.lat}, ${user.address.geo.lng}`;
    appendFields(user.address, document.getElementById('location'));
    appendFields(user.company, document.getElementById('company'));
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('p');
    title.classList.add('scrollable');
    title.innerText = post.title;

    const button = document.createElement('button');
    button.classList.add('secondary');
    button.textContent = 'Details';
    button.onclick = () => postDetailsClick(post);
    card.append(title, button);
    return card;
}

function postDetailsClick(post) {
    addToCache('post', post);
    const params = new URLSearchParams({postId: post.id});
    window.location.href = `post-details.html?${params}`;
}

function appendFields(obj, container) {
    for (let key in obj) {
        if (typeof obj[key] !== 'object') {
            const p = document.createElement('p');
            p.innerText = `${key}: ${obj[key]}`;
            container.appendChild(p);
        }
    }
}