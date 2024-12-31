class Draggable {
    constructor(position, size) {
        this.position = position
        this.size = size
        
        this.dragging = false
        this.locked = false
        this.offset = createVector(0, 0)
    }

    update(additional_height = 0) {
        if(this.dragging && !this.locked) {
            if(this.withinX()) {
                this.position.x = mouseX + this.offset.x
            }
            if(this.withinY(additional_height)) {
                this.position.y = mouseY + this.offset.y
            }
        }
    }

    pressed() {
        if(this.draggable()) {
            this.dragging = true
            this.offset.set(this.position.x - mouseX, this.position.y - mouseY)
        }
    }

    released() {
        this.dragging = false
    }

    draggable() {
        return (mouseX > this.position.x && mouseX < this.position.x + this.size.x && mouseY > this.position.y && mouseY < this.position.y + this.size.y)
    }

    withinX() {
        return (mouseX + this.offset.x < windowWidth - this.size.x && mouseX + this.offset.x > 0)
    }

    withinY(additional_height) {
        return (mouseY + this.offset.y < windowHeight - this.size.y - additional_height && mouseY + this.offset.y > 0)
    }
}