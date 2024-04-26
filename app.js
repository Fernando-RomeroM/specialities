// Importa Express
const express = require('express');

// Crea una instancia de Express
const app = express();
const PORT = 3000; // Puerto en el que se ejecutará el servidor

// Datos de especialidades
const specialties = {
    marketing: {
        name: 'Marketing',
        description: 'Specializing in marketing strategies and campaigns.'
    },
    developers: {
        name: 'Developers',
        description: 'Specializing in web and software development.',
        users: [
            { name: 'Usuario 3', age: 28 },
            { name: 'Usuario 4', age: 32 },
            { name: 'Usuario 5', age: 26 }
        ]
    },
    design: {
        name: 'Design',
        description: 'Specializing in graphic and web design.',
        users: [
            { name: 'Usuario 6', age: 40 },
            { name: 'Usuario 7', age: 36 },
            { name: 'Usuario 8', age: 33 },
            { name: 'Usuario 9', age: 29 }
        ]
    }
};

// Ruta para la página principal
app.get('/', (req, res) => {
    res.send('Bienvenido a nuestra página principal');
});

// Rutas para especialidades
Object.keys(specialties).forEach(specialty => {
    app.get(`/${specialty}`, (req, res) => {
        const { name, description, users } = specialties[specialty];
        let pageContent = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Página de ${name}</title>
            </head>
            <body>
                <h1>${name}</h1>
                <p>${description}</p>
            `;
        if (users) {
            const userCount = users.length;
            const userDetails = users.map(user => `<li>${user.name} - Edad: ${user.age}</li>`).join('');
            pageContent += `
                <p>Número de personas: ${userCount}</p>
                <ul>${userDetails}</ul>
            `;
        }
        pageContent += `
            </body>
            </html>
        `;
        res.send(pageContent);
    });
});

// Manejo de errores 404 para rutas no definidas
app.use((req, res, next) => {
    res.status(404).send("Lo siento, no se encontró la página solicitada.");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
