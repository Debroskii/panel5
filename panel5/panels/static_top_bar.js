/**
 * A class representing a top bar.
 * @extends Panel
 */
class StaticTopBar extends Panel {
    /**
     * Creates a top bar object
     */
    constructor() {
        super("static_top_bar", createVector(-1, -1), createVector(windowWidth, 20), test_registry.get('title').value, true)
        this.element.addClass("StaticTopBar")
        document.getElementById("static_top_bar").children[0].children[0].children[0].remove()
        document.getElementById("static_top_bar").children[0].children[2].children[0].remove()
    }

    /**
     * Updates the top bar
     */
    update() {
        super.update()
        document.getElementById("static_top_bar").children[0].children[1].innerHTML = test_registry.get('title').value
    }
}