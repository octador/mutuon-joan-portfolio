// about.js
import { Application, Graphics, Text, TextStyle } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

const app = new Application({
    view: document.createElement('canvas'),
    resizeTo: window,
    backgroundColor: 0x8A2BE2 // Couleur de fond pour la page "About"
});

document.getElementById('about').appendChild(app.view);

const aboutTextStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: '#ffffff',
    align: 'center'
});

const aboutText = new Text('À Propos de Moi', aboutTextStyle);
aboutText.x = app.screen.width / 2;
aboutText.y = app.screen.height / 2;
aboutText.anchor.set(0.5);

app.stage.addChild(aboutText);

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
