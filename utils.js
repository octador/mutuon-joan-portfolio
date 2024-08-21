// Fonction pour mettre à jour les positions du rectangle
export function updatePositions(app, startPosition, endPosition) {
    startPosition = 0;
    endPosition = app.screen.width - 50;
}

// Fonction pour animer le rectangle
export function animateRectangle(app, rectangle, startPosition, endPosition, movingRight, isAnimating) {
    if (!isAnimating) return;

    if (movingRight) {
        rectangle.x += 15;
        if (rectangle.x >= endPosition) {
            rectangle.x = endPosition;
            movingRight = false;
        }
    } else {
        rectangle.x -= 15;
        if (rectangle.x <= startPosition) {
            rectangle.x = startPosition;
            movingRight = true;
            isAnimating = false;
            cancelAnimationFrame(animationFrameId);
        }
    }

    app.renderer.render(app.stage);
    animationFrameId = requestAnimationFrame(() => animateRectangle(app, rectangle, startPosition, endPosition, movingRight, isAnimating));
}

// Fonction pour démarrer l'animation
export function startAnimation(app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId) {
    if (!isAnimating) {
        isAnimating = true;
        animateRectangle(app, rectangle, startPosition, endPosition, movingRight, isAnimating);
    }
}

// Fonction pour gérer l'événement de défilement de la souris
export function onWheel(event, app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId) {
    if (event.deltaY !== 0 && !isAnimating) {
        startAnimation(app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId);
    }
}

// Fonction pour gérer l'événement de toucher sur les dispositifs tactiles
export function onTouchStart(event, app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId) {
    if (!isAnimating) {
        startAnimation(app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId);
    }
}

// Fonction pour redimensionner la fenêtre
export function onResize(app, rectangle, startPosition, endPosition) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    rectangle.height = app.screen.height;
    updatePositions(app, startPosition, endPosition);
}

// Fonction pour récupérer et afficher le nombre de scans
export async function checkScanCount() {
    try {
        const response = await fetch('https://mutuon-joan-portfolio.netlify.app/functions/track-click');
        if (response.ok) {
            const data = await response.json();
            console.log(`Nombre de scans récupéré : ${data.count}`);
        } else {
            console.error('Erreur lors de la récupération du nombre de scans');
        }
    } catch (error) {
        console.error('Erreur de connexion:', error);
    }
}