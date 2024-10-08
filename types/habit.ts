export type Habit = {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  skills: { id: string; percentage: number }[];
  attributes: { name: string; percentage: number }[];
  icon: string;
};