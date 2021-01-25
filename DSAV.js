let adtController = null;
let animationSequencer = null;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createADT(type) {
    let dtSelect = document.getElementById("datastructure");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;

    // parseInt used to prevent non-numeric values from entering the system
    let size = document.getElementById("adt_size").value === "" ? 5 : parseInt(document.getElementById("adt_size").value);
    let adt = null;
    let visualDatastructure = null;

    animationSequencer = new AnimationSequencer();

    clearCanvas();
    toggleControlInputs(true);

    switch (selected + "-" + type) {
        case "simple-array-stack":
            adt = new SimpleArrayStack(size);
            console.log(adt.datastructure);
            visualDatastructure = new VisualSimpleArray(adt.datastructure);
            adtController = new StackController(adt, visualDatastructure);
            break;
        case "singly-linked-list-stack":
            adt = new SinglyLinkedListStack();
            visualDatastructure = new VisualSinglyLinkedList(adt.datastructure);
            adtController = new StackController(adt, visualDatastructure);
            break;
        case "circular-array-queue":
            adt = new CircularArrayQueue(size);
            visualDatastructure = new VisualCircularArray(adt.datastructure);
            adtController = new QueueController(adt, visualDatastructure);
            break;
        case "doubly-linked-list-queue":
            adt = new DoublyLinkedListQueue();
            visualDatastructure = new VisualDoublyLinkedList(adt.datastructure);
            adtController = new QueueController(adt, visualDatastructure);
            break;
        case "heap-array-priority-queue":
            adt = new HeapArrayPriorityQueue(size);
            visualDatastructure = new VisualHeapArray(adt.datastructure);
            adtController = new PriorityQueueController(adt, visualDatastructure);
            break;
        default:
            console.log("Error in createADT function. type = " + type);
    }
}

// Code for this function adapted from https://stackoverflow.com/questions/1202087/how-do-i-disable-all-input-buttons-without-using-jquery
// Sets the inputs withing the interaction panel as enabled or disabled, depending on the state given
function toggleControlInputs(state) {
    let inputsInteractionPanel = document.getElementById("interaction-panel").getElementsByTagName("INPUT");
    let inputsVisualizationControlPanel = document.getElementById("visualization-control-panel").getElementsByTagName("INPUT");

    // The state is inverted, so that if the state is "true", then objects are enabled (more intuitive)

    for (let i = 0; i < inputsInteractionPanel.length; i++) {
        inputsInteractionPanel[i].disabled = !state;
    }

    for (let i = 0; i < inputsVisualizationControlPanel.length; i++) {
        inputsVisualizationControlPanel[i].disabled = !state;
    }
}

function handleImplementationDropdownChange(dropdown){
    document.getElementById('create_adt').disabled = dropdown.options[dropdown.selectedIndex].value==='select';

    // Disable size input box when a linked list structure has been selected
    if (dropdown.options[dropdown.selectedIndex].value.includes("linked-list")){
        document.getElementById('adt_size').disabled = true;
    }else{
        document.getElementById('adt_size').disabled = false;
    }
}

