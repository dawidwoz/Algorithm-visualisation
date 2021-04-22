export const insertHashFunctionLinearProbingSteps = [
  'Step 1: Calculate f(x)',
  'Step 2: If position f(x) is occupied and not x, try f[(x + 1) mod N], f[(x + 2) mod N] and so on until empty (NULL, Ø) slot found.',
  'Step 3: If position f(x) is occupied and x, throw an error - Element already in the array!',
  'Step 4: If actual position is an initial position, throw an error - Array is full!'
];

export const searchHashFunctionLinearProbingSteps = [
  'Step 1: Calculate f(x)',
  'Step 2: If an element at position f(x) is not null or Ø, check if it contains x',
  'Step 3: If so, return an position',
  'Step 4: If not, try f[(x + 1) mod N], f[(x + 2) mod N] and so on until empty (NULL, Ø) slot found.',
  'Step 5: If element is null or Ø, throw an error - Not found in the array!'
];

export const removeHashFunctionLinearProbingSteps = [
  'Step 1: Calculate f(x)',
  'Step 2: If an element at position f(x) is not null or Ø, check if it contains x',
  'Step 3: If so, return an position and put Ø at that position',
  'Step 4: If not, try f[(x + 1) mod N], f[(x + 2) mod N] and so on until empty (NULL, Ø) slot found.',
  'Step 5: If element is null or Ø, throw an error - Not found in the array!'
];

export const insertHashFunctionSeparateChainingSteps = [
  'Step 1: Calculate f(x)',
  'Step 2: Go to the first element at position f(x)',
  'Step 3: If the f(x) does not contain x, go to the next element. Otherwise, throw an error - Element already in the array!',
  'Step 4: Add an element at the end of the list at position f(x)'
];

export const searchHashFunctionSeparateChainingSteps = [
  'Step 1: Calculate f(x)',
  'Step 2: Check if a first element of the list at position f(x) contains x',
  'Step 3: If so, return an element',
  'Step 4: If not, try next element until the end of the list.',
  'Step 5: If the end of the list is reached, throw an error - Not found in the array!'
];

export const removeHashFunctionSeparateChainingSteps = [
  'Step 1: Calculate f(x)',
  'Step 2: Check if a first element of the list at position f(x) contains x',
  'Step 3: If so, return an element and remove from the list',
  'Step 4: If not, try next element until the end of the list.',
  'Step 5: If the end of the list is reached, throw an error - Not found in the array!'
];

export const insertHashFunction = 'Insert';

export const searchHashFunction = 'Search';

export const removeHashFunction = 'Remove';
