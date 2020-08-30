// define dependency system
class Dep {
  constructor() {
    this.deps = new Set();
  }

  depend() {
    isAddingDependency.forEach(dep => this.deps.add(dep));
  }

  notify() {
    this.deps.forEach(dep => dep());
  }

  remove() {
    isRemovingDependency.forEach(dep => this.deps.delete(dep));
  }
}

// define observation system
const observe = obj => {
  Object.keys(obj).forEach(key => {
    let state = obj[key];
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        if (isAddingDependency) {
          dep.depend();
        }
        if (isRemovingDependency) {
          dep.remove();
        }
        return state;
      },
      set(newState) {
        if (newState !== state) {
          state = newState;
          dep.notify();
        }
      }
    });
  });
};

// listen
let isAddingDependency = false;
const listen = (whatToListenTo, whatToDo) => {
  isAddingDependency = whatToDo;
  whatToListenTo();
  isAddingDependency = false;
};

// add reaction
const addReactionOnStateChange = options => {
  const { reaction, state, property } = options;
  if (Array.isArray(reaction)) {
    listen(() => state[property], reaction);
  } else {
    listen(() => state[property], [reaction]);
  }
};

// unlisten
let isRemovingDependency = false;
const unlisten = (whatToUnlistenTo, whatToUnlisten) => {
  isRemovingDependency = whatToUnlisten;
  whatToUnlistenTo();
  isRemovingDependency = false;
};

// remove reaction
const removeReaction = options => {
  const { reaction, state, property } = options;
  if (Array.isArray(reaction)) {
    unlisten(() => state[property], reaction);
  } else {
    unlisten(() => state[property], [reaction]);
  }
};

module.exports = {
  observe,
  addReactionOnStateChange
};
