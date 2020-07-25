import React from 'react';
import './ArraySort.css'

import ArrayItem from '../ArrayItem/ArrayItem.js';
import {createSortingAlgorithm} from '../sortingAlgos/sortingAlgos.js';

class ArraySort extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            items: this._generateItems(this.props.length, this.props.minNum, this.props.maxNum),
            sorting: false
        }
    }

    _generateItems(number, min, max) {
        const items = [];

        for (let i = 0; i < number; ++i) {
            const randomNum = Math.random() * (max - min) + min;
            items.push(randomNum);
        }

        return items;
    }

    _reset() {
        const state = this.state;
        state.items = this._generateItems(this.props.length, this.props.minNum, this.props.maxNum);
        state.sorting = false;

        this.setState(state);
    }

    async _sort(algo) {
        const state = this.state;
        state.sorting = true;
        this.setState(state);

        const update = () => {
            this.setState(state);
        }

        const sortingAlgorithm = createSortingAlgorithm(algo, update, 10);
        await sortingAlgorithm.sort(state.items);

        state.sorting = false;
        this.setState(state);
    }

    render(props) {
        const items = [];

        for (let i = 0; i < this.state.items.length; ++i) {
            items.push(<ArrayItem key={i} number={this.state.items[i]} maxNum={this.props.maxNum} totalItems={this.props.length}/>);
        }

        return (
            <div className="ArraySort">
                <div className="ItemContainer">
                    {items}
                </div>
                <div className="sortBtnRow">
                    <button className="sortBtn" disabled={this.state.sorting} onClick={() => this._reset()}>Generate New Array</button>
                    <button className="sortBtn" disabled={this.state.sorting} onClick={async () => await this._sort("merge")}>Merge Sort</button>
                    <button className="sortBtn" disabled={this.state.sorting} onClick={async () => await this._sort("bubble")}>Bubble Sort</button>
                </div>
            </div>
        );
    }
}

export default ArraySort;
