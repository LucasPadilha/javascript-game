const triggerClick = (el) => {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });

    const canceled = !el.dispatchEvent(event);
};

const controlUp = document.querySelector('#control-up');
const controlRight = document.querySelector('#control-right');
const controlDown = document.querySelector('#control-down');
const controlLeft = document.querySelector('#control-left');
const controlPrimary = document.querySelector('#control-primary');
const controlSecondary = document.querySelector('#control-secondary');
const controlTertiary = document.querySelector('#control-tertiary');

controlUp.addEventListener('click', () => {
    map.move(Map.DIRECTION_UP);
});

controlRight.addEventListener('click', () => {
    map.move(Map.DIRECTION_RIGHT);
});

controlDown.addEventListener('click', () => {
    map.move(Map.DIRECTION_DOWN);
});

controlLeft.addEventListener('click', () => {
    map.move(Map.DIRECTION_LEFT);
});

controlPrimary.addEventListener('click', () => {
    map.interact();
});

controlSecondary.addEventListener('click', () => {
    map.look();
});

controlTertiary.addEventListener('click', () => {
    map.rotate();
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            
            triggerClick(controlUp);
            break;
        case 'ArrowRight':
            event.preventDefault();

            triggerClick(controlRight);
            break;
        case 'ArrowDown':
            event.preventDefault();

            triggerClick(controlDown);
            break;
        case 'ArrowLeft':
            event.preventDefault();

            triggerClick(controlLeft);
            break;
        case ' ':
            event.preventDefault();

            triggerClick(controlPrimary);
            break;
    
        default:
            break;
    }

    // console.log(event.key);
});