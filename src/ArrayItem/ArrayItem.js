import React from 'react';
import './ArrayItem.css'

function ArrayItem(props) {

    const st = {
        height: `${parseInt(props.number * 100 / props.maxNum)}%`,
        width: `${50 / props.totalItems}%`
    };

    return (
        <div style={st} className="ArrayItem">
        </div>
    );
}

export default ArrayItem;
