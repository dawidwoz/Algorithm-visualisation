export const pushStepsArray = [
  'Step 1: Check if position top is null',
  'Step 2: It is free, insert element and move top pointer',
  'Step 3: It is not free, throw an error'
];

export const peekStepsArray = [
  'Step 1: Check the last element',
  'Step 2: If it is not null, return element',
  'Step 3: If it is null, go to the previous element. If there is no previous element, the stack is empty'
];

export const popStepsArray = [
  'Step 1: Check the last element',
  'Step 2: If it is not null, return element, set it to null and move top pointer to the previous element',
  'Step 3: If it is null, go to the previous element. If there is no previous element, the stack is empty'
];
