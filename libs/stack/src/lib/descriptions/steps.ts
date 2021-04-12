export const pushStepsArray = [
  'Step 1: Check if top is a valid index by comparing the value of top with the length of the array',
  'Step 2: If it is valid, add element at position top and increment top',
  'Step 3: It is not valid, throw an error - Stack is full!'
];

export const peekStepsArray = [
  'Step 1: Check if stack is empty (the initial stack, we have top = 0)',
  'Step 2: It is empty, throw an error - Stack is empty!',
  'Step 3: If it is not empty, return top element (at position top-1)'
];

export const popStepsArray = [
  'Step 1: Check if stack is empty (the initial stack, we have top = 0)',
  'Step 2: It is empty, throw an error - Stack is empty!',
  'Step 3: If it is not empty, return and remove top element (at position top-1)',
  'Step 4: Decrement top'
];

export const pushStepsList = ['Step 1: Add element at the front of the list'];

export const peekStepsList = [
  'Step 1: Check the first element of the list',
  'Step 2: If it is a NULL, throw an error - Stack is empty!',
  'Step 3: If it is not a NULL, return first element of the list'
];

export const popStepsList = [
  'Step 1: Check the first element of the list',
  'Step 2: If it is a NULL, throw an error - Stack is empty!',
  'Step 3: If it is not a NULL, return and remove first element of the list'
];
