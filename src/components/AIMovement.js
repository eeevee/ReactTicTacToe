function AIMovement({ board, handleClick, difficulty, checkDraw, checkWin }) {
	if (difficulty === 'easy'){
		makeRandomAIMove();
	} else {
		makeOptimalAIMove();
	}

	function makeRandomAIMove() {
        let availableMoves = [];
        for (let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++) {
                if (!board[i][j]) availableMoves.push([i, j]);
            }
        }

        if (availableMoves.length) {
            const [i,j] = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            handleClick(i, j);
        }
    }

	function makeOptimalAIMove() {
		let bestScore = -Infinity;
		let move;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!board[i][j]) {
					board[i][j] = 'O';
					let score = minimax(board, 0, false);
					board[i][j] = null;
					if (score > bestScore) {
						bestScore = score;
						move = { i, j };
					}
				}
			}
		}

		if (move) {
			handleClick(move.i, move.j);
		}
	}

	function minimax(board, depth, isMaximizing) {
		let winner = checkWin(board);
		if (winner) {
			return winner === 'O' ? 1 : -1;
		}

		if (checkDraw(board)) {
			return 0;
		}

		if (isMaximizing) {
			let bestScore = -Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (!board[i][j]) {
						board[i][j] = 'O';
						let score = minimax(board, depth + 1, false);
						board[i][j] = null;
						bestScore = Math.max(score, bestScore);
					}
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (!board[i][j]) {
						board[i][j] = 'X';
						let score = minimax(board, depth + 1, true);
						board[i][j] = null;
						bestScore = Math.min(score, bestScore);
					}
				}
			}
			return bestScore;
		}
	}
}

export default AIMovement;
