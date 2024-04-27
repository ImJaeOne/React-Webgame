import React from 'react';
const { useState, useRef } = React;
import Try from './Try';

const NumberBaseBall = () => {
    const inputRef = useRef(null);
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [third, setThird] = useState(Math.ceil(Math.random() * 9));
    const [fourth, setFourth] = useState(Math.ceil(Math.random() * 9));
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState('');

    const fruits = [
        { Eng: 'apple', Kor: '사과' },
        { Eng: 'banana', Kor: '바나나' },
        { Eng: 'grape', Kor: '포도' },
        { Eng: 'orange', Kor: '오렌지' },
        { Eng: 'bear', Kor: '배' },
    ];

    const problem = [{ first }, { second }, { third }, { fourth }];

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(typeof `${first}${second}${third}${fourth}`);
        setAnswer(e.target.children.number.value);
        setTries(+1);

        if (e.target.children.number.value === `${first}${second}${third}${fourth}`) {
            setResult('정답');
            e.target.children.number.value = '';
        } else {
            setResult('실패');
            e.target.children.number.value = '';
        }
    };

    return (
        <>
            <h1>숫자 야구</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} id="number" ref={inputRef}></input>
                <button>입력!!</button>
            </form>
            <div>내가 입력한 답:{answer}</div>
            <div>
                {first}
                {second}
                {third}
                {fourth}
            </div>
            <div>시도 횟수: {tries.length}</div>
            <div>{result}</div>
            <ul>
                {fruits.map((item, index) => {
                    return <Try key={item.Eng + item.Kor} item={item} index={index} />;
                })}
            </ul>
        </>
    );
};

export default NumberBaseBall;
