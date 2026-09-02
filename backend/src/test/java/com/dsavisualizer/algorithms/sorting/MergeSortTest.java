package com.dsavisualizer.algorithms.sorting;

import com.dsavisualizer.algorithms.AlgorithmExecutionResult;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit tests for Merge Sort algorithm.
 */
class MergeSortTest {
    
    @Test
    void testMergeSortNormalArray() {
        MergeSort mergeSort = new MergeSort();
        int[] input = {8, 3, 7, 1, 5, 2};
        int[] expected = {1, 2, 3, 5, 7, 8};
        
        AlgorithmExecutionResult result = mergeSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
        assertEquals("Merge Sort", result.getAlgorithm());
    }
    
    @Test
    void testMergeSortEmptyArray() {
        MergeSort mergeSort = new MergeSort();
        int[] input = {};
        int[] expected = {};
        
        AlgorithmExecutionResult result = mergeSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testMergeSortSingleElement() {
        MergeSort mergeSort = new MergeSort();
        int[] input = {5};
        int[] expected = {5};
        
        AlgorithmExecutionResult result = mergeSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testMergeSortLargeArray() {
        MergeSort mergeSort = new MergeSort();
        int[] input = {64, 34, 25, 12, 22, 11, 90, 88, 45, 50};
        int[] expected = {11, 12, 22, 25, 34, 45, 50, 64, 88, 90};
        
        AlgorithmExecutionResult result = mergeSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
        assertNotNull(result.getStatistics());
    }
}
