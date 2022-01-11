const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('#menu');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-on');
})

//Comienzo del Slider
const slider = document.querySelector('#slider-al');
let sliderSection = document.querySelectorAll('.contenido-slide-al');
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector('#btnleft');
const btnRight = document.querySelector('#btnright');

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function next (){
    let sliderSectionFirst = document.querySelectorAll('.contenido-slide-al')[0];
    slider.style.marginLeft = '-200%';
    slider.style.transition = 'all 1s';
    setTimeout(function(){
        slider.style.transition = 'none';
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = '-100%';
    }, 1000);
}

function prev (){
    let sliderSection = document.querySelectorAll('.contenido-slide-al');
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = '0';
    slider.style.transition = 'all 1s';
    setTimeout(function(){
        slider.style.transition = 'none';
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = '-100%';
    }, 1000);
}

btnRight.addEventListener('click', function(){
    next();
});

btnLeft.addEventListener('click', function(){
    prev();
});

setInterval(function (){
    next();
},6000);

//Finaliza Slider