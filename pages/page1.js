import Canvas1 from "../components/Canvas1";

export default class extends React.Component {
  render() {
    return (
      <div>
        <Canvas1 />
        <style jsx>{`
          div {
            margin: 8px;
          }
        `}</style>
      </div>
    );
  }
}