import React, { useRef, useEffect, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowData === ref.current[0], rowIndex === ref.current[1], dispatch === ref.current[2]);
        ref.current = [rowData, rowIndex, dispatch];
    }, [rowData, rowIndex, dispatch]);
    return (
        <tr>
            {Array(rowData.length)
                .fill()
                .map((td, i) => (
                    <Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}>
                        {''}
                    </Td>
                ))}
        </tr>
    );
});

export default Tr;
