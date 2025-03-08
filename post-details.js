window.onload = function () {
    const postId = getIdFromUrl('post');

    getCachedData("post", postId, fetchPost)
        .then(post => {
            if (!Number.isInteger(post.userId))
                return Promise.reject("Wrong post data");
            const userPromise = getCachedData("user", post.userId, fetchUser);
            fillPostInfo(post);
            return userPromise;
        })
        .then(user => fillUserInfo(user))
        .catch(error => redirectToErrorPage(error));

    fetchComments(postId).then(comments => fillCommentsInfo(comments));
}

function fillPostInfo(post) {
    document.getElementById('post-id').innerText = `#${post.id}`;
    document.getElementById('post-title').innerText = post.title;
    document.getElementById('post-body').innerText = post.body;

    const next = document.getElementById('btn-next');
    if (post.id === 100) next.disabled = true;
    next.onclick = () => showNewPost(post.id + 1);

    const previous = document.getElementById('btn-previous');
    if (post.id === 1) previous.disabled = true;
    previous.onclick = () => showNewPost(post.id - 1);
}

function showNewPost(postId) {
    window.location.href = `post-details.html?postId=${postId}`;
}

function fillUserInfo(user) {
    document.getElementById('user-id').innerText = `#${user.id}`;
    document.getElementById('username').innerText = `@${user.username}`;
    document.getElementById('user-full-name').innerText = user.name //+ ` - @${user.username}`;
}

function fillCommentsInfo(comments) {
    const commentsContainer = document.getElementsByClassName('cards-container')[0];
    comments?.forEach(comment => commentsContainer.appendChild(createCommentCard(comment)));
}

function createCommentCard(comment) {
    const id = document.createElement('p');
    id.innerText = `#${comment.id}`;
    id.classList.add('secondary-text');

    const title = document.createElement('h3');
    title.innerText = comment.name;

    const author = document.createElement('div');
    author.classList.add('secondary-text');
    author.classList.add('author');
    const p = document.createElement('span');
    const email = document.createElement('div');
    p.innerText = 'By';
    email.innerText = comment.email;
    author.append(p, email);

    const body = document.createElement('p');
    body.classList.add('comment-body');
    body.innerText = comment.body;

    const card = document.createElement('div');
    card.classList.add('card');
    card.append(id, title, author, body);
    return card;
}