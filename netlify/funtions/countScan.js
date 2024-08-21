// netlify/functions/countScan.js
const fetch = require('node-fetch'); // Utilisé pour faire des requêtes HTTP (si nécessaire)

// Simule un compteur de scan (remplace cela par un stockage persistant comme FaunaDB ou Airtable)
let scanCount = 0;

exports.handler = async function(event, context) {
    scanCount += 1; // Incrémentation du compteur

    // Optionnel : Stocker le compteur dans un service externe comme FaunaDB ou Airtable

    return {
        statusCode: 302, // Redirige après l'incrémentation du compteur
        headers: {
            'Location': 'https://ton-site-final.com', // Remplace par l'URL de destination
        },
    };
};
