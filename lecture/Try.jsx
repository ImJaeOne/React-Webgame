import React, { memo, useState } from 'react';

const Try = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);
    console.log(`TRY : ${result}`);
    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{`TRY : ${result}`}</div>
        </li>
    );
});

Try.displayName = 'Try';

export default Try;
