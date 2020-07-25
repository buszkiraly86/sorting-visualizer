
async function wait(time) {
    return new Promise(res => {
        setTimeout(
            res,
            time
        );
    });
};

class MergeSort {

    constructor(update, wait) {
        this.update = update;
        this.wait = wait;
    }

    async sort(items) {
        return this._sort(items, 0, items.length);
    }

    async _sort(items, begin, end)   {
        if (end - begin === 1) return [items[begin]];
        else if (end - begin === 0) return [];

        const middle = begin + Math.floor((end - begin) / 2);

        const left = await this._sort(items, begin, middle);
        const right = await this._sort(items, middle, end);

        let res = [];
        let i = 0;
        let j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                res.push(left[i]);
                i += 1;
            } else {
                res.push(right[j]);
                j += 1;
            }

            await wait(this.wait);

            items.splice(begin, res.length, ...res);
            this.update();
        }

        while (i !== left.length) {
            res.push(left[i]);
            i += 1;
            items.splice(begin, res.length, ...res);
            this.update();
        }
        while (j !== right.length) {
            res.push(right[j]);
            j += 1;
            items.splice(begin, res.length, ...res);
            this.update();
        }

        return res;
    }

};

class BubbleSort {

    constructor(update, wait) {
        this.update = update;
        this.wait = wait;
    }

    async sort(items) {
        let unsorted;

        do {
            unsorted = false;

            for (let i = 0; i < items.length - 1; ++i) {
                if (items[i] > items[i + 1]) {
                    const tmp = items[i];
                    items[i] = items[i + 1];
                    items[i + 1] = tmp;
                    unsorted = true;

                    await wait(this.wait);

                    this.update();
                }
            }

        } while(unsorted);
    }

}

function createSortingAlgorithm(algorithm, update, wait) {
    switch (algorithm) {
        case "merge":
            return new MergeSort(update, wait);
        case "bubble":
            return new BubbleSort(update, wait);
        default:
            throw new Error("Not yet implemented");
    }
}

module.exports = {
    createSortingAlgorithm
};