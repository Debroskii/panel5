let test_registry

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  test_registry = new Registry("test_registry")
  test_registry.registerString("str", "hehehe")
  test_registry.registerNumber("num", 0.0)
  test_registry.registerBoolean("bool", false)
  test_registry.registerColor("color", color(255, 0, 255))
  test_registry.registerDropdown("dropdown", "a", ["a", "b", "c"], "Yes...")

  GlobalRegistry.addRegistry(test_registry)

  KeybindRegistry.addEntry([65, 16], UI.autoAlignAllPanels)
  console.log(KeybindRegistry.entries)

  UI.initialize()
}

function draw() {
  background(0);
  UI.updatePanels();
  KeybindRegistry.loop();
}

function mousePressed() {
  UI.handleMousePress()
}

function mouseReleased() {
  UI.handleMouseRelease()
}