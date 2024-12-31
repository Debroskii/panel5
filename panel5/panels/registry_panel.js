class RegistryPanel extends Panel {
    constructor(registry, position, dimensions, title = registry.id) {
        super(registry.id, position, dimensions, title)
        
        GlobalRegistry.getRegistry(this.id).entries.forEach(entry => {
            this.element.child(createRegistryEntryDisplay(this.id, entry))
        })
    }

    update() {
        GlobalRegistry.getRegistry(this.id).syncronizeWithDOM()
        super.update()
    }
}