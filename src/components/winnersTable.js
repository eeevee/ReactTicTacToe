import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WinnersTable() {
	const [winners, setWinners] = useState([]);
	const winner = useSelector((state) => state.winner);

	useEffect(() => {
		if (winner) {
			const winners = JSON.parse(localStorage.getItem("winners")) || [];
			winners.push({ winner, date: new Date().toLocaleDateString() });
			localStorage.setItem("winners", JSON.stringify(winners));
			setWinners(winners.slice(-10));
		}
	}, [winner]);

	useEffect(() => {
		const storedWinners = JSON.parse(localStorage.getItem("winners")) || [];
		setWinners(storedWinners.slice(-10));
	}, []);

	return (
		<div>
			<h2>Últimos 10 vencedores</h2>
			<table>
				<thead>
					<tr>
						<th>Vencedor</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					{winners.map((winner, index) => (
						<tr key={index}>
							<td>{winner.winner}</td>
							<td>{winner.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default WinnersTable;
