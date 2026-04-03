import { supabase } from './supabase';

// Save exam result to cloud
export async function saveExamResult({ userId, grade, topic, topicBreakdown, totalQuestions, correctAnswers, scorePercent, timeSpent }) {
  const { data, error } = await supabase
    .from('exam_sessions')
    .insert([{
      user_id: userId,
      level: grade,
      topic_code: topic || 'mixed',
      topic_breakdown: topicBreakdown || null,
      total_questions: totalQuestions,
      correct_count: correctAnswers,
      score_percentage: scorePercent,
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
    .order('completed_at', { ascending: false });

  if (error) console.error('Load history error:', error);
  const mapped = (data || []).map(e => ({
    ...e,
    grade: e.level,
    topic: e.topic_code,
    correct_answers: e.correct_count,
    score_percent: e.score_percentage,
    created_at: e.completed_at,
    topicBreakdown: e.topic_breakdown,
  }));
  return { data: mapped, error };
}

// Get summary stats for a user
export async function getUserStats(userId) {
  const { data, error } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('user_id', userId);

  if (error) return { totalExams: 0, avgScore: 0, bestScore: 0 };

  const totalExams = data.length;
  const avgScore = totalExams > 0 ? Math.round(data.reduce((sum, e) => sum + e.score_percentage, 0) / totalExams) : 0;
  const bestScore = totalExams > 0 ? Math.max(...data.map(e => e.score_percentage)) : 0;

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
