class GlobalRegistry {
    // A library of registries will be stored here
    static registries = [];

    // Add a registry to the library
    static addRegistry(registry) {
        this.registries.push(registry);
    }

    // Get a registry from the library
    static getRegistry(id) {
        return this.registries.find(registry => registry.id === id);
    }
}