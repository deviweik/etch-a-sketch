const container = document.querySelector("#main-container");

const height = window.innerHeight - 50;
const width = window.innerWidth - 50;

let allowDraw = false; //used for enabling drawing on click on canvas container

// Helper functions
function rgbToHex(rgb) {
    var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      return rgb;
    }
    var r = parseInt(match[1], 10);
    var g = parseInt(match[2], 10);
    var b = parseInt(match[3], 10);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Brush Color
const brushColorPicker = document.querySelector('#brush-color');

let brushColor = brushColorPicker.value;
let temp = brushColor;

brushColorPicker.addEventListener('input', () => {
    brushColor = brushColorPicker.value;
    temp = brushColor;
});

// Canvas Color
const canvasColorPicker = document.querySelector('#canvas-color');

let canvasColor = canvasColorPicker.value;

canvasColorPicker.addEventListener('input', () => {
    
    for (let i = 1; i <= canvasSize; i++) {
        for (let j = 1; j <= canvasSize; j++) {
            let childDiv = document.querySelector(`#p${i}-c${j}`);
            if (rgbToHex(childDiv.style.backgroundColor) === canvasColor) {
                childDiv.style.backgroundColor = canvasColorPicker.value;
            }
            console.log(rgbToHex(childDiv.style.backgroundColor))
            console.log(canvasColor)
            
        }
    }
    canvasColor = canvasColorPicker.value;
});

// Toggle eraser
const eraserButton = document.querySelector('#eraser-button');
eraserButton.addEventListener('click', () => {
    toggleEraser()
});

function toggleEraser() {
    if (brushColor !== canvasColor) {
        brushColor = canvasColor;
        eraserButton.setAttribute("class", "selected");
    } else {
        brushColor = temp;
        eraserButton.setAttribute("class", "settings-button");
    }
}

// Clear canvas
const clearButton = document.querySelector('#clear-button');
const clearConfirmButton = document.getElementById("clear-confirm-button");
const clearCancelButton = document.getElementById("clear-cancel-button");
const clearModal = document.getElementById("confirm-clear");

clearButton.addEventListener('click', () => {
    clearModal.style.display = "flex";
});

clearConfirmButton.addEventListener("click", function() {
    clearModal.style.display = "none";
    createGrid(canvasSize);
});
  
clearCancelButton.addEventListener("click", function() {
    clearModal.style.display = "none";
});

// Toggle grid lines
let grid = true;
const gridButton = document.querySelector('#grid-button');
gridButton.addEventListener('click', () => {
    console.log(grid)
    if (grid == false) {
        let childDivs = document.querySelectorAll('.child-div');
        childDivs.forEach(childDiv => {
            childDiv.setAttribute('class', 'child-div-border');
        });
        grid = true;
    } else {
        let childDivs = document.querySelectorAll('.child-div-border');
        childDivs.forEach(childDiv => {
            childDiv.setAttribute('class', 'child-div');
        });
        grid = false;
    }   
});

// Allow Drawing event listeners
container.addEventListener("mousedown", (e) => {
    allowDraw = true;
    let divID = e.target.id;
    let matches = divID.match(/\d+/g);
    let x = parseInt(matches[0]);
    let y = parseInt(matches[1]);
    for (let i = x-Math.floor(brushSize/2); i <= x+Math.floor(brushSize/2); i++) {
        for (let j = y-Math.floor(brushSize/2); j <= y+Math.floor(brushSize/2); j++) {
            if (i > 0 && i <= canvasSize && j > 0 && j <= canvasSize) {
                let pixel = document.querySelector(`#p${i}-c${j}`);
                pixel.style.backgroundColor = brushColor;   
            }
        }
    }
});
container.addEventListener("mouseup", () => {
    allowDraw = false;
});

// Canvas size slider
const canvasSizeSlider = document.querySelector('#canvas-size-slider');
const canvasSizeLabel = document.querySelector('#current-canvas-size');

const sizeConfirmButton = document.getElementById("size-confirm-button");
const sizeCancelButton = document.getElementById("size-cancel-button");
const sizeModal = document.getElementById("confirm-size-change");

let canvasSize = canvasSizeSlider.value;
canvasSizeLabel.textContent = `${canvasSize.toString()} x ${canvasSize.toString()}`;

canvasSizeSlider.addEventListener('input', () => {
    canvasSizeLabel.textContent = `${canvasSizeSlider.value.toString()} x ${canvasSizeSlider.value.toString()}`;
});

canvasSizeSlider.addEventListener('mouseup', () => {
    sizeModal.style.display = "flex";
});

sizeConfirmButton.addEventListener("click", function() {
    sizeModal.style.display = "none";
    if (canvasSize !== canvasSizeSlider.value) {
        canvasSize = canvasSizeSlider.value;
        createGrid(canvasSize);
    }
    
});
  
sizeCancelButton.addEventListener("click", function() {
    sizeModal.style.display = "none";
    canvasSizeSlider.value = canvasSize;
    canvasSizeLabel.textContent = `${canvasSizeSlider.value.toString()} x ${canvasSizeSlider.value.toString()}`;
});

// Brush Size slider
const brushSizeSlider = document.querySelector('#brush-size-slider');
const brushSizeLabel = document.querySelector('#current-brush-size');

let brushSize = brushSizeSlider.value;
brushSizeLabel.textContent = brushSize.toString();

brushSizeSlider.addEventListener('input', () => {
    brushSizeLabel.textContent = brushSizeSlider.value.toString();
    brushSize = brushSizeSlider.value;
});

// Shading level slider
const shadingSlider = document.querySelector('#shading-slider');
const shadingLabel = document.querySelector('#shading-label');





function addColor(div) {
    let divID = div.id;
    let matches = divID.match(/\d+/g);
    let x = parseInt(matches[0]);
    let y = parseInt(matches[1]);

    for (let i = x-Math.floor(brushSize/2); i <= x+Math.floor(brushSize/2); i++) {
        for (let j = y-Math.floor(brushSize/2); j <= y+Math.floor(brushSize/2); j++) {
            if (i > 0 && i <= canvasSize && j > 0 && j <= canvasSize) {
                let pixel = document.querySelector(`#p${i}-c${j}`);
                pixel.style.backgroundColor = brushColor;   
            }
        }
    }
}

function createGrid(gridSize) {
    // Nested for loop to create 16x16 grid of divs
    // first loop creates 16 parent divs organized horizontally across the page
    // second loop creates 16 child divs organized vertically inside each parent div
    deleteGrid();
    for (let i = 0; i < gridSize; i++) {
        let parentDiv = document.createElement('div');
        parentDiv.setAttribute('id', `p-${i+1}`);
        parentDiv.setAttribute('class', 'parent-div');
        container.appendChild(parentDiv);
        for (let j = 0; j < gridSize; j++) {
            let childDiv = document.createElement('div');
            childDiv.setAttribute('id', `p${i+1}-c${j+1}`);
            if (grid === true) {
                childDiv.setAttribute('class', 'child-div-border');
            } else {
                childDiv.setAttribute('class', 'child-div');
            }
            
            parentDiv.appendChild(childDiv);
            //childDiv.textContent = j+1;
            if (width > height) {
                childDiv.setAttribute('style', `height: ${height/gridSize}px; width: ${height/gridSize}px;`);
            } else {
                childDiv.setAttribute('style', `height: ${width/gridSize}px; width: ${width/gridSize}px;`);
            }
            childDiv.style.backgroundColor = canvasColor;
        }
    }

    let childDivs = 0;
    if (grid === true) {
        childDivs = document.querySelectorAll(".child-div-border");
    } else {
        childDivs = document.querySelectorAll(".child-div");
    }
    
    childDivs.forEach(div => {
        div.addEventListener("mouseover", () => {
            if (allowDraw === true) {
                addColor(div);
            }
        }); 
    });
}

function deleteGrid() {
    const parentDivs = document.querySelectorAll('.parent-div');
    
    parentDivs.forEach(div => {
        let childDivs = div.querySelectorAll('.child-div');
        childDivs.forEach(childDiv => {
            div.removeChild(childDiv);
        });
        container.removeChild(div);
    });
    
}

createGrid(16);







