let canvas = document.getElementById("canvas-area");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "15px Arial";

let topBottomMargin = 50;
let leftMargin = 75;

let elementBoxLabelY = 20; // The Y coord at which pointer labels (head, tail) are drawn
let boxWidth = 65; // For VisualBox
let boxHeight = 65; // For VisualBox
let circleRadius = 32.5; // For VisualCircle

// Multipliers for spacing between tree nodes
let treeNodeSpacingFactorX = 0.5;
let treeNodeSpacingFactorY = 0.5;

let animationSteps = 200; // animation speed, lower is faster

let outputLabel = document.getElementById("output_msg");

toggleControlInputs(false); // When page is loaded, disable visualization controls