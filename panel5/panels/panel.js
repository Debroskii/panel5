class Panel extends Draggable {
    constructor(id, position, dimensions, title = id, _static = false, _show_title = true) {
        super(position, createVector(dimensions.x, 20), _static)
        this.id = id,
        this.dimensions = dimensions
        this.locked = _static
        this._static = _static
        this._show_title = _show_title

        // DOM Element
        this.element = createDiv("").id(this.id).addClass("Panel")
        this.element.style("width", this.dimensions.x + "px").style("height", this.dimensions.y + "px")
        if(this._show_title) {
            this.element.child(createTitleBar(title, [createIconButton("assets/icon/close.png", () => {
                this.removeFromNoZone()
                this.element.style("opacity", "0")
                setTimeout(() => {
                    this.element.remove()
                    UI.removePanel(this)
                }, 100)
            }, 20)], [createIconButton("assets/icon/open_lock.png", () => {this.toggleLock()}, 20)])) 
        }
        
    }

    getDOMElement() {
        return this.element
    }

    setPosition(x, y) {
        for(let row = 0; row < ceil(this.dimensions.y / UI.panel5Config.get("grid_unit_size").value); row++) {
            for(let col = 0; col < ceil(this.dimensions.x / UI.panel5Config.get("grid_unit_size").value); col++) {
                UI.panelNoZone[row + this.position.y / UI.panel5Config.get("grid_unit_size").value][col + this.position.x / UI.panel5Config.get("grid_unit_size").value] = false
            }
        }
        this.position.set(x, y)
        this.update()
    }

    update() {
        super.update(this.dimensions.y - 20)
        this.element.style("top", this.position.y + "px").style("left", this.position.x + "px")
        this.element.style("box-shadow", "none")
        document.getElementById(this.id).style.setProperty("border", "var(--panel-border)")
        if(!this.locked) document.getElementById(this.id).children[0].style.setProperty("border-bottom", "var(--panel-border)")
        if(this._show_title) document.getElementById(this.id).children[0].style.setProperty("cursor", this._static ? "arrow" : "move")

        if(this._static) return
        for(let row = 0; row < ceil(this.dimensions.y / UI.panel5Config.get("grid_unit_size").value); row++) {
            for(let col = 0; col < ceil(this.dimensions.x / UI.panel5Config.get("grid_unit_size").value); col++) {
                UI.panelNoZone[row + ceil(this.position.y / UI.panel5Config.get("grid_unit_size").value)][col + ceil(this.position.x / UI.panel5Config.get("grid_unit_size").value)] = true
            }
        }
    }

    updateStyle() {
        if(this.draggable() && !this._static) {
            document.getElementById(this.id).style.setProperty("border", "var(--panel-hover-border)")
            if(!this.locked) document.getElementById(this.id).children[0].style.setProperty("border-bottom", "var(--panel-hover-border)")
            if(mouseX < this.position.x + 20) {
                this.element.style("box-shadow", "var(--panel-close-outline)")
            } else if(mouseX > this.position.x + this.size.x - 20) {
                this.element.style("box-shadow", "var(--panel-lock-outline)")
            }
        }

        if(this.dragging && this.locked && !this._static) {
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

    pressed() {
        super.pressed()
        if(this.draggable()) {
            document.getElementById(this.id).setAttribute("data-focused", true)
            return true
        } else {
            return false
        }
    }

    removeFromNoZone() {
        if(this._static) return
        for(let row = 0; row < ceil(this.dimensions.y / UI.panel5Config.get("grid_unit_size").value); row++) {
            for(let col = 0; col < ceil(this.dimensions.x / UI.panel5Config.get("grid_unit_size").value); col++) {
                UI.panelNoZone[row + this.position.y / UI.panel5Config.get("grid_unit_size").value][col + this.position.x / UI.panel5Config.get("grid_unit_size").value] = false
            }
        }
    }

    released() {
        document.getElementById(this.id).setAttribute("data-focused", false)
        super.released()
    }

    overButtons() {
        if(this.draggable()) {
            return (mouseX < this.position.x + 20 || mouseX > this.position.x + this.size.x - 20)
        }
    }
}