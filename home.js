import { Application, Text, TextStyle, Sprite, Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

// Créer une application PixiJS
const app = new Application({
    view: document.createElement('canvas'),
    resizeTo: window,
    backgroundColor: 0x1b1b1b // Couleur de fond sombre moderne
});

// Ajouter le canvas PixiJS au DOM
document.getElementById('home').appendChild(app.view);

// Définir le style du premier texte
const homeTextStyle = new TextStyle({
    fontFamily: 'Poppins, sans-serif',
    fontSize: 25,
    fontStyle: 'italic',
    fill: ['#ffffff', '#f3f3f3'], // Dégradé de couleur pour plus de modernité
    align: 'center',
    stroke: '#333333',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 6,
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 10,
    letterSpacing: 1.5,
    lineHeight: 50,
    wordWrap: true,
    wordWrapWidth: 600, 
});

// Créer le premier texte
const homeText = new Text(`
Bonjour, Je suis Mutuon Joan
Développeur Intégrateur Web & web mobile full stack Junior`, homeTextStyle);

// Définir le style du deuxième texte
const homeTextStyle2 = new TextStyle({
    fontFamily: 'Poppins, sans-serif',
    fontSize: 24,
    fontWeight: '400',
    fill: '#f39c12', // Couleur vive pour le texte secondaire
    align: 'center',
    lineHeight: 35,
    wordWrap: true,
    wordWrapWidth: 600, // Largeur maximale du texte
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 5,
    letterSpacing: 1.5,
});

// Créer le deuxième texte
const homeText2 = new Text(
    `Je suis à la recherche d'une entreprise pour un contrat d'alternance où je pourrai évoluer et approfondir mes connaissances.`, homeTextStyle2
);

// Charger et ajouter l'image
const imageUrl = 'images/developpeur.png';
const imageTexture = Texture.from(imageUrl);
const imageSprite = new Sprite(imageTexture);

// Définir la taille initiale de l'image
const initialImageSize = 300; 
imageSprite.width = initialImageSize;
imageSprite.height = initialImageSize;

// Ajouter les éléments à la scène
app.stage.addChild(homeText);
app.stage.addChild(homeText2);
app.stage.addChild(imageSprite);

// Fonction pour mettre à jour la position du texte et de l'image
function updatePositions() {
    // Ajuster la largeur de la ligne du texte après le redimensionnement
    homeText.style.wordWrapWidth = app.screen.width * 0.8;
    homeText2.style.wordWrapWidth = app.screen.width * 0.8;

    // Mettre à jour la taille du texte 
    homeText.style.fontSize = Math.min(app.screen.width / 30, app.screen.height / 15);
    homeText2.style.fontSize = Math.min(app.screen.width / 40, app.screen.height / 20);

    // Mettre à jour la taille de l'image proportionnellement à l'écran
    const newImageSize = Math.min(app.screen.width / 2, app.screen.height / 2);
    imageSprite.width = newImageSize;
    imageSprite.height = newImageSize;

    // Positionner le premier texte avec un espace suffisant en haut
    homeText.x = app.screen.width / 2;
    homeText.y = app.screen.height * 0.1; // Ajustez l'espacement en pourcentage de l'écran
    homeText.anchor.set(0.5, 0); // Centrer horizontalement et aligner verticalement au début

    // Positionner le deuxième texte avec un espace suffisant en dessous du premier texte
    homeText2.x = app.screen.width / 2;
    homeText2.y = homeText.y + homeText.height + 20; // Positionner en dessous du premier texte avec un espace de 20 pixels
    homeText2.anchor.set(0.5, 0); // Centrer horizontalement et aligner verticalement au début

    // Positionner l'image en bas de la page
    imageSprite.x = app.screen.width / 2;
    imageSprite.y = app.screen.height; // Positionner l'image avec un espace en bas
    imageSprite.anchor.set(0.5, 1); // Centrer horizontalement et aligner verticalement en bas
}

// Mettre à jour la position du texte et de l'image initialement
updatePositions();

// Réagir au redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Redimensionner le canvas
    app.renderer.resize(window.innerWidth, window.innerHeight);
    
    // Mettre à jour la position du texte et de l'image
    updatePositions();
});
