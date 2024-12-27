class Panel {
    constructor(position, width, height, title = "") {
        this.position = position
        this.offset = createVector(0, 0)
        this.width = width
        this.height = min(height, 550)
        this.title = title

        this.registry = new ValueRegistry()
        this.packed_reg = null

        this.dragging = false

        this.panel_div = createDiv("")
        this.panel_div.addClass("Panel")

        this.panel_div.style("position", "absolute")
        this.panel_div.style("top", position.y + "px").style("left", position.x + "px")
        this.panel_div.style("width", this.width + "px").style("height", this.height + "px")

        this.panel_div.child(this.create_title_bar())
    }

    create() {
        this.packed_reg = this.registry.pack()
        this.panel_div.child(this.packed_reg)
        return this.panel_div
    }

    update() {
        if(this.dragging) {
            if(mouseX + this.offset.x > 0 && mouseX + this.offset.x < DIMENSIONS[0] - this.width) {
                this.position.x = mouseX + this.offset.x
            }

            if(mouseY + this.offset.y > 0 && mouseY + this.offset.y < DIMENSIONS[1] - this.height) {
                this.position.y = mouseY + this.offset.y
            }
            this.panel_div.style("top", this.position.y + "px").style("left", this.position.x + "px")
        }

        if(this.within_dragpad()) {
            this.panel_div.style("box-shadow", "inset 0 0 0 2.5px var(--ui-accent)")
        } else {
            this.panel_div.style("box-shadow", "none")
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
        return (mouseX > this.position.x && mouseY > this.position.y && mouseX < this.position.x + this.width && mouseY < this.position.y + 20)
    }

    static default() {
        return new Panel(createVector(30, 128), 150, 150, "Default Panel")
    }

    static default_at(position) {
        return new Panel(position, 150, 150, "Default Panel")
    }

    create_title_bar() {
        let bar = createDiv("")
        bar.addClass("PanelTitleBar")

        let close_button = IconButton.Close(20, () => {this.panel_div.remove(); UI.panels.splice(UI.panels.indexOf(this), 1)})
        bar.child(close_button.create())

        let title = createP(this.title)
        title.addClass("PanelTitle").addClass("nohighlight-text")
        bar.child(title)

        return bar
    }
}