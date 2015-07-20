var sort = {
    bubbleSort: function(d, desc) { //冒泡排序
        /*
            @param d 需要排序的数组
            @param desc 是否降序
        */
        for (var i = 0; i < d.length; i++) {
            var flag = false;
            for (var j = 0; j < d.length; j++) {
                if (d[j] > d[j + 1] && desc != true || d[j] < d[j + 1] && desc === true) {
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

    quickSort: function(d, desc, left, right) { //快速排序
        /*
            @param d 需要排序的数组
            @param left 排序子数组的左边界
            @param right 排序子数组的右边界
            @param desc 是否降序
        */
        var l = typeof left != 'undefined' ? left : 0,
            r = typeof right != 'undefined' ? right : d.length - 1;

        if (l < r) {
            var base = d[l],
                i = l,
                j = r;

            while (i < j) {  //从右向左比较，如果该元素大于哨兵则继续向左移，直到遇到小于哨兵的元素
                while ((desc === true ? d[j] < base : d[j] > base) && i < j) {
                    j--;
                }

                if (i < j) {  //将小于哨兵的元素交换到左侧部分
                    d[i] = d[j];
                    i++;
                }

                while ((desc === true ? d[i] > base : d[i] < base) && i < j) {
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
            arguments.callee(d, desc, l, i - 1);
            arguments.callee(d, desc, j + 1, r);
        }
        return d;
    },

    insertSort: function(d, desc) {  //直接插入排序
        for(var i = 0; i < d.length - 1; i++) {
            if(d[i + 1] < d[i]) {
                var key = d[i + 1],
                    j = i;

                while(key < d[j]) {
                    d[j + 1] = d[j];
                    j--;
                }

                d[j + 1] = key;
            }
        }
        return d;
    }
}