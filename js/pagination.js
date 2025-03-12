function managePages(maxPage, fillPage) {
    let currentPage = 0;
    const btnPrevious = document.getElementById('pgn-btn-previous');
    btnPrevious.onclick = () => showNewPage(currentPage - 1);

    const btnNext = document.getElementById('pgn-btn-next');
    btnNext.onclick = () => showNewPage(currentPage + 1);

    const dots = document.getElementById('dots');
    dots.innerText = '';
    for (let i = 0; i < maxPage; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dots.appendChild(dot);
        dot.onclick = () => showNewPage(i);
    }

    fillPage(currentPage);
    dots.children[0].classList.add('active');
    btnNext.disabled = currentPage === maxPage - 1;
    btnPrevious.disabled = currentPage === 0;

    function showNewPage(newPage) {
        if (currentPage !== newPage) {
            dots.children[currentPage].classList.remove('active');
            dots.children[newPage].classList.add('active');
            currentPage = newPage;
            btnNext.disabled = currentPage === maxPage - 1;
            btnPrevious.disabled = currentPage === 0;
            fillPage(currentPage);
        }
    }
}

function addPagination(data, itemsPerPageDefault, createCard) {
    const container = document.getElementById('cards-container');
    const cacheViews = new Map();
    let itemsPerPage = getFromCache('itemsPerPage' + window.location.pathname) || itemsPerPageDefault;
    let maxItemWidth = calcMaxItemWidth();
    managePages(Math.round(Math.ceil(data.length / itemsPerPage)), fillContainer);

    const input = document.getElementById('cards-per-page');
    input.value = itemsPerPage;
    input.onchange = function () {
        const value = input.value;
        if (value < 1 || value > 6) {
            this.value = itemsPerPage;
            return;
        }
        itemsPerPage = this.value;
        addToCache('itemsPerPage' + window.location.pathname, itemsPerPage);
        maxItemWidth = calcMaxItemWidth();
        managePages(Math.round(Math.ceil(data.length / itemsPerPage)), fillContainer);
    }

    function fillContainer(pageNumber) {
        const startN = pageNumber * itemsPerPage;
        const endN = Math.min((pageNumber + 1) * itemsPerPage, data.length);

        container.innerHTML = '';
        for (let i = startN; i < endN; i++) {
            let card = cacheViews[data[i].id];
            if (!card) {
                card = createCard(data[i]);
                cacheViews[data[i].id] = card;
            }
            card.style['max-width'] = maxItemWidth;
            container.appendChild(card);
        }
    }

    function calcMaxItemWidth() {
        return 100 / itemsPerPage + '%';
    }
}