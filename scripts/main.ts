document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null;
    const navLinks = document.querySelector(".nav-links") as HTMLUListElement | null;
    const navIcons = document.querySelector(".nav-icons") as HTMLLIElement | null;

    if (!menuToggle || !navLinks || !navIcons) {
        console.error("Erro: Elementos de menu não encontrados no DOM.");
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("open");
        navLinks.classList.toggle("active", isOpen);

        // Garante que os ícones só aparecem quando o menu estiver aberto
        navIcons.style.display = isOpen ? "flex" : "none";
    });
});

// Scrip for offer button
document.addEventListener("DOMContentLoaded", () => {
    const offerButton = document.getElementById("offer-button") as HTMLDivElement | null;
    const offerText = document.getElementById("offer-text") as HTMLDivElement | null;

    if (offerButton && offerText) {
        offerButton.addEventListener("click", () => {
            offerText.style.display = offerText.style.display === "none" ? "block" : "none";
        });
    }
});

