//Comienzo del Slider banner
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


//slider product

const sliderProducts = document.querySelectorAll('.slider-content');

if (sliderProducts.length > 0) {
    function moveNext(slider){
        let sliderProductFirts = slider.querySelectorAll('.product-box')[0];
        slider.style.marginLeft = '-550px';
        slider.style.transition = 'all 1s';
        setTimeout (function(){
            slider.style.transition = 'none';
            slider.insertAdjacentElement('beforeend', sliderProductFirts);
            slider.style.marginLeft = '-280px';
        },1000);
    }
    
    function movePrev(slider){
        let sliderSectionProduct = slider.querySelectorAll('.product-box');
        let sliderSectionProdLast = sliderSectionProduct[sliderSectionProduct.length -1];
        slider.style.marginLeft = '0';
        slider.style.transition = 'all 1s';
        setTimeout (function(){
            slider.style.transition = 'none';
            slider.insertAdjacentElement('afterbegin', sliderSectionProdLast);
            slider.style.marginLeft = '-270px';
        },1000);
    
    }
    
    sliderProducts.forEach((slider) => {
        let sliderSectionProduct = slider.querySelectorAll('.product-box');
        let sliderSectionProdLast = sliderSectionProduct[sliderSectionProduct.length -1];

        const chevronsRight = slider.querySelector('.bx-chevrons-right');
        const chevronsLeft = slider.querySelector('.bx-chevrons-left');

        slider.insertAdjacentElement('afterbegin', sliderSectionProdLast);

        chevronsRight.addEventListener('click', function (){
            moveNext(slider);
        });

        chevronsLeft.addEventListener('click', function(){
            movePrev(slider);
        });
    });
}