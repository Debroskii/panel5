class ContextMenuAction {
    constructor(name, action, shortcut = "") {
        this.name = name
        this.action = action
        this.shortcut = shortcut
    }

    elt() {
        let button = createButton("").class("ContextMenuAction").html(`<span class="ContextMenuActionLabel">${this.name}</span><span class="ContextMenuActionShortcut">${this.shortcut}</span>`)
        button.mousePressed(this.action)
        return button.elt
    }
}