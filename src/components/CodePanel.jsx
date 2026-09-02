import React, { useState } from 'react';
import { Code2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const LANGUAGE_OPTIONS = [
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'c', label: 'C' },
  { id: 'csharp', label: 'C#' },
];

const formatValue = (value) => {
  if (Array.isArray(value)) return `[${value.join(', ')}]`;
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const buildCodeMap = ({ pseudocode, algorithmName, inputLabel, inputValue }) => {
  const safeName = algorithmName || 'Algorithm';
  const inputText = inputLabel ? `${inputLabel} = ${formatValue(inputValue)}` : null;
  const helperLines = inputText ? [`# Active input from visualizer`, inputText] : [];

  const pythonCode = [
    '# Python',
    pseudocode
      .replace(/function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/g, 'def $1($2):')
      .replace(/\breturn\b/g, 'return'),
    ...helperLines,
    'print(' + (inputLabel || 'result') + ')',
  ].join('\n');

  const jsCode = [
    '// JavaScript',
    pseudocode
      .replace(/function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/g, 'function $1($2) {')
      .replace(/:/g, '{')
      .replace(/\n\s*return\s+/g, '\n  return '),
    inputText ? `const ${inputLabel || 'inputValues'} = ${formatValue(inputValue)};` : null,
    'console.log(' + (inputLabel || 'result') + ');',
  ].join('\n');

  const javaCode = [
    '// Java',
    'import java.util.Arrays;',
    `public class ${safeName.replace(/\s+/g, '')} {`,
    '    public static void main(String[] args) {',
    inputText ? `        ${inputLabel || 'int[] inputValues'} = ${formatValue(inputValue)};` : null,
    '        System.out.println(Arrays.toString(' + (inputLabel || 'inputValues') + '));',
    '    }',
    '}',
  ].filter(Boolean).join('\n');

  const cppCode = [
    '// C++',
    '#include <iostream>',
    '#include <vector>',
    `int main() {`,
    inputText ? `    std::vector<int> ${inputLabel || 'inputValues'} = ${formatValue(inputValue).replace(/\[|\]/g, '{').replace(/\{|\}/g, '')};` : null,
    '    std::cout << "Active input" << std::endl;',
    '    return 0;',
    '}',
  ].filter(Boolean).join('\n');

  const cCode = [
    '// C',
    '#include <stdio.h>',
    `int main() {`,
    inputText ? `    int ${inputLabel || 'inputValues'}[] = ${formatValue(inputValue).replace(/\[|\]/g, '{').replace(/\{|\}/g, '')};` : null,
    '    printf("Active input\\n");',
    '    return 0;',
    '}',
  ].filter(Boolean).join('\n');

  const csharpCode = [
    '// C#',
    'using System;',
    'class Program {',
    '    static void Main() {',
    inputText ? `        int[] ${inputLabel || 'inputValues'} = ${formatValue(inputValue).replace(/\[|\]/g, 'new int[] {').replace(/\]/g, '}')};` : null,
    '        Console.WriteLine("Active input");',
    '    }',
    '}',
  ].filter(Boolean).join('\n');

  return {
    python: pythonCode,
    javascript: jsCode,
    java: javaCode,
    cpp: cppCode,
    c: cCode,
    csharp: csharpCode,
  };
};

export const CodePanel = ({
  pseudocode,
  algorithmName,
  isDefaultOpen = false,
  inputLabel,
  inputValue,
  codeByLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [viewMode, setViewMode] = useState('implementation');
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  if (!pseudocode && !codeByLanguage) return null;

  const generatedMap = codeByLanguage || buildCodeMap({ pseudocode, algorithmName, inputLabel, inputValue });
  const currentCode = viewMode === 'pseudocode'
    ? pseudocode
    : (generatedMap[selectedLanguage] || generatedMap.python || pseudocode);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    success(`${selectedLanguage.toUpperCase()} code copied to clipboard!`, 'Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentCode.trim().split('\n');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {algorithmName} Implementation & Code
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isOpen ? 'Click to collapse code view' : 'Click to view implementation in the selected language'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOpen && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700/60 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
          <div className="p-1 rounded-lg text-slate-400">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-950">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/70 px-3 py-2 text-[11px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium mr-1">Mode:</span>
              {[
                { id: 'implementation', label: 'Implementation' },
                { id: 'pseudocode', label: 'Pseudocode' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setViewMode(mode.id)}
                  className={`rounded-lg px-2.5 py-1.5 transition-colors ${
                    viewMode === mode.id
                      ? 'bg-brand-500 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {viewMode === 'implementation' && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-medium mr-1">Language:</span>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`rounded-lg px-2.5 py-1.5 transition-colors ${
                      selectedLanguage === lang.id
                        ? 'bg-brand-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 font-mono text-xs overflow-x-auto text-slate-200">
            <pre className="grid grid-cols-[auto_1fr] gap-x-4 leading-relaxed">
              {lines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-slate-600 select-none text-right font-mono pr-2 border-r border-slate-800">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre">
                    {line
                      .replace(/\b(function|class|return|for|while|if|else|break|new|from|to|down to|in|public|static|void|int|char|double|bool|const|let|var|using|include)\b/g, '🔵$1🔵')
                      .replace(/\b(true|false|null|Infinity|None)\b/g, '🟢$1🟢')
                      .split(/(🔵.*?🔵|🟢.*?🟢)/g)
                      .map((token, tIdx) => {
                        if (token.startsWith('🔵') && token.endsWith('🔵')) {
                          return <span key={tIdx} className="text-indigo-400 font-semibold">{token.slice(1, -1)}</span>;
                        }
                        if (token.startsWith('🟢') && token.endsWith('🟢')) {
                          return <span key={tIdx} className="text-emerald-400 font-medium">{token.slice(1, -1)}</span>;
                        }
                        if (token.includes('//') || token.includes('#')) {
                          return <span key={tIdx} className="text-slate-500 italic">{token}</span>;
                        }
                        return token;
                      })}
                  </span>
                </React.Fragment>
              ))}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
