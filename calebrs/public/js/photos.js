const filterButtons =
    document.querySelectorAll(".photo-filter button");

const photoItems =
    document.querySelectorAll(".photo-item");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        /* Update active button */

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        /* Filter photos */

        photoItems.forEach((item) => {

            const category =
                item.dataset.category;

            const shouldShow =
                filter === "all" ||
                category === filter;

            item.hidden =
                !shouldShow;
        });

    });

});