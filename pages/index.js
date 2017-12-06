export default class extends React.Component {
  render() {
    return (
      <div>
        {
          "_".repeat(2).split("").map((_, i) => {
            return (
              <div key={i}>
                <a href={`page${i}`}>page{i}</a>
              </div>
            );
          })
        }
      </div>
    );
  }
}