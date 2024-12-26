class Panel {
    constructor(position, width, height, children = [], title = "") {
        this.position = position
        this.offset = createVector(0, 0)
        this.width = width
        this.height = min(height, 550)
        this.children = children
        this.title = title

        this.dragging = false
        this.hidden = false

        this.panel_div = createDiv("")
        this.panel_div.addClass("Panel")

        this.panel_div.style("position", "absolute")
        this.panel_div.style("top", position.y + "px").style("left", position.x + "px")
        this.panel_div.style("width", this.width + "px").style("height", this.height + "px")

        this.panel_div.child(this.create_title_bar())
    }

    add(panel_object) {
        this.panel_div.child(panel_object)
    }

    create() {
        return this.panel_div
    }

    update() {
        if(this.dragging) {
            this.position.x = mouseX + this.offset.x
            this.position.y = mouseY + this.offset.y
            this.panel_div.style("top", this.position.y + "px").style("left", this.position.x + "px")
        }
    }

    pressed() {
        if(this.within_dragpad()) {
            this.dragging = true
            this.offset.set(this.position.x - mouseX, this.position.y - mouseY)
        }
    }

    released() {
        this.dragging = false
    }

    within_dragpad() {
        return (mouseX > this.position.x && mouseY > this.position.y && mouseX < this.position.x + width && mouseY < this.position.y + 20)
    }

    static default() {
        return new Panel(createVector(30, 128), 150, 150, [], "Default Panel")
    }

    create_title_bar() {
        let bar = createDiv("")
        bar.addClass("PanelTitleBar")

        let close_button = IconButton.Close(20, () => {this.panel_div.style("display", "none"); this.hidden = true})
        bar.child(close_button.create())

        let title = createP(this.title)
        title.addClass("PanelTitle").addClass("nohighlight-text")
        bar.child(title)

        return bar
    }
}