import { Application, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({
        resizeTo: window,
        backgroundColor: 0x617E9C
    });

    document.body.appendChild(app.view);

    const rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF); // Couleur de remplissage
    rectangle.drawRect(0, 0, 50, app.screen.height); // Largeur fixe de 50 pixels
    rectangle.endFill();
    app.stage.addChild(rectangle);

    const startPosition = 0;
    const endPosition = app.screen.width - 50;
    let movingRight = true;
    let animationFrameId = null; // Identifiant de l'animation
    let isAnimating = false; // État de l'animation

    function animateRectangle() {
        if (!isAnimating) return; // Ne pas continuer si pas en animation

        // Calculer la nouvelle position en fonction de la direction
        if (movingRight) {
            rectangle.x += 20; // Ajustez la vitesse selon vos besoins
            if (rectangle.x >= endPosition) {
                rectangle.x = endPosition;
                movingRight = false;
            }
        } else {
            rectangle.x -= 20; // Ajustez la vitesse selon vos besoins
            if (rectangle.x <= startPosition) {
                rectangle.x = startPosition;
                movingRight = true;
                isAnimating = false; // Fin de l'animation
                cancelAnimationFrame(animationFrameId);
            }
        }

        // Re-rendu de la scène
        app.renderer.render(app.stage);

        // Continue l'animation
        animationFrameId = requestAnimationFrame(animateRectangle);
    }

    function startAnimation() {
        if (!isAnimating) {
            isAnimating = true;
            animateRectangle();
        }
    }

    function onWheel(event) {
        if (event.deltaY > 0 && !isAnimating) {
            startAnimation();
        }
    }

    function onTouchStart(event) {
        // Détecter le mouvement de glissement sur les dispositifs tactiles
        if (!isAnimating) {
            startAnimation();
        }
    }

    window.addEventListener('wheel', onWheel);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        rectangle.height = app.screen.height;
        // Re-calculer endPosition pour la nouvelle largeur de l'écran
        endPosition = app.screen.width - 50;
    });
})();
