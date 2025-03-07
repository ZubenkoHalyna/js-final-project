function redirectToErrorPage(msg) {
    window.location.href = `error.html?error=${msg}`
}

async function fetchData(url) {
    const response = await fetch(url).catch(redirectToErrorPage);
    if (!response.ok) redirectToErrorPage(`${response.status} ${response.statusText}`);
    return response.json();
}

const fetchUsers = () => fetchData(`https://jsonplaceholder.typicode.com/users`);
const fetchUser = (userId) => fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`);
const fetchUserPosts = (userId) => fetchData(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
const fetchPost = (postId) => fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}`);
const fetchComments = (postId) => fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

function getIdFromUrl(objName) {
    const searchParams = new URLSearchParams(window.location.search);
    const id = +searchParams.get(`${objName}Id`);
    if (!id) redirectToErrorPage(`Incorrect ${objName} id`);
    return id;
}

async function getCachedData(key, id, fetchCall) {
    const cachedObj = JSON.parse(localStorage.getItem(key));
    if (cachedObj && cachedObj.id === id) {
        return cachedObj;
    } else {
        return fetchCall(id).then(value => {
            localStorage.setItem(key, JSON.stringify(value));
            return value;
        });
    }
}

function addToCache(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

