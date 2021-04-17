export const peekStepsArray = [
  'Step 1: Check if queue is empty (tail and head position is the same; element at that position is NULL)',
  'Step 2: It is empty, throw an error - Queue is empty!',
  'Step 3: If it is not empty, return head element (at position head)'
];

export const dequeueStepsArray = [
  'Step 1: Check if queue is empty (tail and head position is the same; element at that position is NULL)',
  'Step 2: It is empty, throw an error - Queue is empty!',
  'Step 3: If it is not empty, return and remove head element (at position head)',
  'Step 4: Increment head if bigger than the size of array, move on the first position'
];

export const enqueueStepsArray = [
  'Step 1: Check if there is room in the queue (element at the position tail is NULL)',
  'Step 2: If so, add element and increment tail if bigger than the size of array, move on the first position',
  'Step 3: If not, throw an error - Queue is full!'
];

export const enqueueStepsList = ['Step 1: Add element at the tail of the list'];

export const peekStepsList = [
  'Step 1: Check the first element of the list',
  'Step 2: If it is a NULL, throw an error - Queue is empty!',
  'Step 3: If it is not a NULL, return first element of the list'
];

export const dequeueStepsList = [
  'Step 1: Check the first element of the list',
  'Step 2: If it is a NULL, throw an error - Stack is empty!',
  'Step 3: If it is not a NULL, return and remove first element of the list'
];

export const peekTitle = 'Peek';

export const enqueueTitle = 'Enqueue';

export const dequeueTitle = 'Dequeue';
