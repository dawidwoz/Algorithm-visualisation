class Element {
    constructor(value = null) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }
}

class SinglyLinkedListElement extends Element {
    constructor(elementValue, next) {
        super(elementValue);
        this.next = next;
    }

    getNext() {
        return this.next;
    }

    setNext(newNext) {
        this.next = newNext;
    }
}

class DoublyLinkedListElement extends Element {
    constructor(elementValue) {
        super(elementValue);
        this.next = null;
        this.prev = null;
    }

    getNext() {
        return this.next;
    }

    setNext(newNext) {
        this.next = newNext;
    }

    getPrev() {
        return this.prev;
    }

    setPrev(newPrev) {
        this.prev = newPrev;
    }
}

class Datastructure {
    constructor() {
        this.numElements = 0;
    }

    getNumElements() {
        return this.numElements;
    }

    isEmpty() {
        return this.numElements === 0;
    }
}

class SimpleArray extends Datastructure {
    constructor(size = 5) {
        super();
        this.size = size;
        this.content = [];

        for (let i = 0; i < size; i++) {
            this.content[i] = new Element(null);
        }
    }

    getElement(index) {
        if (index >= 0 && index < this.content.length) {
            return this.content[index];
        }
    }

    setElementValue(index, value) {
        this.content[index].setValue(value);
    }

    getSize() {
        return this.size;
    }

    isFull() {
        return this.numElements === this.size;
    }
}

class CircularArray extends SimpleArray {
    constructor(size = 5) {
        super(size);
        this.head = 0;
        this.tail = 0;
    }

    getHead() {
        return this.head;
    }

    setHead(head) {
        this.head = head;
    }

    getTail() {
        return this.tail;
    }

    setTail(tail) {
        this.tail = tail;
    }
}

class HeapArray extends SimpleArray {
    constructor(size = 5) {
        super(size);
    }

    static parent(index) {
        return Math.floor((index - 1) / 2);
    }

    static left(index) {
        return 2 * index + 1;
    }

    static right(index) {
        return 2 * index + 2;
    }

    hasLeft(index) {
        return HeapArray.left(index) < this.numElements;
    }

    hasRight(index) {
        return HeapArray.right(index) < this.numElements;
    }

    swap(i, j) {
        let temp = this.content[i].getValue();

        this.content[i].setValue(this.content[j].getValue());
        this.content[j].setValue(temp);
    }

    expand() {
        this.size = this.size * 2;

        for (let i = this.size / 2; i < this.size; i++) {
            this.content[i] = new Element(null);
        }
    }
}

class SinglyLinkedList extends Datastructure {
    constructor() {
        super();
        this.head = null;
        this.tail = null;
    }

    addFirst(node) {
        if (this.head == null) {
            node.setNext(null);
            this.head = node;
            this.tail = node;
        } else {
            node.setNext(this.head);
            this.head = node;
        }

        this.numElements++;
    }

    getFirst() {
        return this.head;
    }

    removeFirst() {
        let first = this.head;
        this.head = first.getNext();

        // Added to make this work in JavaScript
        if (this.head === null) {
            this.tail = null;
        }

        this.numElements--;
    }
}

class DoublyLinkedList extends Datastructure {
    constructor() {
        super();
        this.head = null;
        this.tail = null;
    }

    getFirst() {
        return this.head;
    }

    removeFirst() {
        let first = this.head;
        this.head = first.getNext();

        // Added to make this work in JavaScript
        if (this.head === null) {
            this.tail = null;
        }

        this.numElements--;
    }

    addLast(node) {
        if (this.tail == null) {
            this.head = node;
            this.tail = node;
        } else {
            node.setPrev(this.tail);
            this.tail.setNext(node);
            this.tail = node;
        }

        this.numElements++;
    }
}