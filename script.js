console.log('script works!');

let currentPlayer = 'X',
    win  = false,
    container = document.getElementById('container');

    console.log(container);
    
function createCells () {

    let bigTable = document.createElement('table');

    for (let i = 0; i < 3; i++){
        let row = document.createElement('tr');
        for (let j = 0; j < 3; j++){
            let cell = document.createElement('td');
            let smallTable = document.createElement('table');
            for(let k = 0; k < 3; k++) {
                let innerRow = document.createElement('tr');
                for (let l = 0; l < 3; l++) {
                    let innerCell = document.createElement('td');
                    innerCell.id = 'c' + ((i*3) + (j + 1)) + k + l;
                    innerCell.onclick = cellClick;
                    innerRow.appendChild(innerCell);
                }
                smallTable.appendChild(innerRow);
            }
            cell.appendChild(smallTable);
            row.appendChild(cell);
        }
        bigTable.appendChild(row);
    }

    container.appendChild(bigTable);

}

function checkWin(table) {

    const rows = table.rows; // Get all rows of the table
    const tableArray = []; // Initialize the 2D array
    
    for (let i = 0; i < rows.length; i++) {
        const rowArray = []; // Array to hold cells of the current row
        const cells = rows[i].cells; // Get all cells in the row
        
        for (let j = 0; j < cells.length; j++) {
            rowArray.push(cells[j].innerHTML); // Add cell to the current row array
        }
        
        tableArray.push(rowArray); // Add row array to the 2D table array
    }

    for(let i = 0; i < 3; i++ ) {
        if((tableArray[0][i] == currentPlayer && tableArray[1][i] == currentPlayer && tableArray[2][i] == currentPlayer) ||(tableArray[i][0] == currentPlayer && tableArray[i][1] == currentPlayer && tableArray[i][2] == currentPlayer)){
            win = true;
            return win;
        }
    }

    if((tableArray[0][0] == currentPlayer && tableArray[1][1] == currentPlayer && tableArray[2][2] == currentPlayer) || (tableArray[2][0] == currentPlayer && tableArray[1][1] == currentPlayer && tableArray[0][2] == currentPlayer)){
        win = true;
        return win;
    }



    
    console.log(tableArray); // Output the 2D array
    return win;

}

function cellClick(event) {
    let cell = event.target;

    
    if (!win && cell.innerHTML == ''){
        cell.innerHTML = currentPlayer;
        if(checkWin(cell.parentNode.parentNode)){
          console.log(currentPlayer, ' wins');  
        };
        currentPlayer = currentPlayer === 'X' ? '0' :'X';
    }
    // console.log(currentPlayer);
}

createCells();



// console.log(cells);
