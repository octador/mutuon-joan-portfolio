document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.scroll-container');
    let isScrolling = false;

    function scrollToSection(index) {
        if (isScrolling) return;
        isScrolling = true;

        const viewportWidth = window.innerWidth;
        const targetScrollLeft = index * viewportWidth;

        console.log(`Scrolling to index: ${index}`);
        console.log(`Target scroll left: ${targetScrollLeft}`);

        // Ajout de la transformation pour l'animation
        scrollContainer.style.transform = `translateX(-${targetScrollLeft}px)`;

        setTimeout(() => {
            isScrolling = false;
        }, 1000); // La durée de l'animation CSS
    }

    // Gérer les événements de défilement de la souris
    window.addEventListener('wheel', function (event) {
        const currentScrollLeft = -parseFloat(scrollContainer.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
        const viewportWidth = window.innerWidth;
        const totalWidth = scrollContainer.scrollWidth;
        const totalSections = Math.floor(totalWidth / viewportWidth);
        const currentIndex = Math.floor(currentScrollLeft / viewportWidth);

        let nextIndex = currentIndex;

        if (event.deltaY > 0) {
            nextIndex = Math.min(currentIndex + 1, totalSections - 1);
            console.log(`Scrolling down. Next index: ${nextIndex}`);
        } else {
            nextIndex = Math.max(currentIndex - 1, 0);
            console.log(`Scrolling up. Previous index: ${nextIndex}`);
        }

        scrollToSection(nextIndex);
        event.preventDefault();
    }, { passive: false });

});
