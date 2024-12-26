const DIMENSIONS = [1450, 780]

function setup() {
  createCanvas(DIMENSIONS[0], DIMENSIONS[1]);
  UI.create()
}

function draw() {
  background(220);
  UI.update();
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