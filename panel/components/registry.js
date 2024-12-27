class ValueRegistry {
    constructor() {
        this.registry = {}
        this.element = createDiv("").addClass("Registry")
    }

    pack() {
        for (const key in this.registry) {
            let entry = this.registry[key]
            let entry_element = createDiv("").addClass("RegistryEntry").child(createP(key).addClass("RegisteredValueLabel"))
            switch(entry.type) {
                case RegistryEntryType.NUMBER:
                    entry_element.child(createInput(entry.value).addClass("RegisteredNumberInput").attribute("type", "number"))
                case RegistryEntryType.BOOLEAN:
                    entry_element.child(createCheckbox("", entry.value).addClass("RegisteredBooleanInput"))
                case RegistryEntryType.COLOR:
                    entry_element.child(createColorPicker(entry.value).addClass("RegisteredColorInput"))
            }
            entry["element"] = entry_element
            print(entry)
            this.element.child(entry_element)
        }
        return this.element
    }

    register(key, value, type) {
        this.registry[key] = {value: value, type: type}
    }

    unregister(key) {
        delete this.registry[key]
    }

    get(key) {
        let entry = this.registry[key]
        if(entry["element"] != null) {
            switch(entry.type) {
                case RegistryEntryType.NUMBER:
                    return entry["element"].child()[1].value
                case RegistryEntryType.BOOLEAN:
                    return entry["element"].child()[1].checked()
                case RegistryEntryType.COLOR:
                    return entry["element"].child()[1].color()
            }
        }
    }

    update() {
        for(const key in this.registry) {
            this.registry[key][value] = this.get(key)
        }
    }
}

RegistryEntryType = Object.freeze({
    NUMBER: 0,
    BOOLEAN: 1,
    COLOR: 2,
})