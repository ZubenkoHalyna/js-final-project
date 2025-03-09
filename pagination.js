function fillPage(maxPage, fillCurrentPage) {
    let currentPage = 1;
    const btnPrevious = document.getElementById('pgn-btn-previous');
    btnPrevious.onclick = () => showNewPage(currentPage - 1);

    const btnNext = document.getElementById('pgn-btn-next');
    btnNext.onclick = () => showNewPage(currentPage + 1);

    const dots = document.getElementsByClassName('dots')[0];
    for (let i = 0; i < maxPage; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dots.appendChild(dot);
        dot.onclick = () => showNewPage(i + 1);
    }

    function setActiveDot() {
        for (let i = 0; i < maxPage; i++) {
            dots.children[i].classList.remove('active');
        }
        dots.children[currentPage - 1].classList.add('active');
    }

    fillCurrentPage(currentPage);
    setActiveDot();

    function showNewPage(newPage) {
        const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentScroll = window.scrollY;
        currentPage = newPage;
        btnNext.disabled = currentPage === maxPage;
        btnPrevious.disabled = currentPage === 1;
        fillCurrentPage(currentPage);
        setActiveDot();
        const newScrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        window.scrollTo(0, newScrollMaxY * currentScroll / scrollMaxY);
    }
}

function addPagination(data, itemsPerPage, createCard) {
    const container = document.getElementsByClassName('cards-container')[0];
    const cacheViews = new Map();
    fillPage(Math.round(Math.ceil(data.length / itemsPerPage)), fillContainer);

    function fillContainer(currentPage) {
        const startN = (currentPage - 1) * itemsPerPage;
        const endN = Math.min(currentPage * itemsPerPage, data.length);
        container.innerHTML = '';
        for (let i = startN; i < endN; i++) {
            let card = cacheViews[data[i].id];
            if (!card) {
                card = createCard(data[i]);
                cacheViews[data[i].id] = card;
            }
            container.appendChild(card);
        }
    }
}