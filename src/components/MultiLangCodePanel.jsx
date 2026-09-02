import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { generateMultiLangCode } from '../utils/multilangCode';
import { useToast } from '../context/ToastContext';

const LANGUAGES = [
  { id: 'python', label: 'Python', ext: '.py', iconColor: 'text-amber-400' },
  { id: 'java', label: 'Java', ext: '.java', iconColor: 'text-rose-400' },
  { id: 'cpp', label: 'C++', ext: '.cpp', iconColor: 'text-blue-400' },
  { id: 'c', label: 'C', ext: '.c', iconColor: 'text-cyan-400' },
  { id: 'javascript', label: 'JavaScript', ext: '.js', iconColor: 'text-yellow-400' },
  { id: 'csharp', label: 'C#', ext: '.cs', iconColor: 'text-purple-400' },
];

export const MultiLangCodePanel = ({ algoId, algorithmName, currentArray = [45, 12, 89, 34, 78] }) => {
  const [selectedLang, setSelectedLang] = useState('python');
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const codeObj = generateMultiLangCode(algoId, currentArray);
  const currentCode = codeObj[selectedLang] || codeObj.python;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    success(`Copied ${selectedLang.toUpperCase()} code with current input!`, 'Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentCode.trim().split('\n');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm space-y-0">
      
      {/* Header with Title and Language Tabs */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {algorithmName} Implementation in All Languages
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Code is dynamically updated with the <strong>exact array input</strong> shown in your visualizer!</span>
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-md shadow-brand-500/25 active:scale-95 transition-all self-start md:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Runnable Code'}</span>
        </button>
      </div>

      {/* Language Switcher Bar */}
      <div className="flex items-center gap-1 px-4 py-2 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs">
        <span className="text-slate-400 font-mono text-[11px] mr-2">Language:</span>
        {LANGUAGES.map(lang => {
          const isActive = selectedLang === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-brand-500' : 'bg-slate-400'}`} />
              <span>{lang.label}</span>
              <span className="text-[10px] text-slate-400">({lang.ext})</span>
            </button>
          );
        })}
      </div>

      {/* Live Input Banner */}
      <div className="px-5 py-2.5 bg-brand-500/5 dark:bg-brand-950/30 border-b border-brand-500/10 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-600 dark:text-slate-300 font-mono">
        <div>
          Active Array: <strong className="text-brand-500 dark:text-brand-400">[{currentArray.join(', ')}]</strong>
        </div>
        <span className="text-[11px] text-slate-400 font-sans">
          Ready to run directly in any {selectedLang.toUpperCase()} compiler/IDE.
        </span>
      </div>

      {/* Syntax Highlighted Code Viewer */}
      <div className="bg-slate-950 p-4 sm:p-6 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed">
        <pre className="grid grid-cols-[auto_1fr] gap-x-4">
          {lines.map((line, idx) => (
            <React.Fragment key={idx}>
              <span className="text-slate-600 select-none text-right font-mono pr-3 border-r border-slate-800/80">
                {idx + 1}
              </span>
              <span className="whitespace-pre">
                {line.startsWith('#') || line.startsWith('//') ? (
                  <span className="text-emerald-500/90 italic font-medium">{line}</span>
                ) : (
                  line
                    .replace(/\b(def|function|public|static|void|int|class|return|for|while|if|else|break|import|using|include|namespace|const|let|var|new|sizeof)\b/g, '🔵$1🔵')
                    .replace(/\b(true|false|null|None|True|False)\b/g, '🟢$1🟢')
                    .split(/(🔵.*?🔵|🟢.*?🟢)/g)
                    .map((token, tIdx) => {
                      if (token.startsWith('🔵') && token.endsWith('🔵')) {
                        return <span key={tIdx} className="text-indigo-400 font-bold">{token.slice(1, -1)}</span>;
                      }
                      if (token.startsWith('🟢') && token.endsWith('🟢')) {
                        return <span key={tIdx} className="text-amber-400 font-medium">{token.slice(1, -1)}</span>;
                      }
                      return token;
                    })
                )}
              </span>
            </React.Fragment>
          ))}
        </pre>
      </div>

    </div>
  );
};
