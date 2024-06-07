import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER: {
            //state.winner = action.winner; 직접 바꾸면 안됨.
            return {
                ...state,
                winner: action.winner,
            };
        }
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn; // immer라는 라이브러리로 가독성 해결
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                winner: action.winner,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(winner);
        
        if (win) {
            //승리 시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME ,winner: turn});
        } else {
            let all = true; // 무승부라는 뜻
            tableData.forEach((row) => {
                //무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false; // 게임이 끝나지 않음
                    }
                });
            });
            if (all) {
                dispatch({ type: RESET_GAME , winner:'무승부'});
            }
            dispatch({ type: CHANGE_TURN });
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {winner && <div>{winner === '무승부' ? '무승부' : `${winner}님의 승리`}</div>}
        </>
    );
};

export default TicTacToe;
