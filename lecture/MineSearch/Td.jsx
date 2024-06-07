import React, { useContext, useCallback,memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback(
        (e) => {
            e.preventDefault();
            if (halted) {
                return;
            }

            switch (tableData[rowIndex][cellIndex]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                    return;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                    return;
                default:
                    return;
            }
        },
        [tableData[rowIndex][cellIndex], halted]
    );

    console.log('td rendered')

    return useMemo(
        () => <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />,
        [tableData[rowIndex][cellIndex]]
    );
});

//components highlight로 봐도 최적화가 되었는지 모를 때 컴포넌트를 따로 빼 console 찍어보기
const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
    console.log('real td rendered')
    return (
        <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
                {getTdText(data)}
            </td>
    )
})

export default Td;
