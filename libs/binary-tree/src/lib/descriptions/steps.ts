export const insertStepsBinaryTreeSearch = [
  'Step 1: Check the first node',
  'Step 2: If x is bigger than value at this position, go to right node and go back to step 1',
  'Step 3: If x is less than value at this position, go to left node and go back to step 1',
  'Step 4: If the node does not exist, add new node at this position with value x',
  'Step 5: If x exists in the binary tree, throw an error - The element exists in the binary tree!'
];

export const searchStepsBinaryTreeSearch = [
  'Step 1: Check the first node',
  'Step 2: If it is not x and bigger than value at this position, go to right node and go back to step 1',
  'Step 3: If it is not x and less than value at this position, go to left node and go back to step 1',
  'Step 4: If the node does not exist, throw an error - Not found in the array!',
  'Step 5: If it is x, then return position'
];

export const removeStepsBinaryTreeSearch = [
  'Step 1: Check the first node',
  'Step 2: If it is not x and bigger than value at this position, go to right node and go back to step 1',
  'Step 3: If it is not x and less than value at this position, go to left node and go back to step 1',
  'Step 4: If the node does not exist, throw an error - Not found in the array!',
  'Step 5: If it is x, then remove the node',
  'Step 6: If node has one internal child, promote it upwards to replace removed node',
  'Step 7: If node has two children locate the predecessor, go back to step 6'
];

export const insertBinaryTreeSearch = 'Insert';

export const searchBinaryTreeSearch = 'Search';

export const removeBinaryTreeSearch = 'Remove';
