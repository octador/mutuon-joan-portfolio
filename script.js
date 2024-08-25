document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.scroll-container');
    let isScrolling = false;

    function scrollToSection(index) {
        if (isScrolling) return;
        isScrolling = true;

        const viewportWidth = window.innerWidth;
        const targetScrollLeft = index * viewportWidth;



        scrollContainer.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isScrolling = false;
        }, 100); // Réduire la durée si nécessaire
    }

    // Gérer les événements de défilement de la souris
    window.addEventListener('wheel', function (event) {
        const currentScrollLeft = scrollContainer.scrollLeft;

        if (event.deltaY > 0) {
            const nextIndex = Math.min(Math.floor(currentScrollLeft / window.innerWidth) + 1, (scrollContainer.scrollWidth / window.innerWidth) - 1);
            scrollToSection(nextIndex);
        } else {
            const prevIndex = Math.max(Math.floor(currentScrollLeft / window.innerWidth) - 1, 0);
            console.log('Previous Index:', prevIndex);
            scrollToSection(prevIndex);
        }
        event.preventDefault();
    }, { passive: false });
});
