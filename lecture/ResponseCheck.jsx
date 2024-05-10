import React, { useState } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeOut = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                },Math.floor(Math.random() * 1000) +2000)
        } else if (state === 'ready') {
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') {
            setState('waiting');
            setMessage('클릭해서 시작하세요.')
            setResult([]);
        }
    };

    const renderAverage = () => {
        result.length === 0 ? null : <div>평균 시간 : {result.reduce((a, c) => (a + c) / result.length)}ms</div>;
    };
    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage}
        </>
    );
};

export default ResponseCheck;
