const filterButtons = document.querySelectorAll(".gallery-filters button");
const galleryCards = document.querySelectorAll(".gallery-card");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-nav.prev");
const nextButton = document.querySelector(".lightbox-nav.next");

let currentCardIndex = 0;

function getVisibleCards() {
    return Array.from(galleryCards).filter((card) => !card.hidden);
}

function openLightbox(card) {
    const visibleCards = getVisibleCards();
    currentCardIndex = visibleCards.indexOf(card);

    if (currentCardIndex < 0) {
        return;
    }

    const fullSrc = card.dataset.fullSrc;
    const caption = card.dataset.caption || "photo";

    lightboxImage.src = fullSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
}

function moveLightbox(direction) {
    const visibleCards = getVisibleCards();

    if (!visibleCards.length) {
        return;
    }

    currentCardIndex = (currentCardIndex + direction + visibleCards.length) % visibleCards.length;
    const nextCard = visibleCards[currentCardIndex];
    openLightbox(nextCard);
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        galleryCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow = filter === "all" || category === filter;
            card.hidden = !shouldShow;
        });

        if (lightbox.classList.contains("is-open")) {
            const visibleCards = getVisibleCards();
            if (!visibleCards.length) {
                closeLightbox();
                return;
            }

            currentCardIndex = Math.min(currentCardIndex, visibleCards.length - 1);
            openLightbox(visibleCards[currentCardIndex]);
        }
    });
});

galleryCards.forEach((card) => {
    const image = card.querySelector("img");

    image.addEventListener("click", () => openLightbox(card));
});

lightboxClose.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => moveLightbox(-1));
nextButton.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        moveLightbox(1);
    }

    if (event.key === "ArrowLeft") {
        moveLightbox(-1);
    }
});
