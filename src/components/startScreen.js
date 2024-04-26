import React from "react";
import TicTacToe from "./TicTacToe";

function StartScreen() {
	const [difficulty, setDifficulty] = React.useState(null);

	if (difficulty) {
		return <TicTacToe difficulty={difficulty} />;
	}

	return (
		<div>
			<h1>Tic Tac Toe</h1>
			<button onClick={() => setDifficulty("human")}>Jogue com outra pessoa</button>
			<button onClick={() => setDifficulty("easy")}>Jogue no Fácil</button>
			<button onClick={() => setDifficulty("hard")}>Jogue no difícl</button>
		</div>
	);
}

export default StartScreen;
