const mouseHandler = {
  handlers: [],
  keyMap: {},
  setMap(key, value) {
    this.keyMap[key] = value;
  },
  handle() {
    Object.keys(this.keyMap).forEach((key) => {
      const value = this.keyMap[key];
      if (value) {
        this.handlers.forEach((handler) => {
          handler(value);
        });
      }
    });
  },
  addHandler(func) {
    this.handlers.push(func);
  },
};

export default mouseHandler;
