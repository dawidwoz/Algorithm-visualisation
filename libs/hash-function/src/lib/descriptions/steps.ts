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

export const insertHashFunction = 'Insert';

export const searchHashFunction = 'Search';

export const removeHashFunction = 'Remove';
