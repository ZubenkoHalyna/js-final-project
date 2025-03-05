fetch('https://jsonplaceholder.typicode.com/users').then(value => value.json()).then(users => {
    const container = document.getElementById('container');

    for (let user of users) {
        const card = document.createElement('div');
        const id = document.createElement('p');
        id.innerText = `#${user.id}`;
        const name = document.createElement('p');
        name.innerText = user.name;
        const button = document.createElement('button');
        button.textContent = 'User details';
        button.onclick = () => {
            localStorage.setItem(`user-${user.id}`, JSON.stringify(user));
            console.log(JSON.stringify(user));
            window.location.href = 'user-details.html?id=' + user.id;
        }
        card.append(id, name, button);
        container.appendChild(card);
    }
});