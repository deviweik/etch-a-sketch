const container = document.querySelector("#main-container");

const height = window.innerHeight - 100;
const width = window.innerWidth - 100;


function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let parentDiv = document.createElement('div');
        parentDiv.setAttribute('id', `parent-div${i+1}`);
        parentDiv.setAttribute('class', 'parent-div');
        container.appendChild(parentDiv);
        for (let j = 0; j < gridSize; j++) {
            let childDiv = document.createElement('div');
            childDiv.setAttribute('id', `child-div${j+1} of parent-div${i+1}`);
            childDiv.setAttribute('class', 'child-div');
            parentDiv.appendChild(childDiv);
            //childDiv.textContent = j+1;
            if (width > height) {
                childDiv.setAttribute('style', `height: ${height/gridSize}px; width: ${height/gridSize}px;`);
            } else {
                childDiv.setAttribute('style', `height: ${width/gridSize}px; width: ${width/gridSize}px;`);
            }
        }
    }
    const childDivs = document.querySelectorAll(".child-div");

    childDivs.forEach(div => {
        div.addEventListener("mouseover", () => {
            addColor(div);
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
// Nested for loop to create 16x16 grid of divs
// first loop creates 16 parent divs organized horizontally across the page
// second loop creates 16 child divs organized vertically inside each parent div

function addColor(div) {
    div.style.backgroundColor = 'red';
/* // Uncomment this code to have the squares disappear after 5 seconds
    setTimeout(() => {
        div.style.backgroundColor = 'white';
    }, 5000); */
}

const button = document.querySelector('button');

button.addEventListener("click", () => {
    let newGridSize = prompt("What size grid would you like to work with?");
    if (newGridSize > 100) {
        newGridSize = 100;
    }
    deleteGrid();
    createGrid(newGridSize);
});

