const searchString = new URLSearchParams(window.location.search);
const id = searchString.get('id');

const post = fetch('https://jsonplaceholder.typicode.com/posts/' + id).then(value => value.json());
const comments = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(value => value.json());

Promise.all([post, comments]).then((value) => {
        const [post, comments] = value;
        const container = document.createElement('div');
        container.classList.add('container');
        console.log(post);
        if (post) {
            document.body.appendChild(container);

            const postId = document.createElement('p');
            postId.innerText = `#${post.id}`;
            const title = document.createElement('h1');
            title.innerText = post.title;

            const author = document.createElement('p');
            author.classList.add('author');

            const user = JSON.parse(localStorage.getItem(`user-${post.userId}`));
            if (user && user.id === post.userId) {
                author.innerText = `by ${user.name}`;
                const p = document.createElement('p');
                p.innerText = `#${user.id} - @${user.username}`;
                author.append(p);
            } else {
                author.innerText = `User #${post.userId}`;
            }

            const body = document.createElement('p');
            body.classList.add('post-body');
            body.innerText = post.body;
            container.append(postId, title, author, body);
        }

        if (comments && comments.length) {
            const h2 = document.createElement('h2');
            h2.innerText = `Comments`;

            const commentsContainer = document.createElement('div');
            commentsContainer.classList.add('comments-container');
            container.append(h2, commentsContainer);

            for (let comment of comments) {
                const commentView = document.createElement('div');
                commentView.classList.add('comment');
                commentsContainer.appendChild(commentView);

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

                commentView.append(id, title, author, body);
            }
        }
    }
)