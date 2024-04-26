import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWinner } from '../actions/actions';
import StartScreen from './startScreen';
import AIMovement from './AIMovement';

function useTicTacToe(difficulty) {
    const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill(null)));
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(null);

    useEffect(() => {
        if (player === 2 && !winner && difficulty != 'human') {
			AIMovement({ board, handleClick, difficulty, checkDraw, checkWin });
        }
    }, [player]);

    function handleClick(row, col) {
        if (board[row][col] || winner) return;

        const newBoard = [...board];
        newBoard[row][col] = player === 1 ? 'X' : 'O';

		setWinner(checkWin(newBoard));

        if(!winner && checkDraw(newBoard)) {
			setDraw(true);
        } else {
            setPlayer(3 - player);
        }

        setBoard(newBoard);
    }

    function checkWin(board) {
        for(let i = 0; i < 3; i++) {
            if(board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return board[i][0];
            if(board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return board[0][i];
        }

        if(board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[0][0];
        if(board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[0][2];

        return false;
    }

	function checkDraw(board) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!board[i][j]) return false;
			}
		}

		return true;
	}

    return { board, winner, handleClick, draw };
}

function TicTacToe({ difficulty }) {
	const dispatch = useDispatch();
	const [restart, setRestart] = useState(false);
    const { board, winner, handleClick, draw } = useTicTacToe(difficulty);

	useEffect(() => {
		if (winner || draw) {
			dispatch(updateWinner(winner || 'Empate'));
		}
	}, [winner, draw]);

	if (restart) {
		return <StartScreen />;
	}

    return (
        <div className="tic-tac-toe">
            {board.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <button key={j} className="cell" onClick={() => handleClick(i, j)}>
                            {cell}
                        </button>
                    ))}
                </div>
            ))}
            {winner && <div className="winner">Jogador {winner} venceu!</div>}
            {draw && !winner && <div className="winner">Parece que o jogo empatou</div>}
			<button onClick={() => { setRestart(true)}}>Reiniciar</button>
        </div>
    );
}

export default TicTacToe;
