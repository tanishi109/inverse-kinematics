import React from "react";
import Head from "next/head";

const MathTool = {
};

class Stage {
  constructor(width, height, ctx, entities = []) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.entities = entities;
  }

  update() {
    const {width, height, ctx, entities} = this;
    ctx.clearRect(0, 0, width, height);

    entities.forEach((ent) => {
      ent.update(ctx);
    });
  }
}

class Segment {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    // init pins
    // this.fingers_ = fingersKey.map((key, i) => {
    //   return new Finger(this, key, i * 30);
    // });
  }

  update(ctx) {
    // render
    ctx.beginPath();
    const {x, y, width, height} = this;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }
};

const initStage = () => {
  const canvas = document.getElementById("stage");
  const ctx = canvas.getContext("2d");
  const width = document.getElementById("wrapper").clientWidth;
  const height = document.getElementById("wrapper").clientHeight;

  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  const hand1 = new Segment(80, 80, 30, 100);
  const entities = [hand1];

  return new Stage(width, height, ctx, entities);
};

const updateStage = (stage) => {

  stage.update();

  requestAnimationFrame(() => {
    updateStage(stage);
  });
};

export default class extends React.Component {
  componentDidMount() {
    const stage = initStage();
    updateStage(stage);
  }

  render() {
    return (
      <div id="wrapper" className="wrapper">
        {this.head()}
        <canvas id="stage" className="stage" />
        <style jsx>{`
          div {
            width: calc(100vw - 50px);
            height: 100vh;
            margin: 25px;
          }
          canvas {
            width: calc(100vw - 25px - 25px);
            height: calc(100vh - 25px - 25px);
            border: 1px solid #000;
            border-radius: 2px;
          }
        `}</style>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }

  head() {
    return (
      <Head>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.5/dat.gui.min.js"></script>
      </Head>
    );
  }
}