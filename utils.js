// Variables globales pour l'animation
let isAnimating = false;
let movingForward = true; // Assurez-vous que la variable est correctement orthographiée

// Fonction pour mettre à jour les positions du rectangle
export function updatePositions(app, rectangle) {
    const startPosition = 0;
    const endPosition = app.screen.width - rectangle.width;
    return { startPosition, endPosition };
}

// Fonction pour animer le rectangle
export function animateRectangle(app, rectangle, startPosition, endPosition) {
    if (!isAnimating) return;

    const speed = 5; // Vitesse de déplacement
    
    if (movingForward) {
        // Si le rectangle se déplace vers l'avant
        if (rectangle.x < endPosition) {
            rectangle.x += speed;
        } else {
            // Inverser la direction une fois la fin atteinte
            movingForward = false;
        }
    } else {
        // Si le rectangle se déplace vers l'arrière
        if (rectangle.x > startPosition) {
            rectangle.x -= speed;
        } else {
            // Inverser la direction une fois le début atteint
            movingForward = true;
            isAnimating = false;
        }
    }

    app.renderer.render(app.stage);
    requestAnimationFrame(() => animateRectangle(app, rectangle, startPosition, endPosition));
}

// Fonction pour démarrer l'animation
export function startAnimation(app, rectangle) {
    if (!isAnimating) {
        isAnimating = true;

        // Mettre à jour les positions du rectangle
        const { startPosition, endPosition } = updatePositions(app, rectangle);

        // Initialiser la position du rectangle à la position de départ
        rectangle.x = startPosition;

        // Commencer l'animation
        animateRectangle(app, rectangle, startPosition, endPosition);
    }
}

// Fonction pour gérer l'événement de défilement de la souris
export function onWheel(event, app, rectangle) {
    if (event.deltaY !== 0) {
        console.log(event.deltaY);
        
        startAnimation(app, rectangle);
    }
}

// Fonction pour gérer l'événement de toucher sur les dispositifs tactiles
export function onTouchStart(event, app, rectangle) {
    if (!isAnimating) {
        startAnimation(app, rectangle);
    }
}

// Fonction pour redimensionner la fenêtre
export function onResize(app, rectangle) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    rectangle.height = app.screen.height;

    // Mettre à jour les positions du rectangle en fonction de la nouvelle taille
    const { startPosition, endPosition } = updatePositions(app, rectangle);
    rectangle.x = startPosition; // Réinitialiser la position du rectangle
}
