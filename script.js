import { Application, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';
import { updatePositions, animateRectangle, startAnimation, onWheel, onTouchStart, onResize } from './utils.js';

(async () => {
    const app = new Application({
        resizeTo: window,
        backgroundColor: 0x617E9C
    });

    document.body.appendChild(app.view);

    const rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF);
    rectangle.drawRect(0, 0, 50, app.screen.height);
    rectangle.endFill();
    app.stage.addChild(rectangle);

    let startPosition = 0;
    let endPosition = app.screen.width - 50;
    let movingRight = true;
    let animationFrameId = null;
    let isAnimating = false;

    window.addEventListener('wheel', (event) => onWheel(event, app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId));

    window.addEventListener('touchstart', (event) => onTouchStart(event, app, rectangle, startPosition, endPosition, movingRight, isAnimating, animationFrameId), { passive: true });
    
    window.addEventListener('resize', () => onResize(app, rectangle, startPosition, endPosition));
})();
