// mesProjets.js
import { Application, Graphics, Text, TextStyle } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

const app = new Application({
    view: document.createElement('canvas'),
    resizeTo: window,
    backgroundColor: 0xFF6347 // Couleur de fond pour la page "Mes Projets"
});

document.getElementById('mesProjets').appendChild(app.view);

const mesProjetsTextStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: '#ffffff',
    align: 'center'
});

const mesProjetsText = new Text('Mes Projets', mesProjetsTextStyle);
mesProjetsText.x = app.screen.width / 2;
mesProjetsText.y = app.screen.height / 2;
mesProjetsText.anchor.set(0.5);

app.stage.addChild(mesProjetsText);

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
