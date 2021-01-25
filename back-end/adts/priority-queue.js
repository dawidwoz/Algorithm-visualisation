class HeapArrayPriorityQueue {
    constructor(size) {
        this.datastructure = new HeapArray(size);
    }

    insert(elementValue) {
        if (this.datastructure.isFull()) {
            this.datastructure.expand();
        }

        // Insert at end
        this.datastructure.content[this.datastructure.getNumElements()].setValue(elementValue);
        this.datastructure.numElements++;

        let j = this.datastructure.getNumElements() - 1;

        while (j > 0) {
            let p = HeapArray.parent(j);

            // If there is no need to swap this child and parent, then break (finished)
            if (this.datastructure.content[j].getValue() >= this.datastructure.content[p].getValue()) {
                break;
            }

            this.datastructure.swap(j, p); // Swap elements
            j = p;
        }

        return {value: elementValue, index: this.datastructure.getNumElements() - 1};
    }

    removeMin() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        // Store min value before anything changes, to return at end
        let min = this.datastructure.getElement(0).getValue();

        // Swap root with element at end
        this.datastructure.swap(0, this.datastructure.numElements - 1);

        // Set element at end (min, to remove) to null
        this.datastructure.setElementValue(this.datastructure.numElements - 1, null);
        this.datastructure.numElements--;

        let j = 0;

        // Follow the path of smaller children to the bottom
        while (this.datastructure.hasLeft(j)) {
            let right = this.datastructure.getElement(HeapArray.right(j));
            let left = this.datastructure.getElement(HeapArray.left(j));

            if (this.datastructure.hasRight(j) && right.getValue() < left.getValue()) {
                j = HeapArray.right(j);
            } else {
                j = HeapArray.left(j);
            }
        }

        // Climb back up the tree to find the point at which to start swapping
        while ((j > 0) && (this.datastructure.getElement(0).getValue() <= this.datastructure.getElement(j).getValue())) {
            j = HeapArray.parent(j); // Move up
        }

        // Now at the correct position, swap
        while (j > 0) {
            this.datastructure.swap(0, j);
            j = HeapArray.parent(j);
        }

        return {value: min, index: this.datastructure.numElements};
    }

    getMin() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getElement(0).getValue();
    }
}