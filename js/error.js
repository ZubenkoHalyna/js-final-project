window.onload = function () {
    const searchString = new URLSearchParams(window.location.search);
    const error = searchString.get('error');

    const msg = document.getElementById('error-msg');
    msg.innerText = error;
}