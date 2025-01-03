class KeybindRegistry {
    static entries = [];

    static addEntry(keys, action) {
        this.entries.push({keys: keys, action: action});
    }

    static loop() {
        for(let keybind of KeybindRegistry.entries) {
            let allPressed = true;
            for(let key of keybind.keys) {
                allPressed = allPressed && keyIsDown(key)
            }

            if(allPressed) {
                keybind.action();
            }
        }
    }
}