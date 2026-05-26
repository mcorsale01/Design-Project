const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

if (!hamMenu || !offScreenMenu) {
    console.error('Elements not found - check your HTML');
} else {
    hamMenu.addEventListener('click', () => {
        console.log('Clicked!');
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('off-screen-active');
    });
}