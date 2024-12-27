let DIMENSIONS

function setup() {
  DIMENSIONS = [windowWidth, windowHeight]
  createCanvas(DIMENSIONS[0], DIMENSIONS[1]);
  UI.create()
}

function draw() {
  background(241);
  UI.update();

  noStroke()
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