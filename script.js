import { Application, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    // Créez une instance de l'application PixiJS avec une taille qui s'adapte à la fenêtre et une couleur de fond
    const app = new Application({
        resizeTo: window,
        backgroundColor: 0x617E9C
    });

    // Ajoutez le canevas PixiJS au body de la page
    document.body.appendChild(app.view);

    // Créez un rectangle blanc et l'ajoutez à la scène
    const rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF); // Définir la couleur de remplissage du rectangle
    rectangle.drawRect(0, 0, 50, app.screen.height); // Dessiner le rectangle avec une largeur fixe de 50 pixels et une hauteur égale à celle de l'écran
    rectangle.endFill(); // Terminer le dessin du rectangle
    app.stage.addChild(rectangle); // Ajouter le rectangle au conteneur principal de la scène

    // Fonction pour mettre à jour les positions du rectangle en fonction de la taille de l'écran
    function updatePositions() {
        startPosition = 0; // Position de départ du rectangle
        endPosition = app.screen.width - 50; // Position de fin du rectangle (largeur de l'écran - largeur du rectangle)
    }

    // Initialisation des variables pour l'animation
    let startPosition = 0;
    let endPosition = app.screen.width - 50;
    let movingRight = true; // Direction du mouvement du rectangle
    let animationFrameId = null; // Identifiant de l'animation pour pouvoir l'annuler si nécessaire
    let isAnimating = false; // État de l'animation pour vérifier si l'animation est en cours

    // Fonction pour animer le rectangle
    function animateRectangle() {
        if (!isAnimating) return; // Ne pas continuer si l'animation n'est pas activée

        // Calculer la nouvelle position du rectangle en fonction de la direction
        if (movingRight) {
            rectangle.x += 15; // Déplacer le rectangle vers la droite (ajustez la vitesse selon vos besoins)
            if (rectangle.x >= endPosition) { // Si le rectangle atteint la position de fin
                rectangle.x = endPosition; // Positionner le rectangle à la fin
                movingRight = false; // Inverser la direction
            }
        } else {
            rectangle.x -= 15; // Déplacer le rectangle vers la gauche (ajustez la vitesse selon vos besoins)
            if (rectangle.x <= startPosition) { // Si le rectangle atteint la position de départ
                rectangle.x = startPosition; // Positionner le rectangle au départ
                movingRight = true; // Inverser la direction
                isAnimating = false; // Terminer l'animation
                cancelAnimationFrame(animationFrameId); // Annuler le rendu d'animation en cours
            }
        }

        // Re-rendu de la scène pour refléter les nouvelles positions
        app.renderer.render(app.stage);

        // Continuer l'animation en appelant animateRectangle à la prochaine frame
        animationFrameId = requestAnimationFrame(animateRectangle);
    }

    // Fonction pour démarrer l'animation
    function startAnimation() {
        if (!isAnimating) {
            isAnimating = true; // Activer l'animation
            animateRectangle(); // Démarrer l'animation
        }
    }

    // Fonction pour gérer l'événement de défilement de la souris
    function onWheel(event) {
        if (event.deltaY > 0 && !isAnimating) { // Si l'utilisateur fait défiler vers le bas et l'animation n'est pas déjà en cours
            startAnimation(); // Démarrer l'animation
        } else if (event.deltaY < 0 && !isAnimating) { // Si l'utilisateur fait défiler vers le haut et l'animation n'est pas déjà en cours
            startAnimation(); // Démarrer l'animation
        }
        
    }

    // Fonction pour gérer l'événement de toucher sur les dispositifs tactiles
    function onTouchStart(event) {
        if (!isAnimating) { // Si l'animation n'est pas déjà en cours
            startAnimation(); // Démarrer l'animation
        }
    }

    // Ajouter les écouteurs d'événements pour la souris et les dispositifs tactiles
    window.addEventListener('wheel', onWheel); // Écouteur d'événement pour le défilement de la souris
    window.addEventListener('touchstart', onTouchStart, { passive: true }); // Écouteur d'événement pour le toucher sur les dispositifs tactiles

    // Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        // Redimensionner le renderer pour correspondre à la nouvelle taille de la fenêtre
        app.renderer.resize(window.innerWidth, window.innerHeight);

        // Mettre à jour la hauteur du rectangle pour correspondre à la nouvelle hauteur de l'écran
        rectangle.height = app.screen.height;

        // Mettre à jour les positions du rectangle pour correspondre à la nouvelle largeur de l'écran
        updatePositions();
    });
})();
