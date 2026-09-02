package com.dsavisualizer.algorithms.sorting;

import com.dsavisualizer.algorithms.AlgorithmExecutionResult;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit tests for Bubble Sort algorithm.
 */
class BubbleSortTest {
    
    @Test
    void testBubbleSortNormalArray() {
        BubbleSort bubbleSort = new BubbleSort();
        int[] input = {8, 3, 7, 1, 5, 2};
        int[] expected = {1, 2, 3, 5, 7, 8};
        
        AlgorithmExecutionResult result = bubbleSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
        assertNotNull(result.getSteps());
        assertGreater(result.getSteps().size(), 0);
        assertNotNull(result.getStatistics());
        assertNotNull(result.getComplexity());
    }
    
    @Test
    void testBubbleSortEmptyArray() {
        BubbleSort bubbleSort = new BubbleSort();
        int[] input = {};
        int[] expected = {};
        
        AlgorithmExecutionResult result = bubbleSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testBubbleSortSingleElement() {
        BubbleSort bubbleSort = new BubbleSort();
        int[] input = {5};
        int[] expected = {5};
        
        AlgorithmExecutionResult result = bubbleSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testBubbleSortAlreadySorted() {
        BubbleSort bubbleSort = new BubbleSort();
        int[] input = {1, 2, 3, 4, 5};
        int[] expected = {1, 2, 3, 4, 5};
        
        AlgorithmExecutionResult result = bubbleSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testBubbleSortReverseSorted() {
        BubbleSort bubbleSort = new BubbleSort();
        int[] input = {5, 4, 3, 2, 1};
        int[] expected = {1, 2, 3, 4, 5};
        
        AlgorithmExecutionResult result = bubbleSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
    
    @Test
    void testBubbleSortDuplicates() {
        BubbleSort bubbleSort = new BubbleSort();
        int[] input = {3, 1, 3, 1, 3};
        int[] expected = {1, 1, 3, 3, 3};
        
        AlgorithmExecutionResult result = bubbleSort.execute(input);
        
        assertTrue(result.getSuccess());
        assertArrayEquals(expected, (int[]) result.getResult());
    }
}
