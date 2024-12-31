class Registry {
    constructor(id) {
        this.id = id
        this.entries = []
    }

    // Registers a string entry
    registerString(key, value, label = key) {
        this.entries.push({
            key: key,
            value: value,
            label: label,
            type: EntryType.STRING
        })
    }

    // Registers a number entry
    registerNumber(key, value, label = key) {
        this.entries.push({
            key: key,
            value: value,
            label: label,
            type: EntryType.NUMBER
        })
    }

    // Registers a boolean entry
    registerBoolean(key, value, label = key) {
        this.entries.push({
            key: key,
            value: value,
            label: label,
            type: EntryType.BOOLEAN
        })
    }

    // Registers a color entry
    registerColor(key, value, label = key) {
        this.entries.push({
            key: key,
            value: value,
            label: label,
            type: EntryType.COLOR
        })
    }

    // Registers a dropdown entry
    registerDropdown(key, value, options, label = key) {
        this.entries.push({
            key: key,
            value: value,
            options: options,
            label: label,
            type: EntryType.DROPDOWN
        })
    }

    // Returns the entry with the given key
    getEntry(key) {
        return this.entries.find(entry => entry.key === key)
    }

    // Syncronizes each entry with its corresponding DOM element
    syncronizeWithDOM() {
        this.entries.forEach(entry => {
            let element = document.getElementById(`${this.id}-${entry.key}`)
            if (element) {
                switch (entry.type) {
                    case EntryType.STRING:
                        entry.value = element.value
                        break
                    case EntryType.NUMBER:
                        entry.value = parseFloat(element.value)
                        break
                    case EntryType.BOOLEAN:
                        entry.value = element.checked
                        break
                    case EntryType.COLOR:
                        entry.value = color(element.value)
                        break
                    case EntryType.DROPDOWN:
                        entry.value = element.value
                        break
                }
            }
        })
    }
}

// Entry types
const EntryType = Object.freeze({
    STRING: 1,
    NUMBER: 2,
    BOOLEAN: 3,
    COLOR: 4,
    DROPDOWN: 5
})