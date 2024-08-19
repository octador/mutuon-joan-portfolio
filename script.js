import { Application, Sprite, Assets } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({ resizeTo: window });
    document.body.appendChild(app.view);

    try {
        await Assets.load('images/sample.png');
        console.log('Image chargée');
        
        // création du sprite et positionnement initial
        const sprite = Sprite.from('images/sample.png');
        sprite.anchor.set(0.5);
        sprite.x = app.renderer.width / 2;
        sprite.y = app.renderer.height / 2;
        app.stage.addChild(sprite);

        app.ticker.add(() => {
            sprite.rotation += 0.01;
        });

        // Fonction de mise à jour de la position du sprite
        function updateSpritePosition() {
            sprite.x = app.renderer.width / 2;
            sprite.y = app.renderer.height / 2;
        }

        // Écouter les événements de redimensionnement
        window.addEventListener('resize', () => {
            const { innerWidth, innerHeight } = window;
            app.renderer.resize(innerWidth, innerHeight);
            updateSpritePosition(); // Mettre à jour la position du sprite après le redimensionnement
        });

        // Mettre à jour la position du sprite initialement
        updateSpritePosition();

    } catch (error) {
        console.error('Erreur lors du chargement de l\'image:', error);
    }
})();
