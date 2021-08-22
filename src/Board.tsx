import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Board.css';

interface initialStateInterface {
    board: number[];
    isNextX: boolean;
    winner: string;
}

const initialState: initialStateInterface = {
    board: Array(9).fill(0),
    isNextX: true,
    winner: '',
};

const Board = () => {
    const [board, setBoard] = useState(initialState.board);
    const [isNextX, setIsNextX] = useState(initialState.isNextX);
    const [winner, setWinner] = useState(initialState.winner);

    const judgeBoard = (): void => {
        [
            // タテ方向
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // ヨコ方向
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // 斜め
            [0, 4, 8],
            [2, 4, 6],
        ].forEach((value) => {
            if (
                board[value[0]] === board[value[1]] &&
                board[value[1]] === board[value[2]] &&
                board[value[2]] === (isNextX ? 2 : 1)
            ) {
                setWinner(isNextX ? 'x' : 'o');
            }
        });
    };

    useEffect(() => {
        judgeBoard();
    });

    const handleClick = (i: number) => {
        return () => {
            if (winner !== '') return;
            if (board[i] !== 0) return;
            const _board = board.slice();
            _board[i] = isNextX ? 1 : 2;
            setBoard(_board);
            setIsNextX(!isNextX);
        };
    };

    const retryGame = () => {
        setBoard(initialState.board);
        setIsNextX(initialState.isNextX);
        setWinner(initialState.winner);
    };
    return (
        <div>
            <h1 className="next-turn">Next: {isNextX ? 'O' : 'X'}</h1>

            <div className="board">
                <Square handleClick={handleClick(0)} squareContent={board[0]} />
                <Square handleClick={handleClick(1)} squareContent={board[1]} />
                <Square handleClick={handleClick(2)} squareContent={board[2]} />
                <Square handleClick={handleClick(3)} squareContent={board[3]} />
                <Square handleClick={handleClick(4)} squareContent={board[4]} />
                <Square handleClick={handleClick(5)} squareContent={board[5]} />
                <Square handleClick={handleClick(6)} squareContent={board[6]} />
                <Square handleClick={handleClick(7)} squareContent={board[7]} />
                <Square handleClick={handleClick(8)} squareContent={board[8]} />
            </div>
            <h1 className="result">
                {winner !== '' ? `Winner: ${winner}` : null}
            </h1>
            <div>
                {winner !== '' ? (
                    <button className="retry-button" onClick={retryGame}>
                        Retry Game
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Board;
