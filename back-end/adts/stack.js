class SimpleArrayStack {
    constructor(size) {
        this.datastructure = new SimpleArray(size);
    }

    push(elementValue) {
        if (this.datastructure.isFull()) {
            return null;
        }

        // Insert at the end
        this.datastructure.setElementValue(this.datastructure.getNumElements(), elementValue);
        this.datastructure.numElements++;

        return {value: elementValue, index: this.datastructure.numElements - 1};
    }

    pop() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let poppedElementValue = this.datastructure.getElement(this.datastructure.getNumElements() - 1).getValue();

        // Remove from the end
        this.datastructure.setElementValue(this.datastructure.getNumElements() - 1, null);
        this.datastructure.numElements--;

        return {value: poppedElementValue, index: this.datastructure.getNumElements()};
    }

    peek() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getElement(this.datastructure.getNumElements() - 1).getValue();
    }
}

class SinglyLinkedListStack {
    constructor() {
        this.datastructure = new SinglyLinkedList();
    }

    push(elementValue) {
        let newNode = new SinglyLinkedListElement(elementValue, null);

        // Insert at the front
        this.datastructure.addFirst(newNode);

        return newNode;
    }

    pop() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let poppedElementValue = this.datastructure.head.getValue();

        // Remove from the front
        this.datastructure.removeFirst();

        return {value: poppedElementValue};
    }

    peek() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getFirst().getValue();
    }
}