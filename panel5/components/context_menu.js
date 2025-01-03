class ContextMenu {
    constructor(actions = []) {
        this.actions = []
        this.is_open = false

        this.element = createDiv("").id("ContextMenu")
        for(let action of actions) {
            this.element.child(action.elt())
        }

        document.getElementById("ContextMenu").append(new ContextMenuAction("Arrange Panels", UI.autoAlignAllPanels, "Shift + A").elt())
    }

    open() {
        this.element.style("top", mouseY + "px").style("left", mouseX + "px")
        this.element.style("opacity", "100%")
        this.is_open = true
    }

    close() {
        this.element.style("top", "-1000px").style("left", "-1000px")
        this.element.style("opacity", "0%")
        this.is_open = false
    }
}