import { pythonCodeTemplates } from './codeSamples/pythonCode';
import { javaCodeTemplates } from './codeSamples/javaCode';
import { cppCodeTemplates } from './codeSamples/cppCode';
import { cCodeTemplates } from './codeSamples/cCode';
import { javascriptCodeTemplates } from './codeSamples/javascriptCode';
import { csharpCodeTemplates } from './codeSamples/csharpCode';

export function generateMultiLangCode(algoId, array = [45, 12, 89, 34, 78]) {
  const languageMap = {
    python: pythonCodeTemplates,
    java: javaCodeTemplates,
    cpp: cppCodeTemplates,
    c: cCodeTemplates,
    javascript: javascriptCodeTemplates,
    csharp: csharpCodeTemplates,
  };

  const result = {};

  for (const [language, templates] of Object.entries(languageMap)) {
    const template = templates[algoId] || templates.bubbleSort;
    result[language] = template(array);
  }

  return result;
}

export default generateMultiLangCode;
