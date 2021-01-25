class CircularArrayQueue {
    constructor(size) {
        this.datastructure = new CircularArray(size);
    }

    enqueue(elementValue) {
        if (this.datastructure.isFull()) {
            return null;
        }

        // Figure out where to put the new element
        let avail = (this.datastructure.getHead() + this.datastructure.getNumElements()) % this.datastructure.getSize();

        this.datastructure.setElementValue(avail, elementValue); // Insert new element into last element

        this.datastructure.numElements++;

        // Tail points to last element
        this.datastructure.setTail((this.datastructure.getHead() + this.datastructure.getNumElements()) % this.datastructure.getSize());

        return {value: elementValue, index: avail};
    }

    dequeue() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let headIndex = this.datastructure.getHead();
        let headElementValue = this.datastructure.getElement(headIndex).getValue();

        // Remove from front, so set head element to null
        this.datastructure.setElementValue(headIndex, null);

        // Head points to the next element
        this.datastructure.setHead((headIndex + 1) % this.datastructure.getSize());
        this.datastructure.numElements--;

        return {value: headElementValue, index: headIndex};
    }

    peek() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getElement(this.datastructure.getHead()).getValue();
    }
}

class DoublyLinkedListQueue {
    constructor() {
        this.datastructure = new DoublyLinkedList();
    }

    enqueue(elementValue) {
        let newNode = new DoublyLinkedListElement(elementValue);

        // Insert at the end
        this.datastructure.addLast(newNode);

        return newNode;
    }

    dequeue() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let dequeuedElementValue = this.datastructure.head.getValue();

        // Remove from the front
        this.datastructure.removeFirst();

        return {value: dequeuedElementValue};
    }

    peek() {
        if (this.datastructure.isEmpty()){
            return null;
        }

        return this.datastructure.getFirst().getValue();
    }
}