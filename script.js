// Initialize the grid
const grid = Array(6).fill(null).map(() => Array(6).fill(0));
let givenCells = new Set();
let history = []; // Track changes for undo

// Create the sudoku grid UI
function createGrid() {
    const sudokuGrid = document.getElementById('sudoku-grid');
    sudokuGrid.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = i;
            input.dataset.col = j;
            
            input.addEventListener('input', handleInput);
            input.addEventListener('keydown', handleKeyDown);
            input.addEventListener('dblclick', handleDoubleClick);
            
            cell.appendChild(input);
            sudokuGrid.appendChild(cell);
        }
    }
}

// Handle input in cells
function handleInput(e) {
    const value = e.target.value;
    
    // Only allow numbers 1-6
    if (value && (isNaN(value) || value < 1 || value > 6)) {
        e.target.value = '';
        return;
    }
    
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    // Save to history for undo
    history.push({
        row: row,
        col: col,
        oldValue: grid[row][col],
        newValue: value ? parseInt(value) : 0
    });
    
    grid[row][col] = value ? parseInt(value) : 0;
    
    // Mark as given cell if not empty
    const cellKey = `${row}-${col}`;
    if (value) {
        givenCells.add(cellKey);
        e.target.parentElement.classList.add('given');
    } else {
        givenCells.delete(cellKey);
        e.target.parentElement.classList.remove('given');
    }
    
    clearMessage();
}

// Handle double-click to clear cell
function handleDoubleClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    const cellKey = `${row}-${col}`;
    
    // Save to history
    history.push({
        row: row,
        col: col,
        oldValue: grid[row][col],
        newValue: 0
    });
    
    e.target.value = '';
    grid[row][col] = 0;
    givenCells.delete(cellKey);
    e.target.parentElement.classList.remove('given', 'solved', 'error');
    showMessage('Cell cleared! (Double-click any cell to clear)', 'info');
}

// Handle keyboard navigation
function handleKeyDown(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    let newRow = row;
    let newCol = col;
    
    switch(e.key) {
        case 'ArrowUp':
            newRow = Math.max(0, row - 1);
            e.preventDefault();
            break;
        case 'ArrowDown':
            newRow = Math.min(5, row + 1);
            e.preventDefault();
            break;
        case 'ArrowLeft':
            newCol = Math.max(0, col - 1);
            e.preventDefault();
            break;
        case 'ArrowRight':
            newCol = Math.min(5, col + 1);
            e.preventDefault();
            break;
    }
    
    if (newRow !== row || newCol !== col) {
        const newInput = document.querySelector(`input[data-row="${newRow}"][data-col="${newCol}"]`);
        if (newInput) newInput.focus();
    }
}

// Check if placing a number is valid
function isValid(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 6; x++) {
        if (x !== col && grid[row][x] === num) {
            return false;
        }
    }
    
    // Check column
    for (let x = 0; x < 6; x++) {
        if (x !== row && grid[x][col] === num) {
            return false;
        }
    }
    
    // Check 2x3 region (2 rows, 3 columns)
    const startRow = Math.floor(row / 2) * 2;
    const startCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            const currentRow = startRow + i;
            const currentCol = startCol + j;
            if ((currentRow !== row || currentCol !== col) && 
                grid[currentRow][currentCol] === num) {
                return false;
            }
        }
    }
    
    return true;
}

// Solve sudoku using backtracking
function solveSudoku(grid) {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 6; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Validate the current grid
function validateGrid() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
            if (grid[row][col] !== 0) {
                const num = grid[row][col];
                grid[row][col] = 0;
                if (!isValid(grid, row, col, num)) {
                    grid[row][col] = num;
                    return false;
                }
                grid[row][col] = num;
            }
        }
    }
    return true;
}

// Update the grid display
function updateDisplay() {
    const inputs = document.querySelectorAll('.sudoku-grid input');
    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const cellKey = `${row}-${col}`;
        
        if (grid[row][col] !== 0) {
            input.value = grid[row][col];
            
            if (!givenCells.has(cellKey)) {
                input.parentElement.classList.add('solved');
            }
        }
    });
}

// Solve button handler
function handleSolve() {
    clearMessage();
    
    // Validate current grid
    if (!validateGrid()) {
        showMessage('Invalid puzzle! Please check your input.', 'error');
        return;
    }
    
    // Check if grid has any numbers
    const hasNumbers = grid.some(row => row.some(cell => cell !== 0));
    if (!hasNumbers) {
        showMessage('Please enter some numbers first!', 'info');
        return;
    }
    
    // Create a copy for solving
    const gridCopy = grid.map(row => [...row]);
    
    // Solve the puzzle
    if (solveSudoku(gridCopy)) {
        // Update the original grid with solution
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                grid[i][j] = gridCopy[i][j];
            }
        }
        updateDisplay();
        showMessage('✅ Puzzle solved successfully!', 'success');
    } else {
        showMessage('❌ No solution exists for this puzzle!', 'error');
    }
}

// Clear button handler
function handleClear() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            grid[i][j] = 0;
        }
    }
    givenCells.clear();
    history = []; // Clear history
    
    const inputs = document.querySelectorAll('.sudoku-grid input');
    inputs.forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('given', 'solved', 'error');
    });
    
    clearMessage();
    showMessage('Grid cleared!', 'info');
}

// Undo button handler
function handleUndo() {
    if (history.length === 0) {
        showMessage('Nothing to undo!', 'info');
        return;
    }
    
    const lastChange = history.pop();
    const { row, col, oldValue } = lastChange;
    
    grid[row][col] = oldValue;
    
    const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
    if (input) {
        input.value = oldValue !== 0 ? oldValue : '';
        
        const cellKey = `${row}-${col}`;
        if (oldValue !== 0) {
            givenCells.add(cellKey);
            input.parentElement.classList.add('given');
        } else {
            givenCells.delete(cellKey);
            input.parentElement.classList.remove('given', 'solved', 'error');
        }
    }
    
    showMessage('Undone!', 'info');
}

// Load example puzzle
function handleExample() {
    handleClear();
    
    // Example puzzle from the image (Gemstone Hard #173)
    const example = [
        [0, 0, 4, 0, 0, 0],
        [0, 3, 0, 5, 0, 0],
        [4, 0, 0, 0, 3, 0],
        [2, 0, 0, 0, 5, 0],
        [0, 1, 0, 4, 0, 0],
        [0, 0, 2, 0, 0, 0]
    ];
    
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            grid[i][j] = example[i][j];
            if (example[i][j] !== 0) {
                givenCells.add(`${i}-${j}`);
            }
        }
    }
    
    updateDisplay();
    
    // Mark given cells
    const inputs = document.querySelectorAll('.sudoku-grid input');
    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        if (grid[row][col] !== 0) {
            input.parentElement.classList.add('given');
        }
    });
    
    showMessage('Example puzzle loaded! Click "Solve Puzzle" to see the solution.', 'info');
}

// Message display functions
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}

function clearMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    
    document.getElementById('solve-btn').addEventListener('click', handleSolve);
    document.getElementById('clear-btn').addEventListener('click', handleClear);
    document.getElementById('undo-btn').addEventListener('click', handleUndo);
    document.getElementById('example-btn').addEventListener('click', handleExample);
    
    showMessage('Enter your LinkedIn Mini Sudoku puzzle and click Solve! (Double-click cells to clear)', 'info');
});
