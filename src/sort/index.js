/** 
 * @func cmpAsc 升序排列 
 */
const cmpAsc = (a, b) => a - b;
/** 
 * @func cmpAsc 降序排列 
 */
const cmpDesc = (a, b) => b - a;
const getCmp = (fn) => {
    /**
     * @param fn 比较函数compare function
     */
    if (typeof fn === 'function') {  // 传入了已有的比较函数
        return fn;
    } else if (fn === true) { // 降序排列
        return cmpDesc;
    } else {
        return cmpAsc;
    }
};

export function bubbleSort (d, cmp) {
    /**
     * @desc 冒泡排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
     */
    cmp = getCmp(cmp);
    for (let i = 0; i < d.length; i++) {
        let flag = false;
        for (let j = 0; j < d.length; j++) {
            if (cmp(d[j + 1], d[j]) < 0) {
                //升序或降序排列
                let temp = d[j];
                d[j] = d[j + 1];
                d[j + 1] = temp;
                flag = true;
            }
        }
        if (flag === false) { //一次循环后所有的元素已经有序则不再排序
            break;
        }
    }
    return d;
};

export function quickSort (d, cmp, left, right) {
    /**
     * @desc 快速排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
     * @param left 排序子数组的左边界
     * @param right 排序子数组的右边界
     */
    let l = typeof left != 'undefined' ? left : 0;
    let r = typeof right != 'undefined' ? right : d.length - 1;
    
    cmp = getCmp(cmp);
    
    if (l < r) {
        let base = d[l];  //设置哨兵
        let i = l;
        let j = r;

        while (i < j) {  
            // 从右向左比较，如果该元素大于哨兵则继续向左移，直到遇到小于哨兵的元素
            while (cmp(base, d[j]) < 0 && i < j) {
                j--;
            }

            if (i < j) {  
                // 将小于哨兵的元素交换到左侧部分
                d[i] = d[j];
                i++;
            }

            while (cmp(d[i], base) < 0 && i < j) {
                // 从左向右比较，如果该元素小于哨兵则继续向右移，直到遇到大于哨兵的元素
                i++;
            }

            if (i < j) {  
                // 将小于哨兵的元素交换到右侧部分
                d[j] = d[i];
                j--;
            }
        }

        d[i] = base;
        // 分别将比哨兵小的集合和比哨兵大的集合再次快排

        quickSort(d, cmp, l, i - 1);
        quickSort(d, cmp, j + 1, r);
    }
    return d;
};

export function insertSort (d, cmp) {
    /**
     * @desc 直接插入排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
     */
    cmp = getCmp(cmp);
    for (let i = 0; i < d.length - 1; i++) {
        if (cmp(d[i + 1], d[i]) < 0) {
            let key = d[i + 1],
                j = i;

            while (cmp(key, d[j]) < 0) {
                d[j + 1] = d[j];
                j--;
            }

            d[j + 1] = key;
        }
    }
    return d;
};

export function shellSort (d, cmp) {
    /**
     * @desc 希尔排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
     */
    let len = d.length;
    let dk = parseInt(len / 2);
    cmp = getCmp(cmp);

    let shellInsertSort = function (dk) {
    /**
     * @func 增量排序的数组,比较函数,增量
     */
        for (let i = 0; i < len; i++) {
            if (cmp(d[i + dk], d[i]) < 0) {
                let key = d[i + dk],
                    j = i;

                while (cmp(key, d[j]) < 0) {
                    d[j + dk] = d[j];
                    j -= dk;
                }

                d[j + dk] = key;
            }
        }
    };

    while (dk >= 1) {
        shellInsertSort(dk);
        dk = parseInt(dk / 2);
    }

    return d;
};

export function simpleSelectSort (d, cmp) {  
    /**
     * @desc 简单选择排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
    */
    let len = d.length;
    let r;
    let temp;
    cmp = getCmp(cmp);
    
    let select = function (arr, start) {  // 选择最大或最小的元素
        let key = start;
        for (let i = start + 1; i < len; i++) {
            if (cmp(arr[i], arr[key]) < 0) {
                key = i;
            }
        }
        return key;
    };

    for (let i = 0; i < len; i++) {
        r = select(d, i);
        temp = d[r];
        d[r] = d[i];
        d[i] = temp;
    }

    return d;
};

export function twoWaySelectSort (d, cmp) {
    /**
     * @desc twoWaySelectSort 二元选择排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
     */
    let max;
    let min;
    let temp;
    let len = d.length;
    cmp = getCmp(cmp);

    let selectMaxMin = function (arr, start) {
        let max = min = start;

        for (let i = start + 1; i < len - start; i++) {
            if (cmp(arr[i], arr[min]) < 0) {
                min = i;
            }

            if (cmp(arr[max], arr[i]) < 0) {
                max = i;
            }
        }

        return {
            max,
            min
        };
    };

    for (let i = 0; i <= len / 2; i++) {
        let obj = selectMaxMin(d, i);
        let last = len - i - 1;

        max = obj.max;
        min = obj.min;

        if (max === i) {
        // 如果最大值出现在本次排序子序列的第一个
            if (min === last) {
            // 如果最小值为本次子序列最后一个，则直接和最大值交换如[4,3,2]
                temp = d[min];
                d[min] = d[max];
                d[max] = temp;
            } else {
            /**
                如果最小值不是自序列最后一个如[4,2,3]，则
                ->先保存最后一个元素d[last]的值到temp
                ->交换最大值d[max]到最后一个位置last
                ->将最小值d[min]移动到本次序列第一个位置i
                ->将保存的temp元素(一开始的d[last])移动到最小值的位置min
            */
                temp = d[last];
                d[last] = d[max];
                d[i] = d[min];
                d[min] = temp;
            }
        } else { 
            // 如果最大最小值都在序列中间(不在首尾)
            temp = d[i];
            d[i] = d[min];
            d[min] = temp;

            temp = d[last];
            d[last] = d[max];
            d[max] = temp;
        }
    }

    return d;
};

export function heapSort (d, cmp) {
    /** 
     * @func heapSort 堆排序 
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
    */
    cmp = getCmp(cmp);
    
    let len = d.length;
    
    /** @func swap 交换元素 */
    let swap = function (d, l, r) {
        let temp = d[l];
        d[l] = d[r];
        d[r] = temp;
    };

    /** @func buildHeap 建堆 */
    let buildHeap = function (d) {
        let size = d.length;
        let parent = Math.floor(size / 2) - 1; // 二叉树中最后一个非叶子节点

        for (let i = parent; i >= 0; i--) {  
            // 从最后一个非叶子结点开始建堆
            adjustHeap(d, i, size);
        }
    };

    /** @func adjustHeap 调整堆 */
    let adjustHeap = function (d, parent, size) {
        let flag = parent; // 父节点
        let leftChild = 2 * parent + 1; // parent的左子节点下标
        let rightChild = 2 * (parent + 1); // parent的右子节点下标

        if (leftChild < size && cmp(d[flag], d[leftChild]) < 0) { 
            /**
                如果父节点大(小)于左孩子,将左孩子置为标记结点
                否则标记结点仍为父节点
            */
            flag = leftChild;
        }

        if (rightChild < size && cmp(d[flag], d[rightChild]) < 0) {
            /**
                右孩子和标记结点比较,如果大(小)于右孩子
                则置标记结点为右孩子,此时标记结点是左右孩子、父节点三者中的最大(小)者
            */
            flag = rightChild;
        }

        if (flag !== parent) {
            // 如果标记节点发生变化，则交换父节点和标记节点，再次以新的父节点为起点向下调整堆
            swap(d, flag, parent);
            adjustHeap(d, flag, size);
        }
    };

    if (len > 1) {
        buildHeap(d);
        
        for (let i = len - 1; i > 0; i--) {
            swap(d, 0, i);  // 将最大(最小)元素置换到数组最后一个元素
            adjustHeap(d, 0, i);  // 再从0开始调整堆,将新二叉树在次调整为一个大(小)根堆
        }
    }

    return d;
};

export function mergeSort (d, cmp) {
    /** 
     * @desc 归并排序
     * @param d 需要排序的数组
     * @param cmp 是否降序或传入一个比较函数
    */
    cmp = getCmp(cmp);
    /**
     * @func merge 将两路归并为一个有序数组
     * @param {Array} d 待排序数组 
     * @param {int} first 数组第一个元素下标
     * @param {int} mid 数组正中间元素的下标
     * @param {int} last 数组最后一个元素下标
    */
    const merge = (d, first, mid, last) => {
        let arr = [];
        let i = first;
        let j = mid;
        let k;

        for (k = 0; i < mid && j < last; k++) {
            arr[k] = cmp(d[i], d[j]) < 0 ? d[i++] : d[j++];
        }

        while (i < mid) {
            arr[k++] = d[i++];
        }

        while (j < last) {
            arr[k++] = d[j++];
        }
    };

    /** 
     * @func sort 排序
     * @param {Array} s 待排序数组
     * @param {int} low 数组第一个元素下标
     * @param {int} high 数组最后一个元素下标
    */
    const sort = (s, low, high) => {
        if (low >= high) {
            return;
        }
        let mid = low + parseInt((high - low) / 2);
        sort(s, low, mid);
        sort(s, mid + 1, high);
        merge(s, low, mid, high);
    };

    sort(d, 0, d.length - 1);
    return d;
};

export function radixSort (d, asc = true) {
    /**
     * @desc 基数排序
     * @param d 待排序数组
     * @param asc boolean 升降序标志 true-升序 false-降序
    */

    /** 
     * @func getDigit 获取某一个数字 某一位上的数值 
     * @example 获取1234第三位的数字：getDigit(1234, 3) => 2
     * @param num 具体数字
     * @param k 具体的位数
    */
    const getDigit = (num, k) => {
        num = Math.abs(num);
        return parseInt(num / Math.pow(10, k - 1)) % 10;
    }
    /** 
     * @func maxBit 获取一组数字的中最大数的位数，可适用于数组中含有负数的情况
     * @param arr 数组
    */
    const bitMax = (arr) => {
        let absMax = Math.abs(Math.max.apply(null, arr));
        let absMin = Math.abs(Math.min.apply(null, arr));
        let result = absMax > absMin ? absMax : absMin;

        return result.toString().length;
    }

    const sort = (arr, max) => {
        const radix = 10;
        let list = [];
        let count = new Array(radix);

        for (let k = 1; k <= max; k++) {
            count.fill(0);
            for (let i = 0; i < arr.length; i++) {
                let digit = getDigit(arr[i], k);
                count[digit]++;
            }

            for (let i = 1; i < count.length; i++) {
                count[i] += count[i - 1];
            }

            for (let i = arr.length - 1; i >= 0; i--) {
                let item = arr[i];
                let digit = getDigit(item, k);
                list[--count[digit]] = item;
            }

            arr = list;
            list = [];
        }

        return arr;
    };

    let positive = []; // 正数数组
    let negative = []; // 负数数组

    for (let i = 0; i < d.length; i++) { // 正负数分开排序
        if (d[i] < 0) {
            negative.push(d[i]);
        } else {
            positive.push(d[i]);
        }
    }

    let posiMax = bitMax(positive);
    let negaMax = bitMax(negative);
    let posiArr = sort(positive, posiMax);
    let negaArr = sort(negative, negaMax);

    if (asc) {
        return negaArr.reverse().concat(posiArr);
    } else {
        return posiArr.reverse().concat(negaArr);
    }
}
