const {
  observe,
  addReactionOnStateChange,
  removeReaction
} = require('../observe');

// SIMPLE EXAMPLE

// initialize state
const state = {};
state.firstName = 'Kent';
state.lastName = 'Warren';

// observe state
observe(state);

// set up first reaction
const reaction1 = () => console.log('REACTION 1');
addReactionOnStateChange({
  reaction: reaction1,
  state,
  property: 'firstName'
});
// change state to get a reaction
state.firstName = 'Kenneth';

console.log('========================');

// set up second and third reactions
const reaction2 = () => console.log('REACTION 2');
const reaction3 = () => console.log('REACTION 3');
addReactionOnStateChange({
  reaction: [reaction2, reaction3],
  state,
  property: 'firstName'
});
// change state to get all three reactions
state.firstName = 'Keith';

console.log('========================');

// remove second reaction
removeReaction({
  reaction: reaction2,
  state,
  property: 'firstName'
});
// change state to get first and third reactions
state.firstName = 'Kevin';
