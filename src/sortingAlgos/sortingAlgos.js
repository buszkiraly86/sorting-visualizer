
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

class InsertionSort {

    constructor(update, wait) {
        this.update = update;
        this.wait = wait;
    }

    async sort(items) {
        for (let i = 1; i < items.length; ++i) {
            let j = i;

            while (j && items[j - 1] > items[j]) {
                const tmp = items[j - 1];
                items[j - 1] = items[j];
                items[j] = tmp;

                --j;

                await wait(this.wait);

                this.update();
            }

        }
    }

}

class QuickSort {

    constructor(update, wait) {
        this.update = update;
        this.wait = wait;
    }

    async _partition(items, left, right) {
        const pivot = items[right - 1];

        let i, j;
        for (j = left, i = left - 1; j < right - 1; ++j) {
            if (items[j] < pivot) {
                i += 1;

                const tmp = items[i];
                items[i] = items[j];
                items[j] = tmp;

                await wait(this.wait);
                this.update();
            }
        }

        items[right - 1] = items[i + 1];
        items[i + 1] = pivot;

        await wait(this.wait);
        this.update();

        return i + 1;
    }

    async _sort(items, left, right) {
        if (right - left <= 1) return;

        const pivotIndex = await this._partition(items, left, right);

        await this._sort(items, left, pivotIndex);
        await this._sort(items, pivotIndex, right);
    }

    async sort(items) {
        return this._sort(items, 0, items.length);
    }

}

function createSortingAlgorithm(algorithm, update, wait) {
    switch (algorithm) {
        case "merge":
            return new MergeSort(update, wait);
        case "quick":
            return new QuickSort(update, wait);
        case "bubble":
            return new BubbleSort(update, wait);
        case "insertion":
            return new InsertionSort(update, wait);
        default:
            throw new Error("Not yet implemented");
    }
}

module.exports = {
    createSortingAlgorithm
};
