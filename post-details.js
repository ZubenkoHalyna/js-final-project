const searchString = new URLSearchParams(window.location.search);
const id = searchString.get('id');

const commentsPromise = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(value => value.json());

const postPromise = getPostData();
const wasLoaded = [false, false];

async function getPostData() {
    const localPost = JSON.parse(localStorage.getItem('post'));
    const post = (localPost && localPost.id === +id) ? localPost
        : await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(value => {
                wasLoaded[0] = true;
                return value.json();
            });

    const localUser = JSON.parse(localStorage.getItem('user'));
    const user = (localUser && localUser.id === post.userId) ? localUser
        : await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
            .then(value => {
                wasLoaded[1] = true;
                return value.json();
            });

    return [post, user];
}

postPromise.then((value) => {
    const [post, user] = value;

    const postId = document.getElementById('post-id');
    postId.innerText = `#${post.id}`;
    const title = document.getElementById('post-title');
    title.innerText = post.title;

    const authorId = document.getElementById('user-id');
    authorId.innerText = `#${user.id}`;
    const username = document.getElementById('username');
    username.innerText = `@${user.username}`;
    const fullName = document.getElementById('user-full-name');
    fullName.innerText = user.name;

    const body = document.getElementById('post-body');
    body.innerText = post.body;

    const next = document.getElementById('next');
    if (post.id === 100) next.disabled = true;
    next.onclick = function () {
        window.location.href = `post-details.html?id=${post.id + 1}`;
    }
    const previous = document.getElementById('previous');
    if (post.id === 1) previous.disabled = true;
    previous.onclick = function () {
        window.location.href = `post-details.html?id=${post.id - 1}`;
    }

    if (wasLoaded[0]) {
        localStorage.setItem('post', JSON.stringify(post));
    }
    if (wasLoaded[1]) {
        localStorage.setItem('user', JSON.stringify(user));
    }
});

commentsPromise.then(comments => {
    if (comments && comments.length) {
        const commentsView = document.getElementById('comments-view')
        for (let comment of comments) {
            const id = document.createElement('p');
            id.innerText = `#${comment.id}`;

            const title = document.createElement('h3');
            title.innerText = comment.name;

            const author = document.createElement('p');
            author.innerText = `by ${comment.email}`;
            author.classList.add('author');

            const body = document.createElement('p');
            body.classList.add('comment-body');
            body.innerText = comment.body;

            const card = document.createElement('div');
            card.classList.add('comment');
            card.append(id, title, author, body);
            commentsView.appendChild(card);
        }
    }
});