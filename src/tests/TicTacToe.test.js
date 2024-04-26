import { render, fireEvent } from '@testing-library/react';
import TicTacToe from './../components/TicTacToe';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/reducer';

const store = createStore(reducer);

test('renders TicTacToe', () => {
  render(<Provider store={store}><TicTacToe /></Provider>);
});

test('renders an empty TicTacToe board', () => {
  const { container } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
  const buttons = container.querySelectorAll('button.cell');
  expect(buttons).toHaveLength(9);
  buttons.forEach(button => {
    expect(button.innerHTML).toBe('');
  });
});

test('clicking on a cell updates the board state', () => {
  const { getAllByRole } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
  const buttons = getAllByRole('button');
  fireEvent.click(buttons[0]);
  expect(buttons[0].innerHTML).toBe('X');
  fireEvent.click(buttons[1]);
  expect(buttons[1].innerHTML).toBe('O');
});

test('game ends in a draw', () => {
	const { getAllByRole, getByText } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
	const buttons = getAllByRole('button');

	fireEvent.click(buttons[0]); // X
	fireEvent.click(buttons[1]); // O
	fireEvent.click(buttons[2]); // X
	fireEvent.click(buttons[4]); // O
	fireEvent.click(buttons[3]); // X
	fireEvent.click(buttons[5]); // O
	fireEvent.click(buttons[8]); // X
	fireEvent.click(buttons[6]); // X
	fireEvent.click(buttons[7]); // O

	expect(getByText('Parece que o jogo empatou')).toBeInTheDocument();
  });

  test('player X wins', () => {
	const { getAllByRole, getByText } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
	const buttons = getAllByRole('button');

	fireEvent.click(buttons[0]); // X
	fireEvent.click(buttons[3]); // O
	fireEvent.click(buttons[1]); // X
	fireEvent.click(buttons[4]); // O
	fireEvent.click(buttons[2]); // X

	expect(getByText('Jogador X venceu!')).toBeInTheDocument();
  });

  test('player O wins', () => {
	const { getAllByRole, getByText } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
	const buttons = getAllByRole('button');

	fireEvent.click(buttons[0]); // X
	fireEvent.click(buttons[3]); // O
	fireEvent.click(buttons[1]); // X
	fireEvent.click(buttons[4]); // O
	fireEvent.click(buttons[7]); // X
	fireEvent.click(buttons[5]); // O

	expect(getByText('Jogador O venceu!')).toBeInTheDocument();
  });

  test('no moves allowed after game end', () => {
	const { getAllByRole, getByText } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
	const buttons = getAllByRole('button');

	fireEvent.click(buttons[0]); // X
	fireEvent.click(buttons[3]); // O
	fireEvent.click(buttons[1]); // X
	fireEvent.click(buttons[4]); // O
	fireEvent.click(buttons[2]); // X

	fireEvent.click(buttons[5]); // O

	expect(buttons[5].innerHTML).toBe('');
  });

  test('no moves allowed in an occupied cell', () => {
	const { getAllByRole } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
	const buttons = getAllByRole('button');

	fireEvent.click(buttons[0]); // X

	fireEvent.click(buttons[0]); // O

	expect(buttons[0].innerHTML).toBe('X');
  });

  test('game resets correctly', async () => {
	const { container, getByText } = render(<Provider store={store}><TicTacToe difficulty={'human'} /></Provider>);
	const buttons = container.querySelectorAll('button.cell');

	fireEvent.click(buttons[0]); // X

	fireEvent.click(getByText('Reiniciar'));

	expect(getByText('Jogue com outra pessoa')).toBeInTheDocument();
  });
