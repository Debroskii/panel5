class Panel extends Draggable {
    constructor(id, position, dimensions, title = id) {
        super(position, createVector(dimensions.x, 20))
        this.id = id,
        this.dimensions = dimensions

        // DOM Element
        this.element = createDiv("").id(this.id).addClass("Panel")
        this.element.style("width", this.dimensions.x + "px").style("height", this.dimensions.y + "px")
        this.element.child(createTitleBar(title, [createIconButton("assets/icon/close.png", () => {
            this.element.style("opacity", 0)
            setTimeout(() => {
                this.element.remove()
                UI.removePanel(this)
            }, 100)
        }, 20)], [createIconButton("assets/icon/open_lock.png", () => {this.toggleLock()}, 20)]))
    }

    getDOMElement() {
        return this.element
    }

    update() {
        super.update(this.dimensions.y - 20)
        this.element.style("top", this.position.y + "px").style("left", this.position.x + "px")
        this.element.style("box-shadow", "none")
        document.documentElement.style.setProperty("--border-color", "rgba(255, 255, 255, 0.25)")
        
        if(this.draggable()) {
            document.documentElement.style.setProperty("--border-color", "rgba(255, 255, 255, 0.75)")
            if(mouseX < this.position.x + 20) {
                this.element.style("box-shadow", "var(--panel-close-outline)")
            } else if(mouseX > this.position.x + this.size.x - 20) {
                this.element.style("box-shadow", "var(--panel-lock-outline)")
            }
        }

        if(this.dragging && this.locked) {
            this.element.style("box-shadow", "var(--panel-lock-outline)")
        } 
    }

    toggleLock() {
        this.locked = !this.locked
        let titlebar = document.getElementById(this.id).children[0]
        let icon = titlebar.children[2].children[0].children[0]
        titlebar.style.setProperty("border", this.locked ? "1px solid var(--accent-color" : "none")
        titlebar.style.setProperty("border-bottom", this.locked ? "1px solid var(--accent-color" : "var(--panel-border)")
        icon.src = this.locked ? "assets/icon/closed_lock.png" : "assets/icon/open_lock.png"
    }
}