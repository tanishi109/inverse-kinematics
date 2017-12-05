import Mathtool from "./Mathtool";

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
    const cx = [
      x + PIN_MARGIN,
      x + w - PIN_MARGIN,
    ];
    const cy = y + h / 2;

    this.pins = [0, 1].map((n) => {
      return new Pin(cx[n], cy, PIN_R, this);
    });
  }

  pos() {
    const {x, y} = this;
    return [x, y];
  }

  update(ctx) {
    // render
    ctx.save();
    const {x, y, width, height, degree} = this;

    ctx.rotate(Mathtool.degToRad(degree));

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

    ctx.rotate(Mathtool.degToRad(segment.degree));

    ctx.beginPath();
    ctx.arc(x, y, r*2, 0, 360 * Math.PI / 180);
    ctx.stroke();

    ctx.restore();
  }
}

export default Segment;
