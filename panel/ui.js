class UI {
    static icon_bar = new IconBar()
    static panels = []

    static create() {
        let ui = createDiv("")
        ui.id('ui')
        ui.style("width", DIMENSIONS[0] + "px")
        ui.style("height", DIMENSIONS[1] + "px")

        UI.icon_bar.add(new IconButton("assets/icon/refresh.png", () => {return}, 20, 20, "Hehehe"))
        ui.child(UI.icon_bar.create())
    }
}