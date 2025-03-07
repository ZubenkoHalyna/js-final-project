const userId = getIdFromUrl('user');
getCachedData("user", userId, fetchUser).then(user => fillUserInfo(user));

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

    const button = document.getElementById('btn-posts');
    const posts = document.getElementById('posts-container');
    button.onclick = () => postsBtnClick(posts, (btnNewText) => button.textContent = btnNewText);
}

function fillPosts(container) {
    //lazy load
    fetchUserPosts(userId).then((posts) => {
        for (let post of posts) {
            const card = document.createElement('div');
            const title = document.createElement('p');
            title.innerText = post.title;

            const button = document.createElement('button');
            button.textContent = 'Details';
            button.onclick = () => postDetailsClick(post);
            card.append(title, button);
            container.appendChild(card);
        }
    });
}

function postDetailsClick(post) {
    addToCache('post', post);
    window.location.href = `post-details.html?postId=${post.id}`;
}

function postsBtnClick(postsContainer, changeButtonText) {
    if (postsContainer.children.length === 0) {
        fillPosts(postsContainer);
        changeButtonText(`Hide posts`);
    } else if (postsContainer.style.display === 'none') {
        postsContainer.style.display = 'grid';
        changeButtonText(`Hide posts`);
    } else {
        postsContainer.style.display = 'none';
        changeButtonText(`Show posts`);
    }
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