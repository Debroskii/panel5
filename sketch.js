let test_registry

function setup() {
  document.addEventListener('contextmenu', function(e) {
    alert("You've tried to open context menu"); //here you draw your own menu
    e.preventDefault();
  }, false);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  test_registry = new Registry("test_registry")
  test_registry.registerString("str", "hehehe")
  test_registry.registerNumber("num", 0.0)
  test_registry.registerBoolean("bool", false)
  test_registry.registerColor("color", color(255, 0, 255))
  test_registry.registerDropdown("dropdown", "a", ["a", "b", "c"], "Yes...")


  GlobalRegistry.addRegistry(test_registry)

  UI.initialize()
  UI.addPanel(new RegistryPanel(test_registry, createVector(400, 400), createVector(150, 250), "TEST PANEL"))
  UI.addPanel(new Panel("r", createVector(100, 100), createVector(200, 200), "ANOTHER TEST PANEL"))
}

function draw() {
  background(0);
  UI.updatePanels();
}

function mousePressed() {
  UI.handleMousePress()
}

function mouseReleased() {
  UI.handleMouseRelease()
}