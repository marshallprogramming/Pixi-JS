const Application = PIXI.Application;
const Graphic = PIXI.Graphics;
const Text = PIXI.Text;

const width = 600,
  height = 400;

const app = new Application({
  width,
  height,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = 0xaaaaaa;

document.querySelector("#container").appendChild(app.view);

const rectangle = new Graphic();
rectangle
  .lineStyle(2, 0xffea00, 1)
  .beginFill(0xaa33bb)
  .drawRect(200, 200, 10, 12)
  .endFill();

const poly = new Graphic();
poly
  .beginFill(0xff66ff)
  .lineStyle(2, 0xffea00, 1)
  .drawPolygon([60, 300, 80, 15, 90, 30, 40, 40])
  .endFill();

const circle = new Graphic();
circle.beginFill(0x22aacc).drawCircle(440, 200, 80).endFill();

const line = new Graphic();
line.lineStyle(5, 0xffea00, 1).moveTo(150, 10).lineTo(150, 80);

// const torus = new Graphic();
// torus
//   .beginFill(0x22aacc)
//   .drawTorus(10, 70, 80, 100, 0, Math.PI / 2)
//   .endFill();

// const star = new Graphic();
// star.beginFill(0xadadad).drawStar(400, 70, 30, 80).endFill();

const style = new PIXI.TextStyle({
  fontFamily: "Montserrat",
  fontSize: 48,
  fill: "deepskyblue",
  stroke: "#ffffff",
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: "#000000",
});

app.stage.addChild(rectangle);
app.stage.addChild(poly);
app.stage.addChild(circle);
app.stage.addChild(line);
// app.stage.addChild(torus);
// app.stage.addChild(star);

// ------------ Actual Game ----------- //

const belfordRight = PIXI.Sprite.from("../images/Belford Right.jpg");
const belfordSmile = PIXI.Sprite.from("../images/Belford Smile.jpg");
const bottle = PIXI.Sprite.from("../images/bottle.jpg");

belfordRight.scale.x = 0.1;
belfordRight.scale.y = 0.1;
belfordRight.anchor.set(0.5);
belfordRight.x = 60;
belfordRight.y = 0;

app.stage.interactive = true;
app.stage.on("pointermove", movePlayer);

function movePlayer(e) {
  let pos = e.data.global;

  belfordRight.y = pos.y;
}

app.ticker.add((delta) => loop(delta));

bottle.x = width;
bottle.y = Math.min(Math.round(Math.random() * height), height - 20);
bottle.scale.x = 0.2;
bottle.scale.y = 0.2;

let speed = 3;
let bottleCount = 5;

function loop(delta) {
  if (bottle.x > 10) {
    bottle.x = bottle.x - 1;
  } else if (bottleCount > 1) {
    bottle.x = width;
    bottleCount--;
    bottle.y = Math.min(Math.round(Math.random() * height), height - 10);
    app.stage.removeChild(belfordSmile);
    text.text = "Belford needs " + bottleCount + " milk";
  } else {
    speed++;
    bottleCount = 5 + speed;
    app.ticker.stop();
    bottle.y = Math.min(Math.round(Math.random() * height), height - 10);
    app.stage.addChild(belfordSmile);
    app.stage.removeChild(text);
    app.stage.addChild(text);
    text.text = "Good Job!";
    setTimeout(function () {
      app.ticker.start();
    }, 1500);
  }
}

belfordSmile.scale.x = 0.6;
belfordSmile.scale.y = 0.6;
belfordSmile.x = 100;

const text = new Text("Belford needs " + bottleCount + " milk", style);
text.x = 200;
text.y = 100;

text.style.wordWrap = true;
text.style.wordWrapWidth = 150;
text.style.align = "center";

app.stage.addChild(text);

app.stage.addChild(bottle);
app.stage.addChild(belfordRight);
