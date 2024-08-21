let scanCount = 0; // Compteur des scans

exports.handler = async function(event, context) {
    scanCount++; // Incrémenter le compteur

    // Affiche le nombre de scans dans la console
    console.log(`Le QR code a été scanné ${scanCount} fois`);

    // Redirige vers la destination finale
    return {
        statusCode: 302,
        headers: {
            Location: 'https://mutuon-joan-portfolio.netlify.app/' 
        }
    };
};
