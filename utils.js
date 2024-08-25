// utils.js
export function updateFooter(app, footer) {
    footer.clear(); // Nettoyer les anciens dessins
    footer.beginFill(0x000FFF); // Nouvelle couleur de fond
    footer.drawRect(0, 0, app.screen.width, 50); // Largeur et hauteur du footer
    footer.endFill();
    footer.x = 0; // Position horizontale
    footer.y = app.screen.height - 50; // Position verticale (bas de l'écran)
}

export function updateFooterText(app, footerText) {
    footerText.text = 'Copyright © 2023 Joan Mutuon';
    footerText.x = app.screen.width / 2; // Centrer le texte horizontalement
    footerText.y = app.screen.height - 50 + 25; // Ajuster la position verticale pour le centrer dans le footer
    footerText.anchor.set(0.5); // Centrer le texte autour du point d'ancrage
}

