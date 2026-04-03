import { useState, useCallback } from 'react';

export function useExam() {
  const [sections, setSections] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isMarked, setIsMarked] = useState(false);

  const generate = useCallback((grade, topics, examType, difficulty) => {
    // TODO: wire up to examComposer
  }, []);

  const submitAnswer = useCallback((key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }, []);

  const mark = useCallback(() => {
    // TODO: implement marking
    setIsMarked(true);
  }, [sections, answers]);

  return { sections, answers, isMarked, generate, submitAnswer, mark };
}
