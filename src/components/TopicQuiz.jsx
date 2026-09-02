import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles, CheckCircle2, CircleHelp } from 'lucide-react';

const QUIZ_BANK = {
  sorting: [
    {
      prompt: 'Which sorting algorithm repeatedly compares adjacent elements and swaps them when out of order?',
      options: ['Bubble Sort', 'Merge Sort', 'Heap Sort', 'Dijkstra'],
      answer: 'Bubble Sort',
      explanation: 'Bubble Sort passes through the array and swaps adjacent out-of-order pairs until the list is sorted.',
    },
    {
      prompt: 'Why is Merge Sort usually considered stable?',
      options: [
        'It never swaps elements directly',
        'It always chooses the last value as the pivot',
        'It uses randomization',
        'It only works on small arrays',
      ],
      answer: 'It never swaps elements directly',
      explanation: 'Merge Sort preserves the order of equal elements by merging from left to right without reordering equal values.',
    },
    {
      prompt: 'Which sorting method is best known for in-place partitioning around a pivot?',
      options: ['Quick Sort', 'Insertion Sort', 'Counting Sort', 'BFS'],
      answer: 'Quick Sort',
      explanation: 'Quick Sort divides the data around a pivot and partitions the array in place.',
    },
  ],
  bfs: [
    {
      prompt: 'What data structure does BFS use to track the next nodes to visit?',
      options: ['Queue', 'Stack', 'Heap', 'Tree'],
      answer: 'Queue',
      explanation: 'BFS processes nodes level by level using a FIFO queue.',
    },
    {
      prompt: 'Which graph property does BFS guarantee in an unweighted graph?',
      options: ['Shortest path in number of edges', 'Minimum edge weight', 'Largest degree first', 'Sorted order of vertices',],
      answer: 'Shortest path in number of edges',
      explanation: 'Because BFS explores level by level, it finds minimum-hop paths in unweighted graphs.',
    },
    {
      prompt: 'If a node is already visited, what happens next?',
      options: ['It is skipped to avoid revisiting', 'It is added again to the queue', 'It is deleted from the graph', 'It is marked as a solution'],
      answer: 'It is skipped to avoid revisiting',
      explanation: 'Visited tracking prevents cycles and duplicate work in graph traversal.',
    },
  ],
  dfs: [
    {
      prompt: 'What structure does DFS typically use to track the current path?',
      options: ['Stack', 'Queue', 'Hash table', 'Priority queue'],
      answer: 'Stack',
      explanation: 'DFS explores deeply before backtracking, which is naturally modeled by a stack.',
    },
    {
      prompt: 'What is a common use case for DFS?',
      options: ['Cycle detection', 'Shortest path in weighted graph', 'Sorting numbers', 'Hash indexing'],
      answer: 'Cycle detection',
      explanation: 'DFS is often used to detect cycles and explore connected components.',
    },
    {
      prompt: 'What is the main difference between BFS and DFS?',
      options: ['BFS explores breadth-first; DFS explores depth-first', 'DFS always finds the shortest path', 'BFS uses recursion; DFS uses a queue', 'They are identical'],
      answer: 'BFS explores breadth-first; DFS explores depth-first',
      explanation: 'BFS expands neighbors before deeper nodes, while DFS goes as deep as possible first.',
    },
  ],
  dijkstra: [
    {
      prompt: 'What type of graph is Dijkstra best suited for?',
      options: ['Weighted graphs with non-negative edges', 'Only unweighted graphs', 'Only binary trees', 'Graphs with negative edges'],
      answer: 'Weighted graphs with non-negative edges',
      explanation: 'Dijkstra works correctly when all edge weights are non-negative.',
    },
    {
      prompt: 'Which strategy helps Dijkstra choose the next node?',
      options: ['Smallest tentative distance first', 'Largest value first', 'Random node', 'Leaf node only'],
      answer: 'Smallest tentative distance first',
      explanation: 'The algorithm repeatedly selects the unresolved node with the minimum known distance.',
    },
    {
      prompt: 'What does Dijkstra guarantee?',
      options: ['Shortest path from source to all reachable vertices', 'Sorted order of all nodes', 'Balanced binary tree', 'Lowest number of edges only'],
      answer: 'Shortest path from source to all reachable vertices',
      explanation: 'Dijkstra computes the minimum-cost path from the source to each reachable node.',
    },
  ],
  astar: [
    {
      prompt: 'What does the heuristic in A* estimate?',
      options: ['Estimated cost from a node to the goal', 'Total graph size', 'Current stack size', 'Shortest path length of source'],
      answer: 'Estimated cost from a node to the goal',
      explanation: 'A* uses a heuristic to prioritize nodes that look closer to the target.',
    },
    {
      prompt: 'Why is A* usually faster than Dijkstra on large maps?',
      options: ['It uses a heuristic to guide search', 'It skips the open set', 'It never stores distances', 'It only works on trees'],
      answer: 'It uses a heuristic to guide search',
      explanation: 'The heuristic prunes the search and focuses exploration toward the goal.',
    },
    {
      prompt: 'Which heuristic is common in grid pathfinding?',
      options: ['Manhattan distance', 'Euclidean volume', 'Random guess', 'Prime number rule'],
      answer: 'Manhattan distance',
      explanation: 'Manhattan distance fits grid movement because movement is typically horizontal and vertical.',
    },
  ],
  stack: [
    {
      prompt: 'Which principle does a stack follow?',
      options: ['LIFO', 'FIFO', 'Random access', 'Priority ordering'],
      answer: 'LIFO',
      explanation: 'A stack removes the most recently added item first.',
    },
    {
      prompt: 'Which operation removes the top item from a stack?',
      options: ['Pop', 'Push', 'Enqueue', 'Delete'],
      answer: 'Pop',
      explanation: 'Pop removes the most recent element from the stack.',
    },
    {
      prompt: 'What does the peek operation do?',
      options: ['Shows the top element without removing it', 'Deletes the bottom element', 'Sorts the stack', 'Adds a new bottom element'],
      answer: 'Shows the top element without removing it',
      explanation: 'Peek inspects the top element while leaving the stack unchanged.',
    },
  ],
  queue: [
    {
      prompt: 'Which principle does a queue follow?',
      options: ['FIFO', 'LIFO', 'Random order', 'Sorted order'],
      answer: 'FIFO',
      explanation: 'A queue processes the oldest item first.',
    },
    {
      prompt: 'What operation adds an item to the rear of a queue?',
      options: ['Enqueue', 'Dequeue', 'Peek', 'Push'],
      answer: 'Enqueue',
      explanation: 'Enqueue adds a new item to the back of the queue.',
    },
    {
      prompt: 'What is the front of a queue?',
      options: ['The oldest element waiting to be processed', 'The newest element', 'The middle element', 'The empty slot'],
      answer: 'The oldest element waiting to be processed',
      explanation: 'The front holds the next item to leave the queue.',
    },
  ],
  linkedList: [
    {
      prompt: 'What does each node in a linked list hold?',
      options: ['Data and a pointer to the next node', 'Only one integer', 'Only the hash key', 'A complete tree'],
      answer: 'Data and a pointer to the next node',
      explanation: 'A singly linked list node stores its value and a reference to the next node.',
    },
    {
      prompt: 'What is the benefit of inserting at the head?',
      options: ['It is O(1) when the head pointer is known', 'It requires sorting', 'It always uses more memory', 'It removes the tail'],
      answer: 'It is O(1) when the head pointer is known',
      explanation: 'Head insertion is constant-time because the new node points to current head and updates the head pointer.',
    },
    {
      prompt: 'What happens when the list is empty and you insert at the end?',
      options: ['The new node becomes the head', 'The list is automatically sorted', 'Nothing is inserted', 'The list doubles in size'],
      answer: 'The new node becomes the head',
      explanation: 'When the list is empty, the first insertion becomes the head node.',
    },
  ],
  binarySearchTree: [
    {
      prompt: 'In a BST, where are smaller values placed relative to a node?',
      options: ['Left subtree', 'Right subtree', 'Same position', 'Next linked node'],
      answer: 'Left subtree',
      explanation: 'In a BST, left child values are smaller than the current node.',
    },
    {
      prompt: 'What is the time complexity of searching in a balanced BST?',
      options: ['O(log n)', 'O(1)', 'O(n²)', 'O(n log n)'],
      answer: 'O(log n)',
      explanation: 'Balanced BSTs reduce the search depth to logarithmic levels.',
    },
    {
      prompt: 'Which traversal visits the left subtree, then the node, then the right subtree?',
      options: ['In-order traversal', 'Pre-order traversal', 'Post-order traversal', 'Breadth-first traversal'],
      answer: 'In-order traversal',
      explanation: 'In-order traversal prints left → root → right, which is sorted for BSTs.',
    },
  ],
  hashTable: [
    {
      prompt: 'What is the purpose of a hash function?',
      options: ['Convert a key into an index in the table', 'Sort the values', 'Find the shortest path', 'Remove duplicates from a stack'],
      answer: 'Convert a key into an index in the table',
      explanation: 'Hash functions map keys to positions so data can be accessed quickly.',
    },
    {
      prompt: 'What is a collision in a hash table?',
      options: ['Two different keys map to the same bucket', 'A hash function returns null', 'A queue becomes full', 'The tree is unbalanced'],
      answer: 'Two different keys map to the same bucket',
      explanation: 'Collisions happen when different keys produce the same hash index.',
    },
    {
      prompt: 'Which technique is used in separate chaining?',
      options: ['Store multiple values in the same bucket as a list', 'Sort the whole table', 'Always place items at index zero', 'Use nearest-neighbor search'],
      answer: 'Store multiple values in the same bucket as a list',
      explanation: 'Separate chaining handles collisions by storing a chain or list in the collision bucket.',
    },
  ],
  slidingWindow: [
    {
      prompt: 'What is the main idea behind the sliding window technique?',
      options: ['Move a window across the input and update sums incrementally', 'Sort each window', 'Reverse the array repeatedly', 'Use a random queue'],
      answer: 'Move a window across the input and update sums incrementally',
      explanation: 'The window shifts forward while reusing computations to avoid redundant work.',
    },
    {
      prompt: 'When is the sliding window technique especially useful?',
      options: ['When you need contiguous subarrays with a fixed or variable range', 'When you need to print a BST', 'When sorting a list', 'When balancing a tree'],
      answer: 'When you need contiguous subarrays with a fixed or variable range',
      explanation: 'It is ideal for contiguous subarray problems like maximum sum and longest substring.',
    },
    {
      prompt: 'Why is sliding window faster than a brute-force approach?',
      options: ['It reuses computations instead of recalculating everything', 'It uses a balanced BST', 'It always creates the largest possible window', 'It makes the array smallest'],
      answer: 'It reuses computations instead of recalculating everything',
      explanation: 'By updating the window as it moves, the algorithm avoids redoing the same work for each position.',
    },
  ],
};

const DEFAULT_QUIZ = QUIZ_BANK.sorting;

export const TopicQuiz = ({ topic = 'sorting' }) => {
  const questions = useMemo(() => QUIZ_BANK[topic] || DEFAULT_QUIZ, [topic]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }, [questions.length]);

  const handleSelect = (questionIndex, option) => {
    if (submitted) return;
    const next = [...answers];
    next[questionIndex] = option;
    setAnswers(next);
  };

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index]?.answer ? 1 : 0);
  }, 0);

  const isComplete = answers.every((answer) => answer !== null);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
            <CircleHelp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Quiz</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Check your understanding of this topic</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
          <Sparkles className="w-3 h-3" />
          {questions.length} questions
        </div>
      </div>

      <div className="p-5 space-y-5">
        {questions.map((question, qIndex) => {
          const selectedOption = answers[qIndex];
          const isCorrect = selectedOption === question.answer;

          return (
            <div key={qIndex} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
                {qIndex + 1}. {question.prompt}
              </p>

              <div className="space-y-2">
                {question.options.map((option) => {
                  const isSelected = selectedOption === option;
                  const showCorrect = submitted && option === question.answer;
                  const showWrong = submitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(qIndex, option)}
                      className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                        showCorrect
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : showWrong
                            ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                            : isSelected
                              ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-3 rounded-xl border px-3 py-2 text-[11px] ${
                  isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                }`}>
                  <div className="flex items-center gap-1.5 font-semibold">
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleHelp className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? 'Correct' : 'Answer'}</span>
                  </div>
                  <p className="mt-1">{question.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!isComplete}
            className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold shadow-sm hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>

          {submitted && (
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Score: <span className="text-brand-500">{score}/{questions.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
