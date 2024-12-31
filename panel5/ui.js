class UI {
    static panels = []
    static DOMRoot

    static initialize() {
        UI.DOMRoot = createDiv("").id("UIRoot")
        UI.DOMRoot.style("width", windowWidth + "px").style("height", windowHeight + "px")

        this.panels.push(new StaticTopBar())

        for(const panel of UI.panels) {
            UI.DOMRoot.child(panel.element)
        }
    }   

    static addPanel(panel) {
        UI.panels.push(panel)
        UI.DOMRoot.child(panel.element)
    }

    static removePanel(panel) {
        UI.panels.splice(UI.panels.indexOf(panel), 1)
    }

    static updatePanels() {
        for(const panel of UI.panels) {
            panel.update()
        }
    }

    static handleMousePress() {
        if(mouseButton === LEFT) {
            for(const panel of UI.panels) {
                panel.pressed()
            }
        }
    }

    static handleMouseRelease() {
        if(mouseButton === LEFT) {
            for(const panel of UI.panels) {
                panel.released()
            }
        }
    }
}