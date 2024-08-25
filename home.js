// home.js
import { Application, Graphics, Text, TextStyle } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

const app = new Application({
    view: document.createElement('canvas'),
    resizeTo: window,
    backgroundColor: 0x87CEEB // Couleur de fond pour la page d'accueil
});

document.getElementById('home').appendChild(app.view);

const homeTextStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: '#ffffff',
    align: 'center'
});

const homeText = new Text('Bienvenue sur ma page d\'accueil', homeTextStyle);
homeText.x = app.screen.width / 2;
homeText.y = app.screen.height / 2;
homeText.anchor.set(0.5);

app.stage.addChild(homeText);

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
