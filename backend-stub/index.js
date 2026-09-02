const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const makeSortingResponse = (algorithm, array) => {
  const steps = [
    {
      stepNumber: 0,
      type: 'INITIAL',
      description: 'Initial array',
      array,
      indices: [],
      statistics: { comparisons: 0, swaps: 0, arrayAccesses: array.length }
    },
    {
      stepNumber: 1,
      type: 'FINAL',
      description: 'Sorted (stub)',
      array: [...array].sort((a,b)=>a-b),
      indices: [],
      statistics: { comparisons: 1, swaps: 0, arrayAccesses: array.length }
    }
  ];

  return {
    algorithm,
    category: 'SORTING',
    originalInput: { array },
    result: { sorted: steps[1].array },
    steps,
    totalSteps: steps.length,
    statistics: { comparisons: 1, swaps: 0, arrayAccesses: array.length, totalSteps: steps.length, executionTimeMs: 1 },
    complexity: { bestCase: 'O(n log n)', averageCase: 'O(n log n)', worstCase: 'O(n^2)', spaceComplexity: 'O(1)', isStable: false, isInPlace: true },
    success: true
  };
};

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/algorithms/sorting/:alg', (req, res) => {
  const alg = req.params.alg;
  const { array } = req.body || { array: [] };
  res.json(makeSortingResponse(alg, array));
});

app.post('/api/algorithms/graph/:alg', (req, res) => {
  const alg = req.params.alg;
  res.json({ algorithm: alg, category: 'GRAPH_TRAVERSAL', originalInput: req.body, steps: [], totalSteps: 0, statistics: {}, complexity: {}, success: true });
});

app.post('/api/algorithms/pathfinding/:alg', (req, res) => {
  const alg = req.params.alg;
  res.json({ algorithm: alg, category: 'PATHFINDING', originalInput: req.body, steps: [], totalSteps: 0, statistics: {}, complexity: {}, success: true });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body || {};
  res.json({ token: 'stub-token', user: { id: 1, email: email || 'user@example.com', username: 'stubuser' } });
});

app.post('/api/auth/register', (req, res) => {
  res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ id: 1, email: 'user@example.com', username: 'stubuser' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend stub listening on http://localhost:${port}`));
