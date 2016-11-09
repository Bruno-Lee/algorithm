import * as Sort from './sort';
let arr = [112, 301, -33, 2012, 44, -101, 31, 1, 67, 10, -1];
console.log('待排序数组', arr);
console.log('冒泡排序', Sort.bubbleSort(arr));
console.log('快速排序', Sort.quickSort(arr));
console.log('直接插入排序', Sort.insertSort(arr));
console.log('希尔排序', Sort.shellSort(arr));
console.log('简单选择排序', Sort.simpleSelectSort(arr));
console.log('二元选择排序', Sort.twoWaySelectSort(arr));
console.log('堆排序', Sort.heapSort(arr));
console.log('合并排序', Sort.mergeSort(arr));
console.log('基数排序', Sort.radixSort(arr));

