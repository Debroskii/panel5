class StaticTopBar extends Panel {
    constructor() {
        super("static_top_bar", createVector(-1, -1), createVector(windowWidth, 20), "PANEL5", true)
        this.element.addClass("StaticTopBar")
        document.getElementById("static_top_bar").children[0].children[0].children[0].remove()
        document.getElementById("static_top_bar").children[0].children[2].children[0].remove()
        let trailing = document.getElementById("static_top_bar").children[0].children[2]

        trailing.append(createIconButton("assets/icon/terminal.png", () => {
            GlobalRegistry.registries.forEach(registry => {console.log(UI.panelNoZone)})
        }, 20, 20).elt)

        trailing.append(createIconButton("assets/icon/terminal.png", () => {
            UI.addPanel(new Panel(ceil(random(0, 10000)), createVector(0, 0), createVector(100, 220)))
        }, 20, 20).elt)

        trailing.append(createIconButton("assets/icon/terminal.png", UI.autoAlignAllPanels, 20, 20).elt)
    }
}