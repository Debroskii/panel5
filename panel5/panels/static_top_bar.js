class StaticTopBar extends Panel {
    constructor() {
        super("static_top_bar", createVector(-1, -1), createVector(windowWidth, 20), "PANEL5", true)
        this.element.addClass("StaticTopBar")
        document.getElementById("static_top_bar").children[0].children[0].children[0].remove()
        document.getElementById("static_top_bar").children[0].children[2].children[0].remove()
        let trailing = document.getElementById("static_top_bar").children[0].children[2]

        trailing.append(createIconButton("assets/icon/terminal.png", () => {
            GlobalRegistry.registries.forEach(registry => {console.log(registry.id, registry)})
        }, 20, 20).elt)
    }
}