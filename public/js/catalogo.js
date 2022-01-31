(function() {
    const btnFilters = document.getElementById('btn-filters');
    btnFilters.addEventListener('click', () => {
        const menuFilters = document.getElementById('menu-filters');
        if (!menuFilters.style.display || menuFilters.style.display === 'none') {
            menuFilters.style.display = 'block';
        } else {
            menuFilters.style.display = 'none';
        }
    });
})()