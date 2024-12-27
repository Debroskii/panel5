class UI {
    static icon_bar = new IconBar()
    static panels = []

    static add_panel(panel) {
        UI.panels.push(panel)
    }

    static create() {
        let ui = createDiv("")
        ui.id('ui')
        ui.style("width", DIMENSIONS[0] + "px")
        ui.style("height", DIMENSIONS[1] + "px")

        ui.child(UI.icon_bar.create())

        UI.panels.push(Panel.default())
        for(const panel of UI.panels) {
            ui.child(panel.create())
        }
    }

    static update() {
        let ui = document.getElementById("ui")
        let children = ui.children

        for(let i = 1; i < children.length; i++) {
            if(children[i].getAttribute("data-focused") == "true" && i < children.length) {
                ui.appendChild(children[i])
            }
        }

        for(const panel of UI.panels) {
            panel.update()
        }
    }
}