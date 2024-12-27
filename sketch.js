let DIMENSIONS

let testRegistry

function setup() {
  DIMENSIONS = [windowWidth, windowHeight]
  createCanvas(DIMENSIONS[0], DIMENSIONS[1]);

  testRegistry = new Registry("testreg")
  testRegistry.addNumber("x", 500, "Circle X Position", true)
  testRegistry.addNumber("y", 500, "Circle Y Position", true)
  testRegistry.addBoolean("show", true, "Show Circle", true)
  testRegistry.addColor("fill_color", color(255, 255, 255, 10), "Circle Color", true)

  GlobalRegistry.addRegistry(testRegistry)

  let panel = new Panel(createVector(500, 500), 200, 300, "Test Panel", testRegistry)

  UI.panels.push(panel)
  UI.create()
}

function draw() {
  background(241);
  UI.update();

  noStroke()
  if(testRegistry.get("show")) {
    fill(testRegistry.get("fill_color"))
  } else {
    fill(0, 0)
  }
  ellipse(testRegistry.get("x"), testRegistry.get("y"), 100, 100)
}

function keyPressed() {
  if(key === 't') {
    UI.panels.push(Panel.default_at(createVector(mouseX, mouseY)))
  }
}

function mousePressed() {
  for(const panel of UI.panels) {
    panel.pressed()
  }
}

function mouseReleased() {
  for(const panel of UI.panels) {
    panel.released()
  }
}