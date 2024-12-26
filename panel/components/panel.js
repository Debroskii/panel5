class Panel {
    constructor(children, position, width, height) {
        this.children = children
        this.position = position
        this.offset = createVector(0, 0)
        this.width = width
        this.height = min(height, 550)
        this.dragging = false
    }

    update() {
        if(this.dragging) {
            this.position.x = mouseX + this.offset.x
            this.position.y = mouseY + this.offset.y
        }
    }

    draw() {
        
    }

    within_dragpad() {
        return (mouseX > this.position.x && mouseY > this.position.y && mouseX < this.position.x + width && mouseY < 20)
    }
}