var sort = {
    cmpAsc: function (a, b) { //升序排列
        return a - b;
    },

    cmpDesc: function (a, b) { //降序排列
        return b - a;
    },

    getCmp: function (fn) {
        if (typeof fn === 'function') {  //传入了已有的比较函数
            return fn;
        } else if (fn === true) { //降序排列
            return this.cmpDesc;
        } else {
            return this.cmpAsc;
        }
    },

    bubbleSort: function(d, cmp) { //冒泡排序
        /*
            @param d 需要排序的数组
            @param cmp 是否降序或传入一个比较函数
        */
        var cmp = this.getCmp(cmp);
        for (var i = 0; i < d.length; i++) {
            var flag = false;
            for (var j = 0; j < d.length; j++) {
                if (cmp(d[j + 1], d[j]) < 0) {
                    //升序或降序排列
                    var temp = d[j];
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
    },

    quickSort: function(d, cmp, left, right) { //快速排序
        /*
            @param d 需要排序的数组
            @param cmp 是否降序或传入一个比较函数
            @param left 排序子数组的左边界
            @param right 排序子数组的右边界
        */
        var me = sort,
            cmp = me.getCmp(cmp),
            l = typeof left != 'undefined' ? left : 0,
            r = typeof right != 'undefined' ? right : d.length - 1;

        if (l < r) {
            var base = d[l],  //设置哨兵
                i = l,
                j = r;

            while (i < j) {  //从右向左比较，如果该元素大于哨兵则继续向左移，直到遇到小于哨兵的元素
                while (cmp(base, d[j]) < 0 && i < j) {
                    j--;
                }

                if (i < j) {  //将小于哨兵的元素交换到左侧部分
                    d[i] = d[j];
                    i++;
                }

                while (cmp(d[i], base) < 0 && i < j) {
                    //从左向右比较，如果该元素小于哨兵则继续向右移，直到遇到大于哨兵的元素
                    i++;
                }

                if (i < j) {  //将小于哨兵的元素交换到右侧部分
                    d[j] = d[i];
                    j--;
                }
            }

            d[i] = base;
            //分别将比哨兵小的集合和比哨兵大的集合再次快排

            arguments.callee(d, cmp, l, i - 1);
            arguments.callee(d, cmp, j + 1, r);
        }
        return d;
    },

    insertSort: function(d, cmp) {  //直接插入排序
        /*
            @param d 需要排序的数组
            @param cmp 是否降序或传入一个比较函数
        */
        var cmp = this.getCmp(cmp);
        for (var i = 0; i < d.length - 1; i++) {
            if (cmp(d[i + 1], d[i]) < 0) {
                var key = d[i + 1],
                    j = i;

                while (cmp(key, d[j]) < 0) {
                    d[j + 1] = d[j];
                    j--;
                }

                d[j + 1] = key;
            }
        }
        return d;
    },

    shellSort: function (d, cmp) {  //希尔排序
        /*
            @param d 需要排序的数组
            @param cmp 是否降序或传入一个比较函数
        */
        var cmp = this.getCmp(cmp),
            len = d.length,
            dk = parseInt(len / 2);

        var shellInsertSort = function (dk) {
        /*
            增量排序的数组,比较函数,增量
        */
            for (var i = 0; i < len; i++) {
                if (cmp(d[i + dk], d[i]) < 0) {
                    var key = d[i + dk],
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
    },

    simpleSelectSort: function (d, cmp) {  //简单选择排序
        /*
            @param d 需要排序的数组
            @param cmp 是否降序或传入一个比较函数
        */
        var cmp = this.getCmp(cmp),
            len = d.length,
            r, temp;

        var select = function (arr, start) {  //选择最大或最小的元素
            var key = start;
            for (var i = start + 1; i < len; i++) {
                if (cmp(arr[i], arr[key]) < 0) {
                    key = i;
                }
            }
            return key;
        };

        for (var i = 0; i < len; i++) {
            r = select(d, i);
            temp = d[r];
            d[r] = d[i];
            d[i] = temp;
        }

        return d;
    },

    twoWaySelectSort: function (d, cmp) {  //二元选择排序
        /*
            @param d 需要排序的数组
            @param cmp 是否降序或传入一个比较函数
        */
        var cmp = this.getCmp(cmp),
            len = d.length,
            max, min, temp;

        var selectMaxMin = function (arr, start) {
            var max = min = start;

            for (var i = start + 1; i < len - start; i++) {
                if (cmp(arr[i], arr[min]) < 0) {
                    min = i;
                }

                if (cmp(arr[max], arr[i]) < 0) {
                    max = i;
                }
            }

            return {
                'max': max,
                'min': min
            };
        };

        for (var i = 0; i <= len / 2; i++) {
            var obj = selectMaxMin(d, i),
                last = len - i - 1;

            max = obj.max;
            min = obj.min;

            if (max === i) {  //如果最大值出现在本次排序子序列的第一个
                if (min === last) {
                //如果最小值为本次子序列最后一个，则直接和最大值交换如[4,3,2]
                    temp = d[min];
                    d[min] = d[max];
                    d[max] = temp;
                } else { 
                /*
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
            } else { //如果最大最小值都在序列中间(不在首尾)
                temp = d[i];
                d[i] = d[min];
                d[min] = temp;

                temp = d[last];
                d[last] = d[max];
                d[max] = temp;
            }
        }

        return d;
    },

    heapSort: function (d, cmp) {  //堆排序
        
    }
}