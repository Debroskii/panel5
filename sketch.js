let DIMENSIONS

let panel
var radius = 100

function setup() {
  DIMENSIONS = [windowWidth, windowHeight]
  createCanvas(DIMENSIONS[0], DIMENSIONS[1]);
  UI.create()

  panel = Panel.default_at(createVector(DIMENSIONS[0] * 0.75, DIMENSIONS[1] * 0.75))
  panel.registry.register("radius", radius, RegistryEntryType.NUMBER)

  UI.panels.push(panel)
}

function draw() {
  background(241);
  UI.update();

  radius = panel.registry.get("radius")
  noStroke()
  ellipse(500, 300, radius, radius)
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