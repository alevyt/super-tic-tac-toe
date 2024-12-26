let currentPlayer = 'X',
    win  = false;
const   container = document.getElementById('container'),
        currentPlayerField = document.getElementById('currentPlayer'),
        statusField = document.getElementById('status');

function createCells () {

    let bigTable = document.createElement('table');
    bigTable.id = 'bigTable';

    for (let i = 0; i < 3; i++){
        let row = document.createElement('tr');
        for (let j = 0; j < 3; j++){
            let cell = document.createElement('td');
            let smallTable = document.createElement('table');
            for(let k = 0; k < 3; k++) {
                let innerRow = document.createElement('tr');
                for (let l = 0; l < 3; l++) {
                    let innerCell = document.createElement('td');
                    innerCell.id = 'c' + i + j + k + l;
                    innerCell.onclick = cellClick;
                    innerRow.appendChild(innerCell);
                }
                smallTable.appendChild(innerRow);
                smallTable.classList.add('active');
                smallTable.id = 't' + i + j;
            }
            cell.appendChild(smallTable);
            row.appendChild(cell);
        }
        bigTable.appendChild(row);
    }

    container.appendChild(bigTable);

}

function checkWin(table) {
    
    const rows = table.rows;
    const tableArray = [];
    let draw = true;
    
    for (let i = 0; i < rows.length; i++) {
        const rowArray = [];
        const cells = rows[i].cells;
        
        for (let j = 0; j < cells.length; j++) {
            rowArray.push(cells[j].innerHTML);
            if(cells[j].innerHTML == '') {
                draw = false;
            }
        }
        
        tableArray.push(rowArray);
    }

    for(let i = 0; i < 3; i++ ) {
        if((tableArray[0][i] == currentPlayer && tableArray[1][i] == currentPlayer && tableArray[2][i] == currentPlayer) ||(tableArray[i][0] == currentPlayer && tableArray[i][1] == currentPlayer && tableArray[i][2] == currentPlayer)){
            win = true;
            return [win, draw];
        }
    }

    if((tableArray[0][0] == currentPlayer && tableArray[1][1] == currentPlayer && tableArray[2][2] == currentPlayer) || (tableArray[2][0] == currentPlayer && tableArray[1][1] == currentPlayer && tableArray[0][2] == currentPlayer)){
        win = true;
        return [win, draw];
    }

    return [win, draw];
}

function hasParentWithClass(element, className) {
    while (element) {
        if (element.classList && element.classList.contains(className)) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
}

function removeClassFromAll(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(className);
    });
}

function cellClick(event) {
    let cell = event.target,
        currentTable = cell.parentNode.parentNode;

    if (hasParentWithClass(cell, 'active') && cell.innerHTML == ''){
        removeClassFromAll('active');
        
        

        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
        let result = checkWin(currentTable);
        console.log(result);
        if(result[0]){
            currentTable.parentNode.classList.add(currentPlayer === 'X' ? 'x' : 'o');
            currentTable.parentNode.innerHTML = currentPlayer;
            win = false;
        } else if(result[1]) {
            currentTable.parentNode.classList.add('draw');
        };

        let nextTable = document.getElementById('t' + cell.id[3] + cell.id[4]);
        if(nextTable) {
            nextTable.classList.add('active');
        } else {
            document.querySelectorAll('td>table:not(.draw)').forEach(element => {
                element.classList.add('active');
            })
        }
        currentPlayer = currentPlayer === 'X' ? '0' :'X';
        currentPlayerField.innerHTML = currentPlayer;
    }

}

createCells();
currentPlayerField.innerHTML = currentPlayer;
statusField.innerHTML = 'to move';


