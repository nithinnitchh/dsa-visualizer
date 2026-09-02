package com.dsavisualizer.api.services;

import com.dsavisualizer.algorithms.AlgorithmExecutionResult;
import com.dsavisualizer.algorithms.sorting.*;
import org.springframework.stereotype.Service;

/**
 * Service for executing sorting algorithms.
 */
@Service
public class SortingService {
    
    /**
     * Execute Bubble Sort with step tracking.
     */
    public AlgorithmExecutionResult executeBubbleSort(int[] array) {
        BubbleSort bubbleSort = new BubbleSort();
        return bubbleSort.execute(array);
    }
    
    /**
     * Execute Selection Sort with step tracking.
     */
    public AlgorithmExecutionResult executeSelectionSort(int[] array) {
        SelectionSort selectionSort = new SelectionSort();
        return selectionSort.execute(array);
    }
    
    /**
     * Execute Insertion Sort with step tracking.
     */
    public AlgorithmExecutionResult executeInsertionSort(int[] array) {
        InsertionSort insertionSort = new InsertionSort();
        return insertionSort.execute(array);
    }
    
    /**
     * Execute Merge Sort with step tracking.
     */
    public AlgorithmExecutionResult executeMergeSort(int[] array) {
        MergeSort mergeSort = new MergeSort();
        return mergeSort.execute(array);
    }
    
    /**
     * Execute Quick Sort with step tracking.
     */
    public AlgorithmExecutionResult executeQuickSort(int[] array) {
        QuickSort quickSort = new QuickSort();
        return quickSort.execute(array);
    }
    
    /**
     * Execute Heap Sort with step tracking.
     */
    public AlgorithmExecutionResult executeHeapSort(int[] array) {
        HeapSort heapSort = new HeapSort();
        return heapSort.execute(array);
    }
}
