import { Application, Sprite, Assets, Text, TextStyle } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({ resizeTo: window });
    document.body.appendChild(app.view);

    try {
        await Assets.load('images/sample.png');
        console.log('Image chargée');

        // Définir le style du texte
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'white',
        });

        // Création du texte et positionnement initial
        const title = new Text('Site en construction', style);
        title.anchor.set(0.5);
        title.x = app.renderer.width / 2; // Centre horizontalement
        title.y = app.renderer.height / 4; // Un quart de la hauteur
        app.stage.addChild(title);

        // Création du sprite et positionnement initial
        const sprite = Sprite.from('images/sample.png');
        sprite.anchor.set(0.5);
        sprite.x = app.renderer.width / 2;
        sprite.y = app.renderer.height / 2;
        app.stage.addChild(sprite);

        app.ticker.add(() => {
            sprite.rotation += 0.01;
        });

        // Fonction de mise à jour des positions du sprite et du texte
        function updatePositions() {
            sprite.x = app.renderer.width / 2;
            sprite.y = app.renderer.height / 2;
            title.x = app.renderer.width / 2;
            title.y = app.renderer.height / 4;
        }

        // Écouter les événements de redimensionnement
        window.addEventListener('resize', () => {
            const { innerWidth, innerHeight } = window;
            app.renderer.resize(innerWidth, innerHeight);
            updatePositions(); // Mettre à jour les positions après le redimensionnement
        });

        // Mettre à jour les positions initialement
        updatePositions();

    } catch (error) {
        console.error('Erreur lors du chargement de l\'image:', error);
    }
})();
