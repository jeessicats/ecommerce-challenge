var menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        document.body.classList.toggle("active");
        menuToggle.classList.toggle("open"); // Adiciona uma classe ao botão para animar
    });
}
else {
    console.error("Elemento #menu-toggle não encontrado!");
}
