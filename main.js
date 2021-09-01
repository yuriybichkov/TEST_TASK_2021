const inputText = document.querySelector('.input-text');
const applyText = document.querySelector('.apply-text');
let text;
let textArray = [];


applyText.addEventListener('click', (e) => {
    e.preventDefault();
    getText();
    formatText(text);
    deleteText();
    renderText();
})

function getText() {
    text = inputText.value;
    inputText.value = '';
}

function formatText(str) {
    textArray = str.split('');
}

function deleteText() {
    if (document.querySelector('.changedText')) {
        document.querySelector('.changedText').remove();
    }
}

function renderText() {
    let textElem = document.createElement('div');
    textElem.classList.add('changedText');

    let htmlText = textArray.reduce((resStr, item) => resStr + `<span>${item}</span>`, '');

    textElem.insertAdjacentHTML('afterbegin', htmlText);
    document.body.append(textElem);

    textElem.addEventListener('click', e => getDraggableText(e, e.target))

    textArray = [];
}

function getDraggableText(event, elem) {
    let selectedText = document.getSelection();

    if (selectedText.toString()) {
        let div = document.createElement('div');
        div.innerText = selectedText.toString();

        moveElement(event, div);

        selectedText.deleteFromDocument();
    } else {
        moveElement(event, elem);
    }
}

function moveElement(event, elem) {

    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
        document.body.append(elem);

        elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
    }

    function moveElem (event) {
        moveAt(event.pageX, event.pageY);
    }

    if (!elem.classList.contains('draggable')) {
        elem.classList.add('draggable')
        document.addEventListener('mousemove', moveElem);

        elem.onclick = function () {
            document.removeEventListener('mousemove', moveElem);
            elem.classList.remove('draggable')
        }
    }
}


