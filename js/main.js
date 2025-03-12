window.addEventListener("load", async function() {
    fillUsersInfo(await fetchUsers());
});

function fillUsersInfo(users) {
    if (!users || !Array.isArray(users))
        return redirectToErrorPage("Wrong users data");
    const container = document.getElementById('cards-container');
    users.forEach(user => container.appendChild(createUserCard(user)));
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('card');

    const id = document.createElement('p');
    id.textContent = `#${user.id}`;
    id.classList.add('secondary-text');

    const name = document.createElement('p');
    name.textContent = user.name;

    const button = document.createElement('button');
    button.textContent = 'User details';
    button.onclick = () => userDetailsClick(user);

    card.append(id, name, button);
    return card;
}

function userDetailsClick(user) {
    addToCache('user', user);
    const params = new URLSearchParams({userId: user.id});
    window.location.href = `user-details.html?${params}`;
}