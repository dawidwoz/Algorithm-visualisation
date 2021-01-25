class VisualDatastructureAnimator {
    constructor(visualSimpleArray) {
        this.visualDatastructure = visualSimpleArray;
    }

    insertAnimation(element) {
        this.animationMoveIntoDatastructure(element);

        animationSequencer.go();
    }

    animationMoveIntoDatastructure(element) {
    }

    removeAnimation(element) {
        this.animationMoveOutOfDatastructure(element);

        animationSequencer.go();
    }

    animationMoveOutOfDatastructure(element) {
    }
}

class VisualSimpleArrayAnimator extends VisualDatastructureAnimator {
    constructor(visualSimpleArray) {
        super(visualSimpleArray);
    }

    animationMoveIntoDatastructure(element) {
        let sequence = new AnimationSequence();

        let headElement = this.visualDatastructure.getElement(element.index);

        let sequenceHeadValueCoordSet = new CoordSet();
        sequenceHeadValueCoordSet.setFromXY(leftMargin + boxWidth, canvas.height - topBottomMargin);
        sequenceHeadValueCoordSet.setToXY(headElement.getXY()[0], headElement.getXY()[1]);

        // The headValue needs to move from the bottom of the canvas area into the element

        sequence.add(headElement.visualValue, sequenceHeadValueCoordSet, new MoveNoFade());

        animationSequencer.add(sequence);

        return sequence;
    }

    animationMoveOutOfDatastructure(element) {
        let sequence = new AnimationSequence();
        sequence.executeConcurrently = true;

        let poppedElementValue = new VisualValue(element.value);
        let poppedElementXY = this.visualDatastructure.getElement(element.index).getXY();

        sequence.addTempObject(poppedElementValue);

        let sequencePoppedElementCoordSet = new CoordSet();
        sequencePoppedElementCoordSet.setFromXY(poppedElementXY[0], poppedElementXY[1]);
        sequencePoppedElementCoordSet.setToXY(canvas.width - leftMargin, canvas.height - topBottomMargin);

        // The element value will move from its position in the data structure to the bottom-right corner

        sequence.add(poppedElementValue, sequencePoppedElementCoordSet, new MoveFadeOut());

        animationSequencer.add(sequence);

        return sequence;
    }
}

class VisualCircularArrayAnimator extends VisualSimpleArrayAnimator {
    constructor(visualCircularArray) {
        super(visualCircularArray);
    }

    animationMoveIntoDatastructure(element) {
        let sequence = super.animationMoveIntoDatastructure(element);
        sequence.executeConcurrently = true;

        let tailArrowLabel = this.visualDatastructure.tailArrowLabel;
        let tailArrowEnd = this.visualDatastructure.tailArrowEnd;

        let headIndex = this.visualDatastructure.physicalDatastructure.head;
        let headArrowLabel = this.visualDatastructure.headArrowLabel;
        let headArrowEnd = this.visualDatastructure.headArrowEnd;

        let tailIndex = this.visualDatastructure.physicalDatastructure.tail;
        let tailElement = this.visualDatastructure.getElement(tailIndex);

        let tailArrowLabelCoordSet = new CoordSet();
        tailArrowLabelCoordSet.setFromXY(tailArrowLabel.getXY()[0], tailArrowLabel.getXY()[1]);
        tailArrowLabelCoordSet.setToXY(tailElement.getXY()[0], tailArrowLabel.getXY()[1]);

        let sequenceTailArrowEndCoordSet = new CoordSet();
        sequenceTailArrowEndCoordSet.setFromXY(tailArrowEnd.getXY()[0], tailArrowEnd.getXY()[1]);
        sequenceTailArrowEndCoordSet.setToXY(tailElement.getXY()[0], tailArrowEnd.getXY()[1]);

        // If the tail becomes the head effectively, animate the head going from where the tail is to the head
        if ((tailIndex % this.visualDatastructure.physicalDatastructure.size) === headIndex) {
            sequence.add(headArrowLabel, tailArrowLabelCoordSet, new MoveNoFade());
            sequence.add(headArrowEnd, sequenceTailArrowEndCoordSet, new MoveNoFade());

            tailArrowLabel.setXY(headArrowLabel.getXY()[0], headArrowLabel.getXY()[1]);
            tailArrowEnd.setXY(headArrowEnd.getXY()[0], headArrowEnd.getXY()[1]);
        } else {
            // If not, just move the tail
            sequence.add(tailArrowLabel, tailArrowLabelCoordSet, new MoveNoFade());
            sequence.add(tailArrowEnd, sequenceTailArrowEndCoordSet, new MoveNoFade());
        }
    }

    animationMoveOutOfDatastructure(element) {
        let sequence = super.animationMoveOutOfDatastructure(element);

        let headArrowLabel = this.visualDatastructure.headArrowLabel;
        let headArrowEnd = this.visualDatastructure.headArrowEnd;

        let headElement = this.visualDatastructure.getElement(this.visualDatastructure.physicalDatastructure.head);

        // Move the head arrow to its new position after removal

        let sequenceHeadArrowLabelCoordSet = new CoordSet();
        sequenceHeadArrowLabelCoordSet.setFromXY(headArrowLabel.getXY()[0], headArrowLabel.getXY()[1]);
        sequenceHeadArrowLabelCoordSet.setToXY(headElement.getXY()[0], headArrowLabel.getXY()[1]);

        let sequenceHeadArrowEndCoordSet = new CoordSet();
        sequenceHeadArrowEndCoordSet.setFromXY(headArrowEnd.getXY()[0], headArrowEnd.getXY()[1]);
        sequenceHeadArrowEndCoordSet.setToXY(headElement.getXY()[0], headArrowEnd.getXY()[1]);

        sequence.add(headArrowLabel, sequenceHeadArrowLabelCoordSet, new MoveNoFade());
        sequence.add(headArrowEnd, sequenceHeadArrowEndCoordSet, new MoveNoFade());
    }
}

class VisualHeapArrayAnimator extends VisualSimpleArrayAnimator {
    constructor(visualHeapArray) {
        super(visualHeapArray);
    }

    animationMoveIntoDatastructure(element) {
        super.animationMoveIntoDatastructure(element);

        let sequence = new AnimationSequence();
        sequence.executeConcurrently = true;

        // The newly inserted value is given to the respective element to visualize
        this.visualDatastructure.getElement(element.index).updateElementValue(element.value);
        this.visualDatastructure.getTreeElement(element.index).updateElementValue(element.value);

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);
        stage0coordsSet2.setToXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);

        sequence.add(this.visualDatastructure.getTreeElement(element.index), stage0coordsSet2, new MoveFadeIn());

        if (element.index !== 0 && this.visualDatastructure.getElement(element.index).physicalElement.getValue() !== element.value) {
            this.animationSwap(element);
        }
    }

    animationSwap(element) {
        if (element.index === 0) return;

        let curr = element.index;

        while (curr > 0) {
            let p = HeapArray.parent(curr);

            if (this.visualDatastructure.getElement(curr).visualValue.value === this.visualDatastructure.physicalDatastructure.getElement(parent).getValue()) {
                // If value has not changed, the element has not been swapped
                return;
            }

            let sequenceSwap = new AnimationSequence();
            sequenceSwap.executeConcurrently = true;

            this.generateSwapAnimation(curr, parent, sequenceSwap);

            animationSequencer.add(sequenceSwap);

            curr = p;
        }
    }

    generateSwapAnimation(childIndex, parentIndex, stageToAddTo) {
        let flatJ = this.visualDatastructure.getElement(childIndex);
        let flatP = this.visualDatastructure.getElement(parentIndex);
        let treeJ = this.visualDatastructure.getTreeElement(childIndex);
        let treeP = this.visualDatastructure.getTreeElement(parentIndex);

        let flatJTemp = new VisualArrayElement(null, null, null);
        flatJTemp.setXY(flatJ.getXY()[0], flatJ.getXY()[1]);
        flatJTemp.updateElementValue(flatJ.visualValue.value);

        let flatPTemp = new VisualArrayElement(null, null, null);
        flatPTemp.setXY(flatP.getXY()[0], flatP.getXY()[1]);
        flatPTemp.updateElementValue(flatP.visualValue.value);

        let treeJTemp = new VisualTreeNode(null, treeJ.visualCircle.radius);
        treeJTemp.setXY(treeJ.getXY()[0], treeJ.getXY()[1]);
        treeJTemp.updateElementValue(treeJ.visualValue.value);

        let treePTemp = new VisualTreeNode(null, treeP.visualCircle.radius);
        treePTemp.setXY(treeP.getXY()[0], treeP.getXY()[1]);
        treePTemp.updateElementValue(treeP.visualValue.value);

        stageToAddTo.addTempObject(flatJTemp);
        stageToAddTo.addTempObject(flatPTemp);
        stageToAddTo.addTempObject(treeJTemp);
        stageToAddTo.addTempObject(treePTemp);

        stageToAddTo.doNotDraw(flatJ);
        stageToAddTo.doNotDraw(flatP);
        stageToAddTo.doNotDraw(treeJ);
        stageToAddTo.doNotDraw(treeP);

        let flatJCoordSet = new CoordSet();
        flatJCoordSet.setFromXY(flatJ.getXY()[0], flatJ.getXY()[1]);
        flatJCoordSet.setToXY(flatP.getXY()[0], flatP.getXY()[1]);

        let flatPCoordSet = new CoordSet();
        flatPCoordSet.setFromXY(flatP.getXY()[0], flatP.getXY()[1]);
        flatPCoordSet.setToXY(flatJ.getXY()[0], flatJ.getXY()[1]);

        let treeJCoordSet = new CoordSet();
        treeJCoordSet.setFromXY(treeJ.getXY()[0], treeJ.getXY()[1]);
        treeJCoordSet.setToXY(treeP.getXY()[0], treeP.getXY()[1]);

        let treePCoordSet = new CoordSet();
        treePCoordSet.setFromXY(treeP.getXY()[0], treeP.getXY()[1]);
        treePCoordSet.setToXY(treeJ.getXY()[0], treeJ.getXY()[1]);

        stageToAddTo.add(flatJTemp.visualValue, flatJCoordSet, new MoveNoFade());
        stageToAddTo.add(flatPTemp.visualValue, flatPCoordSet, new MoveNoFade());
        stageToAddTo.add(treeJTemp.visualValue, treeJCoordSet, new MoveNoFade());
        stageToAddTo.add(treePTemp.visualValue, treePCoordSet, new MoveNoFade());
    }
}

class VisualSinglyLinkedListAnimator extends VisualDatastructureAnimator {
    constructor(visualSinglyLinkedList) {
        super(visualSinglyLinkedList);
    }

    animationMoveIntoDatastructure() {
        if (this.head !== null) {
            this.shiftNodes("right");
        }

        // New values moves into temp "dummy" element
        this.animationMoveIntoDatastructureStep1();

        // Real head element hovers (pause)
        this.animationMoveIntoDatastructureStep2();

        // Real head element moves into data structure
        this.animationMoveIntoDatastructureStep3();
    }

    shiftNodes(direction) {
        let curr = null;

        if (direction === "right") {
            if (this.visualDatastructure.physicalDatastructure.getNumElements() === 1) {
                return;
            }
            // The head wll be moving in, so move everything from the head's next element onwards
            curr = this.visualDatastructure.head.getNext();

        } else if (direction === "left") {
            if (this.visualDatastructure.physicalDatastructure.getNumElements() === 0) {
                return;
            }
            curr = this.visualDatastructure.head;
        }

        // sequence will hold the instructions for animating the shifting of all elements
        let sequence = new AnimationSequence();
        sequence.executeConcurrently = true;
        sequence.doNotDraw(this.visualDatastructure.head);

        // The tail arrow also needs to move - it is drawn by the tail label, therefore the label must move
        let sequenceTailLabelCoordSet = new CoordSet();
        sequenceTailLabelCoordSet.setFromXY(this.visualDatastructure.tailArrowLabel.getXY()[0], this.visualDatastructure.tailArrowLabel.getXY()[1]);

        // Shift all elements
        while (curr !== null) {
            let sequenceCurrCoordSet = new CoordSet();
            sequenceCurrCoordSet.setFromXY(curr.getXY()[0], curr.getXY()[1]);

            if (direction === "right") {
                sequenceCurrCoordSet.setToXY(curr.getXY()[0] + (3 * boxWidth), curr.getXY()[1]);
                if (curr === this.visualDatastructure.tail) {
                    // The tail arrow is connected to the last element, therefore, if this element is the tail, then
                    // move it along with it
                    sequenceTailLabelCoordSet.setToXY(curr.getXY()[0] + (3 * boxWidth), this.visualDatastructure.tailArrowLabel.getXY()[1]);
                }
            } else {
                sequenceCurrCoordSet.setToXY(curr.getXY()[0] - (3 * boxWidth), curr.getXY()[1]);
                if (curr === this.visualDatastructure.tail) {
                    // As above
                    sequenceTailLabelCoordSet.setToXY(curr.getXY()[0] - (3 * boxWidth), this.visualDatastructure.tailArrowLabel.getXY()[1]);
                }
            }
            sequence.add(curr, sequenceCurrCoordSet, new MoveNoFade()); // Add element to shift

            curr = curr.getNext();
        }
        sequence.add(this.visualDatastructure.tailArrowLabel, sequenceTailLabelCoordSet, new MoveNoFade());

        animationSequencer.add(sequence);
    }

    animationMoveIntoDatastructureStep1() {
        let sequence1 = new AnimationSequence();

        sequence1.doNotDraw(this.visualDatastructure.head); // "Hide" the head element
        sequence1.executeConcurrently = true; // All objects are animated at the same time

        let tempElement = new VisualSinglyLinkedListElement();
        tempElement.updateElementValue("");
        sequence1.addTempObject(tempElement);

        let sequence1TempElementCoordSet = new CoordSet();
        sequence1TempElementCoordSet.setFromXY(leftMargin + boxWidth, canvas.height / 2);
        sequence1TempElementCoordSet.setToXY(leftMargin + boxWidth, canvas.height / 2);

        // The temp element fades in in the middle of the canvas area

        sequence1.add(tempElement, sequence1TempElementCoordSet, new MoveFadeIn());

        let headValue = new VisualValue(this.visualDatastructure.head.visualValue.value);
        sequence1.addTempObject(headValue);

        let sequence1HeadValueCoordSet = new CoordSet();
        sequence1HeadValueCoordSet.setFromXY(leftMargin + boxWidth, canvas.height - topBottomMargin);
        sequence1HeadValueCoordSet.setToXY(sequence1TempElementCoordSet.toMiddleXY[0] - boxWidth / 2, sequence1TempElementCoordSet.toMiddleXY[1]);

        // While the temp element fades in, the head value moves up and into the temp element

        sequence1.add(headValue, sequence1HeadValueCoordSet, new MoveNoFade());

        animationSequencer.add(sequence1);
    }

    animationMoveIntoDatastructureStep2() {
        let sequence2 = new AnimationSequence();

        let sequence2HeadHoverCoordSet = new CoordSet();
        sequence2HeadHoverCoordSet.setFromXY(leftMargin + boxWidth, canvas.height / 2);
        sequence2HeadHoverCoordSet.setToXY(leftMargin + boxWidth, canvas.height / 2);

        // Effectively pause the animation by using a dummy animation sequence

        sequence2.add(this.visualDatastructure.head, sequence2HeadHoverCoordSet, new MoveNoFade());

        animationSequencer.add(sequence2);
    }

    animationMoveIntoDatastructureStep3() {
        let sequence3 = new AnimationSequence();

        let sequence3HeadMoveInCoordSet = new CoordSet();
        sequence3HeadMoveInCoordSet.setFromXY(leftMargin + boxWidth, canvas.height / 2);
        sequence3HeadMoveInCoordSet.setToXY(leftMargin + boxWidth, this.visualDatastructure.elementBoxY + (boxHeight / 2));

        // Move the true head element up and into its correct position in the data structure

        sequence3.add(this.visualDatastructure.head, sequence3HeadMoveInCoordSet, new MoveNoFade());

        animationSequencer.add(sequence3);
    }

    animationMoveOutOfDatastructure(element) {
        let headElement = this.visualDatastructure.head;

        let sequence = new AnimationSequence();

        sequence.doNotDraw(headElement); // Again, hide the head element

        let sequenceHeadDummy = new VisualSinglyLinkedListElement();
        sequenceHeadDummy.updateElementValue(element.value);

        sequence.addTempObject(sequenceHeadDummy);

        let sequenceHeadDummyCoordSet = new CoordSet();
        sequenceHeadDummyCoordSet.setFromXY(headElement.getXY()[0], headElement.getXY()[1]);
        sequenceHeadDummyCoordSet.setToXY(leftMargin + boxWidth, canvas.height / 2);

        // The dummy element with the head's value moves down and fades out of view

        sequence.add(sequenceHeadDummy, sequenceHeadDummyCoordSet, new MoveFadeOut());

        animationSequencer.add(sequence);

        this.shiftNodes("left");
    }
}

class VisualDoublyLinkedListAnimator extends VisualDatastructureAnimator {
    constructor(visualDoublyLinkedList) {
        super(visualDoublyLinkedList);
    }

    animationMoveIntoDatastructure() {
        // New values moves into temp "dummy" element
        this.animationMoveIntoDatastructureStep1();

        // Real head element hovers (pause)
        this.animationMoveIntoDatastructureStep2();

        // Real head element moves into data structure
        this.animationMoveIntoDatastructureStep3();
    }

    shiftNodes(direction) {
        let curr = null;

        if (direction === "right") {
            if (this.visualDatastructure.physicalDatastructure.numElements === 1) {
                return;
            }
            // The head wll be moving in, so move everything from the head's next element onwards
            curr = this.visualDatastructure.head.getNext();
        } else if (direction === "left") {
            if (this.visualDatastructure.physicalDatastructure.numElements === 0) {
                return;
            }
            curr = this.visualDatastructure.head;
        }

        // sequence will hold the instructions for animating the shifting of all elements
        let sequence = new AnimationSequence();
        sequence.executeConcurrently = true;
        sequence.doNotDraw(this.visualDatastructure.head);

        // The tail arrow also needs to move - it is drawn by the tail label, therefore the label must move
        let sequenceTailLabelCoordSet = new CoordSet();
        sequenceTailLabelCoordSet.setFromXY(this.visualDatastructure.tailArrowLabel.getXY()[0], this.visualDatastructure.tailArrowLabel.getXY()[1]);

        // Shift all elements
        while (curr !== null) {
            let sequenceCurrCoordSet = new CoordSet();
            sequenceCurrCoordSet.setFromXY(curr.getXY()[0], curr.getXY()[1]);

            if (direction === "right") {
                sequenceCurrCoordSet.setToXY(curr.getXY()[0] + (4 * boxWidth), curr.getXY()[1]);
                if (curr === this.visualDatastructure.tail) {
                    // The tail arrow is connected to the last element, therefore, if this element is the tail, then
                    // move it along with it
                    sequenceTailLabelCoordSet.setToXY(curr.getXY()[0] + (4 * boxWidth), this.visualDatastructure.tailArrowLabel.getXY()[1]);
                }
            } else {
                sequenceCurrCoordSet.setToXY(curr.getXY()[0] - (4 * boxWidth), curr.getXY()[1]);
                if (curr === this.visualDatastructure.tail) {
                    // As above
                    sequenceTailLabelCoordSet.setToXY(curr.getXY()[0] - (4 * boxWidth), this.visualDatastructure.tailArrowLabel.getXY()[1]);
                }
            }
            sequence.add(curr, sequenceCurrCoordSet, new MoveNoFade()); // Add element to shift

            curr = curr.getNext();
        }
        sequence.add(this.visualDatastructure.tailArrowLabel, sequenceTailLabelCoordSet, new MoveNoFade());

        animationSequencer.add(sequence);
    }

    animationMoveIntoDatastructureStep1() {
        let tailElement = this.visualDatastructure.tail;

        let sequence1 = new AnimationSequence();
        sequence1.doNotDraw(tailElement); // "Hide" the head element
        sequence1.executeConcurrently = true; // All objects are animated at the same time

        let tempElement = new VisualDoublyLinkedListElement();
        tempElement.updateElementValue("");
        sequence1.addTempObject(tempElement);

        let sequence1TempElementCoordSet = new CoordSet();
        sequence1TempElementCoordSet.setFromXY(tailElement.getXY()[0], canvas.height / 2);
        sequence1TempElementCoordSet.setToXY(tailElement.getXY()[0], canvas.height / 2);

        // The temp element fades in in the middle of the canvas area

        sequence1.add(tempElement, sequence1TempElementCoordSet, new MoveFadeIn());

        let headValue = new VisualValue(this.visualDatastructure.tail.visualValue.value);
        sequence1.addTempObject(headValue);

        let sequence1HeadValueCoordSet = new CoordSet();
        sequence1HeadValueCoordSet.setFromXY(leftMargin + boxWidth, canvas.height - topBottomMargin);
        sequence1HeadValueCoordSet.setToXY(sequence1TempElementCoordSet.toMiddleXY[0], sequence1TempElementCoordSet.toMiddleXY[1]);

        // While the temp element fades in, the head value moves up and into the temp element

        sequence1.add(headValue, sequence1HeadValueCoordSet, new MoveNoFade());

        animationSequencer.add(sequence1);
    }

    animationMoveIntoDatastructureStep2() {
        let tailElement = this.visualDatastructure.tail;

        let sequence2 = new AnimationSequence();

        let sequence2HeadHoverCoordSet = new CoordSet();
        sequence2HeadHoverCoordSet.setFromXY(tailElement.getXY()[0], canvas.height / 2);
        sequence2HeadHoverCoordSet.setToXY(tailElement.getXY()[0], canvas.height / 2);

        // Effectively pause the animation by using a dummy animation sequence

        sequence2.add(tailElement, sequence2HeadHoverCoordSet, new MoveNoFade());

        animationSequencer.add(sequence2);
    }

    animationMoveIntoDatastructureStep3() {
        let tailElement = this.visualDatastructure.tail;

        let sequence3 = new AnimationSequence();
        sequence3.executeConcurrently = true;

        let sequence3HeadMoveInCoordSet = new CoordSet();
        sequence3HeadMoveInCoordSet.setFromXY(tailElement.getXY()[0], canvas.height / 2);
        sequence3HeadMoveInCoordSet.setToXY(tailElement.getXY()[0], this.visualDatastructure.elementBoxY + (boxHeight / 2));

        // Move the true head element up and into its correct position in the data structure

        sequence3.add(tailElement, sequence3HeadMoveInCoordSet, new MoveNoFade());

        let tailLabel = this.visualDatastructure.tailArrowLabel;

        let sequence3TailLabelCoordSet = new CoordSet();
        sequence3TailLabelCoordSet.setFromXY(tailLabel.getXY()[0], tailLabel.getXY()[1]);
        sequence3TailLabelCoordSet.setToXY(tailElement.getXY()[0], tailLabel.getXY()[1]);

        // Move the tail arrow along by moving the tail label which holds the arrow effectively

        sequence3.add(tailLabel, sequence3TailLabelCoordSet, new MoveNoFade());

        animationSequencer.add(sequence3);
    }

    animationMoveOutOfDatastructure(element) {
        let headElement = this.visualDatastructure.head;

        let sequence = new AnimationSequence();
        sequence.doNotDraw(headElement); // Again, hide the head element

        let sequenceHeadDummy = new VisualDoublyLinkedListElement();
        sequenceHeadDummy.updateElementValue(element.value);
        sequence.addTempObject(sequenceHeadDummy);

        let sequenceHeadDummyCoordSet = new CoordSet();
        sequenceHeadDummyCoordSet.setFromXY(headElement.getXY()[0], headElement.getXY()[1]);
        sequenceHeadDummyCoordSet.setToXY(leftMargin + (boxWidth * 1.5), canvas.height / 2);

        // The dummy element with the head's value moves down and fades out of view

        sequence.add(sequenceHeadDummy, sequenceHeadDummyCoordSet, new MoveFadeOut());

        animationSequencer.add(sequence);

        this.shiftNodes("left");
    }
}