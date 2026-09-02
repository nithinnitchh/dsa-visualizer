package com.dsavisualizer.algorithms.sorting;

import com.dsavisualizer.algorithms.AlgorithmExecutionResult;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit tests for Quick Sort algorithm.
 */
class QuickSortTest {
    
    @Test
    void testQuickSortNormalArray() {
        QuickSort quickSort = new QuickSort();
        int[] input = {8, 3, 7, 1, 5, 2};
        int[] expected = {1, 2, 3, 5, 7, 8};
        
        AlgorithmExecutionResult result = quickSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testQuickSortEmptyArray() {
        QuickSort quickSort = new QuickSort();
        int[] input = {};
        int[] expected = {};
        
        AlgorithmExecutionResult result = quickSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testQuickSortAlreadySorted() {
        QuickSort quickSort = new QuickSort();
        int[] input = {1, 2, 3, 4, 5};
        int[] expected = {1, 2, 3, 4, 5};
        
        AlgorithmExecutionResult result = quickSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
}
