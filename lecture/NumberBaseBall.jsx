import React from 'react';
const { useState, useRef } = React;
import Try from './Try';

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseBall = () => {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers);
    const [result, setResult] = useState('');
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런');
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런]' }];
            });
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputRef.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, { try: value, result: `${strike}스트라이크, ${ball}볼` }];
                });
                setValue('');
                inputRef.current.focus();
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>숫자 야구</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} id="number" ref={inputRef} value={value} onChange={onChangeInput}></input>
                <button>입력!!</button>
            </form>
            <div>시도 횟수: {tries.length}</div>
            <div>{answer}</div>
            <div> {result} </div>
            <ul>
                {tries.map((v, i) => {
                    console.log(v);
                    return <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />;
                })}
            </ul>
        </>
    );
};

export default NumberBaseBall;
