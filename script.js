import { Application, Graphics, Text, TextStyle, Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({ resizeTo: window });
    document.body.appendChild(app.view);

    try {
        // Style du texte
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'white',
        });

        // Création et positionnement du texte
        const title = new Text('Site en construction', style);
        title.anchor.set(0.5);
        title.x = app.renderer.width / 2;
        title.y = app.renderer.height / 2;

        // Création d'un conteneur pour le titre
        const container = new Container();
        container.addChild(title);
        app.stage.addChild(container);

        // Création du masque
        const mask = new Graphics();
        mask.beginFill(0x000000); // La couleur du masque n'a pas d'importance
        mask.drawRect(0, 0, app.renderer.width, app.renderer.height); // Masque couvrant toute la scène
        mask.endFill();

        // Zone transparente au centre pour le titre
        mask.beginFill(0x000000, 0); // Zone transparente
        mask.drawRect(0, app.renderer.height / 2 - 50, app.renderer.width, 100); // Zone du titre
        mask.endFill();

        // Appliquer le masque au conteneur
        container.mask = mask;
        app.stage.addChild(mask);

        // Création des grains de sable
        const grains = [];
        const numGrains = 1000; // Nombre de grains de sable
        const vortexHeight = 100; // Hauteur du tourbillon

        function getRandomSandColor() {
            // Palette de couleurs de sable réalistes
            const colors = ['#e0cda9', '#b7a78b', '#8f836d', '#464137', '#26231f'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function createGrain() {
            const grainDeSable = new Graphics();
            const color = getRandomSandColor(); // Obtenir une couleur réaliste
            grainDeSable.beginFill(color);
            grainDeSable.drawCircle(0, 0, 1); // Taille des grains de sable
            grainDeSable.endFill();

            // Positionner les grains hors écran à gauche
            grainDeSable.x = -Math.random() * 200; // Hors écran à gauche
            grainDeSable.y = title.y + Math.random() * vortexHeight - vortexHeight / 2; // Position verticale centrée sur le titre

            // Définir la vitesse de déplacement horizontal et les paramètres de tourbillon
            grainDeSable.velocityX = Math.random() * 2 + 1; // Vitesse horizontale positive
            grainDeSable.amplitude = Math.random() * 10 + 10; // Amplitude du mouvement vertical
            grainDeSable.frequency = Math.random() * 0.02 + 0.01; // Fréquence du mouvement vertical

            return grainDeSable;
        }

        for (let i = 0; i < numGrains; i++) {
            const grainDeSable = createGrain();
            grains.push(grainDeSable);
            app.stage.addChild(grainDeSable);
        }

        // Animation des grains de sable
        let grainsPassed = 0; // Compteur pour les grains de sable passés

        app.ticker.add(() => {
            let allGrainsPassed = true; // Variable pour vérifier si tous les grains ont traversé

            grains.forEach(grain => {
                // Déplacer horizontalement
                grain.x += grain.velocityX;

                // Créer un mouvement tourbillonnant vertical centré sur le titre
                grain.y = title.y + Math.sin(grain.x * grain.frequency) * grain.amplitude;

                // Vérifier si le grain passe par la zone du titre
                if (grain.x >= -1 && grain.x <= app.renderer.width + 1) {
                    allGrainsPassed = false; // Un grain n'a pas encore passé
                }

                // Réinitialiser la position du grain si nécessaire
                if (grain.x > app.renderer.width) {
                    grain.x = Infinity; // Enlève le grain de la scène une fois qu'il a traversé l'écran
                }
            });

            // Si tous les grains ont passé, révéler le titre et arrêter l'animation
            if (allGrainsPassed) {
                container.mask = null; // Révéler le titre en supprimant le masque
                app.ticker.stop(); // Arrêter l'animation
            }
        });

        // Fonction de mise à jour des positions après redimensionnement
        function updatePositions() {
            title.x = app.renderer.width / 2;
            title.y = app.renderer.height / 2;
            mask.x = 0; // Réinitialiser la position du masque
        }

        // Écouter les événements de redimensionnement
        window.addEventListener('resize', () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            updatePositions(); // Mettre à jour la position après redimensionnement
        });

        // Mettre à jour les positions initialement
        updatePositions();

    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
})();
