(function (global) {
    if ("app" in global) {
        app.listen(document.querySelectorAll(".card > button"), function () {
            this.classList.toggle("card--is-selected");
        });
    }
} (window));