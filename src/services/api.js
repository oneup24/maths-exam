import { supabase } from './supabase';

// Save exam result to cloud
export async function saveExamResult({ userId, grade, topic, totalQuestions, correctAnswers, scorePercent, timeSpent }) {
  const { data, error } = await supabase
    .from('exam_sessions')
    .insert([{
      user_id: userId,
      grade,
      topic: topic || 'mixed',
      total_questions: totalQuestions,
      correct_answers: correctAnswers,
      score_percent: scorePercent,
      time_spent: timeSpent || 0,
    }])
    .select();

  if (error) console.error('Save exam error:', error);
  return { data, error };
}

// Load all exam history for a user
export async function loadExamHistory(userId) {
  const { data, error } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) console.error('Load history error:', error);
  return { data: data || [], error };
}

// Get summary stats for a user
export async function getUserStats(userId) {
  const { data, error } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('user_id', userId);

  if (error) return { totalExams: 0, avgScore: 0, bestScore: 0 };

  const totalExams = data.length;
  const avgScore = totalExams > 0 ? Math.round(data.reduce((sum, e) => sum + e.score_percent, 0) / totalExams) : 0;
  const bestScore = totalExams > 0 ? Math.max(...data.map(e => e.score_percent)) : 0;

  return { totalExams, avgScore, bestScore };
}

// Update profile total_score
export async function updateProfileScore(userId, totalScore) {
  const { error } = await supabase
    .from('profiles')
    .update({ total_score: totalScore })
    .eq('id', userId);

  if (error) console.error('Update profile error:', error);
}
