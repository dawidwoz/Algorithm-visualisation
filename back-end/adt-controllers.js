class AdtController{
    constructor(adt, visualDatastructure){
        this.adt = adt;
        this.visualDatastructure = visualDatastructure;
    }
}

class StackController extends AdtController{
    constructor(adt, visualDatastructure){
        super(adt, visualDatastructure);
    }
    push(elementValue){
        let pushedElement = this.adt.push(elementValue);

        if (pushedElement==null){
            outputLabel.innerText = "Stack is full";
        }else{
            outputLabel.innerText = "Push: " + pushedElement.value;
            this.visualDatastructure.insert(pushedElement);
        }
    }
    pop(){
        let poppedElement = this.adt.pop();

        if (poppedElement==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = "Pop: " + poppedElement.value;
            this.visualDatastructure.remove(poppedElement);
        }
    }
    peek(){
        let peekElementValue = this.adt.peek();

        if (peekElementValue==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = "Peek: " + peekElementValue;
        }
    }
}

class QueueController extends AdtController{
    constructor(adt, visualDatastructure){
        super(adt, visualDatastructure);
    }
    enqueue(elementValue){
        let enqueuedElement = this.adt.enqueue(elementValue);

        if (enqueuedElement==null){
            outputLabel.innerText = "Queue is full";
        }else{
            outputLabel.innerText = "Enqueue: " + enqueuedElement.value;
            this.visualDatastructure.insert(enqueuedElement);
        }
    }
    dequeue(){
        let dequeuedElement = this.adt.dequeue();

        if (dequeuedElement==null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = "Dequeue: " + dequeuedElement.value;
            this.visualDatastructure.remove(dequeuedElement);
        }
    }
    peek(){
        let peekElementValue = this.adt.peek();

        if (peekElementValue == null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = "Peek: " + peekElementValue;
        }
    }
}

class PriorityQueueController extends  AdtController{
    constructor(adt, visualDatastructure){
        super(adt, visualDatastructure);
    }
    insert(elementValue){
        let insertedElement = this.adt.insert(elementValue);

        // The heap array expands if it becomes full, therefore no need to check for null (full data strucutre)

        outputLabel.innerText = "Insert: " + elementValue;
        this.visualDatastructure.insert(insertedElement);
    }
    removeMin(){
        let removedMinElement = this.adt.removeMin();

        if (removedMinElement == null){
            outputLabel.innerText = "Priority Queue is empty";
        }else{
            outputLabel.innerText = "Remove min: " + removedMinElement.value;
            this.visualDatastructure.remove(removedMinElement);
        }
    }
    getMin(){
        let minElementValue = this.adt.getMin();

        if (minElementValue == null){
            outputLabel.innerText = "Priority Queue is empty";
        }else{
            outputLabel.innerText = "Peek: " + minElementValue;
        }
    }
}

