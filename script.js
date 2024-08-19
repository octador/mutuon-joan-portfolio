import { Application, Sprite, Assets } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({ resizeTo: window });
    document.body.appendChild(app.view);

    try {
        await Assets.load('images/sample.png');
        console.log('Image chargée');

        const sprite = Sprite.from('images/sample.png');
        sprite.anchor.set(0.5);
        sprite.x = app.renderer.width / 2;
        sprite.y = app.renderer.height / 2;
        app.stage.addChild(sprite);

        app.ticker.add(() => {
            sprite.rotation += 0.01;
        });
    } catch (error) {
        console.error('Erreur lors du chargement de l\'image:', error);
    }
})();
