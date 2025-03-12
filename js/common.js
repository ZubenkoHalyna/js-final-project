function redirectToErrorPage(msg) {
    const params = new URLSearchParams({error: msg});
    window.location.href = `error.html?${params}`
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
    if (!id || !Number.isInteger(id)) redirectToErrorPage(`Incorrect ${objName} id`);
    return id;
}

async function getCachedData(key, id, fetchCall) {
    const cachedObj = getFromCache(key);
    if (cachedObj && cachedObj.id === id) {
        return cachedObj;
    } else {
        return fetchCall(id).then(value => {
            addToCache(key, value);
            return value;
        });
    }
}

function addToCache(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromCache(key) {
    return JSON.parse(localStorage.getItem(key));
}

