class VisualElement extends VisualObject {
    constructor(physicalElement) {
        super();

        this.physicalElement = physicalElement;

        this.visualValue = new VisualValue("null");

        this.visualObjects.push(this.visualValue);
    }

    updateElementValue(value = this.physicalElement.getValue()) {
        this.visualValue.value = value;
    }

    setXY(x, y) {
        super.setXY(x, y);

        // Set the XY coordinates of all contained VisualObjects, such as VisualBox, VisualValue, etc.
        this.setAllXY();
    }

    update(x, y, progress) {
        super.update(x, y, progress);

        // Update all contained VisualObjects, such as VisualBox, VisualValue, etc.
        this.updateAll(x, y, progress);
    }
}

class VisualArrayElement extends VisualElement {
    constructor(physicalElement, indexNum, showIndex = false) {
        super(physicalElement);

        this.visualElementBox = new VisualBox();
        this.visualIndexNum = new VisualValue(indexNum);

        this.visualObjects.push(this.visualElementBox);

        if (showIndex) {
            this.visualObjects.push(this.visualIndexNum);
        }
    }

    setIndex(index) {
        this.visualIndexNum.setValue(index);
    }

    setAllXY() {
        this.visualElementBox.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualIndexNum.setXY(this.getXY()[0], this.getXY()[1] + this.visualElementBox.height);
    }

    updateAll(x, y, progress) {
        if (this.visualElementBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualElementBox.update(x, y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x, y, progress);
        }
        if (this.visualIndexNum.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualIndexNum.update(x, y + this.visualElementBox.width, progress);
        }
    }
}

class VisualTreeNode extends VisualElement {
    constructor(physicalElement, radius) {
        super(physicalElement);
        this.parent = null;
        this.left = null;
        this.right = null;

        this.leftArrow = null;
        this.rightArrow = null;

        this.visualCircle = new VisualCircle(radius);
        this.visualObjects.push(this.visualCircle);
    }

    setParent(visualTreeNode) {
        this.parent = visualTreeNode;
    }

    setLeft(visualTreeNode) {
        this.left = visualTreeNode;

        if (visualTreeNode !== null) {
            this.leftArrow = new VisualArrow(circleRadius, circleRadius);
            this.leftArrow.setStartXY(this.middleXY[0], this.middleXY[1]);
            visualTreeNode.addIncomingArrow(this.leftArrow);
        } else {
            this.leftArrow = null;
        }
    }

    setRight(visualTreeNode) {
        this.right = visualTreeNode;

        if (visualTreeNode !== null) {
            this.rightArrow = new VisualArrow(circleRadius, circleRadius);
            this.rightArrow.setStartXY(this.middleXY[0], this.middleXY[1]);
            visualTreeNode.addIncomingArrow(this.rightArrow);
        } else {
            this.rightArrow = null;
        }
    }

    setAllXY() {
        for (let i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].setXY(this.middleXY[0], this.middleXY[1]);
        }

        this.updateArrowXY();
    }

    updateAll(x, y, progress) {
        if (this.visualCircle.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualCircle.update(x, y, progress)
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x, y, progress);
        }
    }

    updateArrowXY() {
        super.updateArrowsXY();

        if (this.left !== null) {
            this.leftArrow.setStartXY(this.getXY()[0], this.getXY()[1]);
            this.leftArrow.setEndXY(this.left.getXY()[0], this.left.getXY()[1]);
        }
        if (this.right !== null) {
            this.rightArrow.setStartXY(this.getXY()[0], this.getXY()[1]);
            this.rightArrow.setEndXY(this.right.getXY()[0], this.right.getXY()[1]);
        }
    }

    draw() {
        super.draw();

        if (this.leftArrow !== null) {
            this.leftArrow.draw();
        }
        if (this.rightArrow !== null) {
            this.rightArrow.draw();
        }
    }
}

class VisualSinglyLinkedListElement extends VisualElement {
    constructor(physicalElement) {
        super(physicalElement);
        this.next = null;

        this.visualValueBox = new VisualBox();

        this.visualNextBox = new VisualBox();
        this.visualNextBox.crossedThrough = true;
        this.visualNext = new VisualValue("next");

        this.nextArrow = new VisualArrow(0, this.visualNextBox.width);
        this.visualNext.addOutgoingArrow(this.nextArrow);

        this.visualObjects.push(this.visualValueBox);
        this.visualObjects.push(this.visualNextBox);
        this.visualObjects.push(this.visualNext);
    }

    getNext() {
        return this.next;
    }

    setNext(next) {
        this.next = next;

        if (next !== null) {
            next.addIncomingArrow(this.nextArrow);
        }

        this.visualNextBox.crossedThrough = this.next === null;
    }

    setAllXY() {
        this.visualValueBox.setXY(this.getXY()[0] - (this.visualValueBox.width / 2), this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0] - (this.visualValueBox.width / 2), this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0] + (this.visualValueBox.width / 2), this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0] + (this.visualValueBox.width / 2), this.getXY()[1]);
    }

    updateAll(x, y, progress) {
        if (this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValueBox.update(x - (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x - (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNextBox.update(x + (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNext.update(x + (this.visualValueBox.width / 2), y, progress);
        }
    }

}

class VisualDoublyLinkedListElement extends VisualSinglyLinkedListElement {
    constructor(physicalElement) {
        super(physicalElement);
        this.prev = null;

        this.visualPrevBox = new VisualBox();
        this.visualPrevBox.crossedThrough = true;
        this.visualPrev = new VisualValue("prev");

        // Create next arrow, pass to the value
        this.prevArrow = new VisualArrow(0, boxWidth * 1.5);
        this.visualPrev.addOutgoingArrow(this.prevArrow);

        this.visualObjects.push(this.visualPrevBox);
        this.visualObjects.push(this.visualPrev);
    }

    getPrev() {
        return this.prev;
    }

    setPrev(prev) {
        this.prev = prev;

        if (prev !== null) {
            prev.addIncomingArrow(this.prevArrow);
        } else {
            this.visualPrev.outgoingArrows = [];
        }

        this.visualPrevBox.crossedThrough = this.prev === null;
    }

    setAllXY() {
        this.visualPrevBox.setXY(this.getXY()[0] - this.visualValueBox.width, this.getXY()[1]);
        this.visualPrev.setXY(this.getXY()[0] - this.visualValueBox.width, this.getXY()[1]);
        this.visualValueBox.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0] + this.visualValueBox.width, this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0] + this.visualValueBox.width, this.getXY()[1]);
    }

    updateAll(x, y, progress) {
        if (this.visualPrevBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualPrevBox.update(x - this.visualPrevBox.width, y, progress);
        }
        if (this.visualPrev.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualPrev.update(x - this.visualValueBox.width, y, progress);
        }
        if (this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValueBox.update(x, y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x, y, progress);
        }
        if (this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNextBox.update(x + this.visualValueBox.width, y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNext.update(x + this.visualValueBox.width, y, progress);
        }
    }

}

class VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + boxHeight) {
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
    }

    draw() {
        clearCanvas();
    }
}

class VisualSimpleArray extends VisualDatastructure {
    constructor(datastructure, elementBoxY, showIndex = true) {
        super(datastructure, elementBoxY);

        this.animator = new VisualSimpleArrayAnimator(this);

        this.content = [];
        this.showIndex = showIndex;

        // Populate content with VisualArrayElements and draw
        for (let i = 0; i < datastructure.size; i++) {
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (boxWidth / 2) + (boxWidth * i), this.elementBoxY + (boxHeight / 2));
            this.content[i].draw();
        }
    }

    insert(element) {
        this.content[element.index].updateElementValue(); // Fetch physical element value
        this.content[element.index].setIndex(element.index); // Update index

        this.animator.insertAnimation(element); // Execute animations
    }

    remove(element) {
        this.getElement(element.index).updateElementValue("null");

        this.animator.removeAnimation(element); // Execute animations
    }

    getElement(index) {
        if (index >= 0 && index < this.content.length) {
            return this.content[index];
        }
    }

    draw() {
        super.draw();

        for (let i = 0; i < this.physicalDatastructure.size; i++) {
            this.content[i].draw();
        }
    }
}

class VisualCircularArray extends VisualSimpleArray {
    constructor(datastructure, elementBoxY = topBottomMargin + 90, showIndex = false) {
        super(datastructure, elementBoxY, showIndex);
        this.animator = new VisualCircularArrayAnimator(this);

        // Set up for the head arrow
        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10);
        this.headArrowEnd = new VisualObject();

        this.headArrowLabel.setXY(this.getElement(0).getXY()[0], elementBoxLabelY);
        this.headArrowEnd.setXY(this.getElement(0).getXY()[0], this.getElement(0).getXY()[1] - boxHeight / 2);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);

        // Set up for the tail arrow
        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10);
        this.tailArrowEnd = new VisualObject(); // Create dummy end point object so that the arrow follows during anim

        this.tailArrowLabel.setXY(this.getElement(0).getXY()[0], elementBoxLabelY);
        this.tailArrowEnd.setXY(this.getElement(0).getXY()[0], this.getElement(0).getXY()[1] - boxHeight / 2);

        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);
        this.tailArrowEnd.addIncomingArrow(this.tailArrow);

        this.draw();
    }

    insert(element) {
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head === tail) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head")
        }

        super.insert(element);
    }

    remove(element) {
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head === tail) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head");
        }

        super.remove(element);
    }

    draw() {
        super.draw();

        this.headArrowLabel.draw();

        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head !== tail) {
            this.tailArrowLabel.draw();
        }
    }
}

class VisualHeapArray extends VisualSimpleArray {
    constructor(datastructure, elementBoxY, showIndex = false) {
        super(datastructure, elementBoxY, showIndex);

        this.animator = new VisualHeapArrayAnimator(this);

        this.originalSize = datastructure.size;
        this.contentTree = [];
        this.treeNodeRadius = circleRadius;

        // Populate contentTree with VisualTreeNodes (for the tree representation)
        for (let i = 0; i < this.physicalDatastructure.size; i++) {
            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i));
        }
    }

    insert(element) {
        if (this.originalSize < this.physicalDatastructure.size) {
            this.expand();
        }

        this.updateTreeNodeCoords();

        for (let i = 0; i < this.content.length; i++) {
            // Fetch the physical element's value for the new element
            this.getElement(i).updateElementValue();
            this.getTreeElement(i).updateElementValue();
        }

        // Animations disabled due to incompletion
        //this.animator.insertAnimation(element);

        this.createNodeArrows(element.index);

        this.draw();
    }

    remove(element) {
        this.updateTreeNodeCoords();

        // Update values for elements in both the "flat" and tree representations
        for (let i = 0; i < this.physicalDatastructure.numElements + 1; i++) {
            this.getElement(i).updateElementValue();
            this.getTreeElement(i).updateElementValue();
        }

        // Remove the respective child from the parent of the element being removed
        if (element.index !== 0) {
            if (element.index % 2 === 0) {
                this.getTreeElement(HeapArray.parent(element.index)).setRight(null);
            } else {
                this.getTreeElement(HeapArray.parent(element.index)).setLeft(null);
            }
        }

        this.draw();
    }

    getTreeElement(index) {
        if (index >= 0 && index < this.contentTree.length) {
            return this.contentTree[index];
        }
    }

    createNodeArrows(index) {
        if (index !== 0) { // Element at given index has a parent (not root)
            let parentTreeNode = this.getTreeElement(HeapArray.parent(index)); // Parent element

            // If node index even, the node is the right child of parent. If odd, then left child.
            if (index % 2 === 0) {
                parentTreeNode.setRight(this.getTreeElement(index));
            } else {
                parentTreeNode.setLeft(this.getTreeElement(index));
            }
        }
    }

    updateTreeNodeCoords() {
        let numLevels = Math.floor(Math.log2(this.physicalDatastructure.numElements));

        let totalExtraGap = (Math.pow(2, numLevels) * treeNodeSpacingFactorX);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        let startingX = canvas.width / 2 - (unitsToStart * circleRadius);
        let startingY = (canvas.height / 2);

        for (let i = 0; i < this.physicalDatastructure.numElements; i++) {
            let currLevel = Math.floor(Math.log2(i + 1));
            let nodesOnCurrLevel = Math.pow(2, currLevel);
            let nodePosOnLevel = Math.abs((nodesOnCurrLevel - i) - 1);

            let reverseCurrLevel = (numLevels + 1) - currLevel;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel) * treeNodeSpacingFactorX);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel) - 1) + currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel - 1) - 1)) + (currLevelExtraNodeGap / 2);

            let x = startingX;
            x += (distanceFromLeftToFirstNode * circleRadius) + circleRadius;
            x += nodePosOnLevel * (circleRadius + (distanceBetweenNodes * circleRadius));

            let y = startingY;
            y += (currLevel * (circleRadius * 2)) + (circleRadius * treeNodeSpacingFactorY * currLevel);

            this.contentTree[i].setXY(x, y);
        }
    }

    expand() {
        // Populate the empty half of content and contentTree with elements
        for (let i = this.originalSize; i < this.physicalDatastructure.size; i++) {
            this.content[i] = new VisualArrayElement(this.physicalDatastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (boxWidth / 2) + (boxWidth * i), this.elementBoxY + (boxHeight / 2));

            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i), this.treeNodeRadius);
        }

        this.originalSize = this.physicalDatastructure.size;
    }

    draw() {
        super.draw(); // Draw "flat" array representation

        // Draw tree representation
        // numElements used so that tree nodes are only drawn for elements with a value, effectively
        for (let i = 0; i < this.physicalDatastructure.numElements; i++) {
            this.contentTree[i].draw();
        }
    }
}

class VisualSinglyLinkedList extends VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + 90) {
        super(datastructure, elementBoxY);

        this.animator = new VisualSinglyLinkedListAnimator(this);

        this.head = null;
        this.tail = null;

        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10 + boxHeight / 2);
        this.headArrowEnd = new VisualObject();

        this.headArrowLabel.setXY(leftMargin + boxWidth, elementBoxLabelY);
        this.headArrowEnd.setXY(leftMargin + boxWidth, elementBoxY);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);

        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10 + boxHeight / 2);

        this.tailArrowLabel.setXY(leftMargin + boxWidth, elementBoxLabelY);

        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);

        this.draw();
    }

    insert(element) {
        let newNode = new VisualSinglyLinkedListElement(element);
        newNode.setXY(leftMargin + boxWidth, this.elementBoxY + (boxHeight / 2));

        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.incomingArrows = [];
            newNode.setNext(this.head);
            this.head = newNode;
        }

        if (this.physicalDatastructure.numElements === 2) {
            // If there are two elements, give the tail element the tail arrow
            this.tail = this.head.getNext();
            this.tail.addIncomingArrow(this.tailArrow);
        }

        this.head.addIncomingArrow(this.headArrow);
        this.head.updateElementValue();

        this.animator.insertAnimation(element);
    }

    remove(element) {
        // Update head and tail references
        this.head.physicalElement = this.physicalDatastructure.head;
        this.tail.physicalElement = this.physicalDatastructure.tail;

        // If removing the last element, give the head arrow to another VisualObject so it remains drawn
        if (this.head.getNext() === null) {
            this.headArrowEnd.addIncomingArrow(this.headArrow);
        } else {
            this.head.getNext().addIncomingArrow(this.headArrow);
        }

        this.animator.removeAnimation(element); // Execute removal animation

        this.head = this.head.getNext(); // We remove from the head, so set head as the next element
    }

    draw() {
        super.draw();

        if (this.physicalDatastructure.isEmpty()) {
            this.headArrowLabel.setValue("head / tail");
            this.headArrowLabel.draw();
            return;
        }

        if (this.head.physicalElement === this.tail.physicalElement) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head");
            this.tailArrowLabel.setValue("tail");
            this.tailArrowLabel.draw();
        }

        this.headArrowLabel.draw();

        let cur = this.head;
        while (cur != null) {
            cur.draw();
            cur = cur.getNext();
        }
    }
}

class VisualDoublyLinkedList extends VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + 90) {
        super(datastructure, elementBoxY);

        this.animator = new VisualDoublyLinkedListAnimator(this);

        this.head = null;
        this.tail = null;

        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10 + boxHeight / 2);
        this.headArrowEnd = new VisualObject();

        this.headArrowLabel.setXY(leftMargin + (boxWidth * 1.5), elementBoxLabelY);
        this.headArrowEnd.setXY(leftMargin + (boxWidth * 1.5), elementBoxY);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);

        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10 + boxHeight / 2);

        this.tailArrowLabel.setXY(leftMargin + (boxWidth * 1.5), elementBoxLabelY);

        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);

        this.draw();
    }

    insert(element) {
        let newNode = new VisualDoublyLinkedListElement(element);
        newNode.setXY(leftMargin + (boxWidth * 1.5) + (boxWidth * 4 * (this.physicalDatastructure.numElements - 1)), this.elementBoxY);

        if (this.tail == null) {
            if (this.head == null) {
                this.head = newNode;
                this.tail = newNode;
                this.head.addIncomingArrow(this.headArrow);
                this.head.updateElementValue();
            } else {
                this.head.incomingArrows = [];
                newNode.setNext(this.head);
                this.head = newNode;
            }
        } else {
            // Adding last, therefore tail becomes the new element
            newNode.setPrev(this.tail);
            this.tail.setNext(newNode);
            this.tail = newNode;
            this.tail.addIncomingArrow(this.tailArrow);
        }

        this.tail.updateElementValue();

        this.animator.insertAnimation(element);
    }

    remove(element) {
        this.head.physicalElement = this.physicalDatastructure.head;
        this.tail.physicalElement = this.physicalDatastructure.tail;

        if (this.head.getNext() === null) {
            this.headArrowEnd.addIncomingArrow(this.headArrow);
        } else {
            this.head.getNext().addIncomingArrow(this.headArrow);
        }

        this.animator.removeAnimation(element);

        this.head = this.head.getNext();

        if (this.head !== null) {
            this.head.setPrev(null);
        } else {
            this.tail = null;
        }
    }

    draw() {
        super.draw();

        if (this.physicalDatastructure.isEmpty()) {
            this.headArrowLabel.setValue("head / tail");
            this.headArrowLabel.draw();
            return;
        }

        if (this.head.physicalElement === this.tail.physicalElement) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head");
            this.tailArrowLabel.setValue("tail");
            this.tailArrowLabel.draw();
        }

        this.headArrowLabel.draw();

        let cur = this.head;
        while (cur != null) {
            cur.draw();
            cur = cur.getNext();
        }
    }
}