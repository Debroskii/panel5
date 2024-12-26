class IconButton {
    constructor(icon_filepath, on_click, width, height = width, title = "Button") {
        this.icon_filepath = icon_filepath
        this.on_click = on_click
        this.width = width
        this.height = height
        this.title = title
    }

    create() {
        let button = createButton("")
        button.addClass("PanelButton")
        button.style("width", this.width + "px")
        button.style("height", this.height + "px")
        button.attribute("title", this.title)
        button.attribute("tabindex", -1)

        let icon = createImg(this.icon_filepath)
        icon.addClass("PanelButtonIcon").addClass("PanelIcon")
        icon.style("width", this.width * 0.75 + "px")
        icon.style("height", this.height * 0.75 + "px")
        button.child(icon)

        button.mouseClicked(this.on_click)

        return button
    }

    static Close(width, on_click) {
        return new IconButton("assets/icon/x.png", on_click, width, width, "Close")
    }
}