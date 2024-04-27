import React from 'react';

const Try = ({ item, index }) => {
    return (
        <li>
            {index}번째
            <b>{item.Eng}</b>:{item.Kor}
        </li>
    );
};

export default Try;
