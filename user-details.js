const searchString = new URLSearchParams(window.location.search);
const id = searchString.get('id');

const user = JSON.parse(localStorage.getItem(`user`));

if (user && user.id === +id) {
    fillPage(user);
} else {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(value => value.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            fillPage(user);
        });
}

function fillPage(user) {
    const userInfo = document.getElementById('user-info');
    const userId = document.createElement('p');
    userId.innerText = `#${user.id}`;

    const name = document.createElement('h1');
    name.innerText = user.name;
    userInfo.append(userId, name);

    const email = document.getElementById('email');
    email.innerText = user.email;

    const username = document.getElementById('username');
    username.innerText = user.username;

    const phone = document.getElementById('phone');
    phone.innerText = user.phone;

    const site = document.getElementById('site');
    site.innerText = user.website;

    const location = document.getElementById('location');
    location.innerText = `${user.address.geo.lat}, ${user.address.geo.lng}`;
    appendFields(user.address, location);

    const company = document.getElementById('company');
    company.innerText = 'Company';
    appendFields(user.company, company);

    const button = document.getElementById('manage-posts');
    const posts = document.getElementById('posts-container');
    button.onclick = function () {
        if (posts.children.length === 0) {
            fillPosts(posts);
            button.textContent = `Hide posts`;
        } else if (posts.style.display === 'none') {
            posts.style.display = 'grid';
            button.textContent = `Hide posts`;
        } else {
            posts.style.display = 'none';
            button.textContent = `Show posts`;
        }
    }
}

function fillPosts(container) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`).then(value => value.json()).then(posts => {
        for (let post of posts) {
            const card = document.createElement('div');
            const p = document.createElement('span');
            p.innerText = post.title;

            const button = document.createElement('button');
            button.textContent = 'Details';
            button.onclick = function () {
                localStorage.setItem('post', JSON.stringify(post));
                window.location.href = `post-details.html?id=${post.id}`;
            }
            card.append(p, button);
            container.appendChild(card);
        }
    });
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