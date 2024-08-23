import { Application, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';
import { updatePositions, animateRectangle, startAnimation, onWheel, onTouchStart, onResize} from './utils.js';

(async () => {
    // Créer l'application PIXI
    const app = new Application({
        resizeTo: window,
        backgroundColor: 0x617E9C
    });

    const portfolioContainer = document.getElementById('portfolio' );
    if (portfolioContainer) {
        portfolioContainer.appendChild(app.view);
    } else {
        console.error('L\'élément #portfolio n\'existe pas dans le HTML.');
        document.body.appendChild(app.view); // Ajouter à body en cas d'absence de #portfolio
    }  
    
    
    const footer = new Graphics();
    footer.beginFill(0x000FFF);
    footer.drawRect(0, app.screen.height - 50, app.screen.width, 50);
    footer.endFill();
    app.stage.addChild(footer);

    // Créer un rectangle
    const rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF);
    rectangle.drawRect(0, 0, 45, app.screen.height);
    rectangle.endFill();
    
    app.stage.addChild(rectangle);

    // Initialiser les positions et variables d'animation
    let { startPosition, endPosition } = updatePositions(app, rectangle);
    let isAnimating = false;

    // Gérer l'événement de défilement de la souris
    window.addEventListener('wheel', (event) => onWheel(event, app, rectangle));

    // Gérer l'événement de toucher sur les dispositifs tactiles
    window.addEventListener('touchstart', (event) => onTouchStart(event, app, rectangle), { passive: true });

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => onResize(app, rectangle,footer));

  
       
    
})();
