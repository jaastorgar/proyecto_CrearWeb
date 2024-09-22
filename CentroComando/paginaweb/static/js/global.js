// Escuchar el clic en todos los botones de "Ver Detalles"
document.addEventListener("DOMContentLoaded", function () {
    const detailButtons = document.querySelectorAll(".portfolio-button");
    const modals = document.querySelectorAll(".modal");

    // Agregar un event listener a cada botón para abrir el modal correspondiente
    detailButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetModal = this.getAttribute("data-bs-target");
            const modal = document.querySelector(targetModal);
            modal.classList.add("show");
            modal.style.display = "block";
        });
    });

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    modals.forEach((modal) => {
        const closeButton = modal.querySelector(".btn-close");
        closeButton.addEventListener("click", function () {
            modal.classList.remove("show");
            modal.style.display = "none";
        });
    });

    // Cerrar el modal cuando se hace clic fuera del modal
    modals.forEach((modal) => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.classList.remove("show");
                modal.style.display = "none";
            }
        });
    });
});