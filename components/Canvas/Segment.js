import Mathtool from "./Mathtool";
import mouseHandler from "./mouseHandler"

const PIN_R = 2;
const PIN_MARGIN = 10;

class Segment {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.degree = 20;

    // init pins
    const pos = [
      this.getLeftPinPos(),
      this.getRightPinPos(),
    ];

    this.pins = [0, 1].map((n) => {
      return new Pin(pos[n][0], pos[n][1], PIN_R, this);
    });

    mouseHandler.addHandler((v) => {
      const [mouseX, mouseY] = v;
      const {x, y, height} = this;
      const dx = mouseX - (x + PIN_MARGIN);
      const dy = mouseY - (y + height / 2);
      const radian = Math.atan2(dy, dx);

      this.degree = Mathtool.radToDeg(radian);
    });
  }

  getLeftPinPos() {
    const {x, y, height} = this;
    return [x + PIN_MARGIN, y + height / 2];
  }

  getRightPinPos() {
    const {x, y, width, height} = this;
    return [x + width - PIN_MARGIN, y + height / 2];
  }

  pos() {
    const {x, y} = this;
    return [x, y];
  }

  update(ctx) {
    // render
    ctx.save();
    const {x, y, width, height, degree} = this;
    const [tx, ty] = this.getLeftPinPos();

    ctx.translate(tx, ty);
    ctx.rotate(Mathtool.degToRad(degree));
    ctx.translate(-tx, -ty);
    
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.restore();

    this.pins.forEach((p) => {
      p.update(ctx);
    });
  }
};

class Pin {
  constructor(x, y, r, segment) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.segment = segment;
  }

  update(ctx) {
    // render
    ctx.save();
    const {x, y, r, segment} = this;
    const [tx, ty] = segment.getLeftPinPos();

    ctx.translate(tx, ty);
    ctx.rotate(Mathtool.degToRad(segment.degree));
    ctx.translate(-tx, -ty);

    ctx.beginPath();
    ctx.arc(x, y, r*2, 0, 360 * Math.PI / 180);
    ctx.stroke();

    ctx.restore();
  }
}

export default Segment;
