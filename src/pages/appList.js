document.addEventListener('DOMContentLoaded', function() {
    const contentSection = document.getElementById("contentContainer");
    const content = document.createElement('h2');

    const userCookie = decodeURIComponent(document.cookie)
        .split('; ')
        .find(cookie => cookie.startsWith('user='));

    const sistemDate = new Date();
    const hora = fecha.getHours();
    
    if (hora >= 6 && hora < 12) {
            mensajeElement.textContent = "Buenos días, ¡te damos la bienvenida!";
    } else if (hora >= 12 && hora < 18) {
            mensajeElement.textContent = "¡Buenas tardes! Esperamos que tengas un buen día.";
    } else {
            mensajeElement.textContent = "¡Buenas noches! Esperamos que hayas tenido un buen día.";
    }
    if (userCookie) {
        const userValue = userCookie.split('=')[1];
        const userTextNode = document.createTextNode('Bienvenido, ' + userValue); // Cambio aquí para agregar un mensaje
        content.appendChild(userTextNode);
        contentSection.appendChild(content);
    }

    
});


