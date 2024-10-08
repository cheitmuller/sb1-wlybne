'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Habit } from '@/types/habit';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword } from 'lucide-react';

const INITIAL_HABITS: Habit[] = [
  { id: 1, name: 'Running', difficulty: 'medium', xp: 50, skills: [], attributes: [] },
  { id: 2, name: 'Meditation', difficulty: 'easy', xp: 25, skills: [], attributes: [] },
  { id: 3, name: 'Workout', difficulty: 'hard', xp: 100, skills: [], attributes: [] },
];

export default function TodaysAdventurePage() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [completedHabits, setCompletedHabits] = useState<number[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const completeHabit = (id: number) => {
    setCompletedHabits([...completedHabits, id]);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Today's Adventure</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Sword className="mr-2 h-4 w-4" />
                  {habit.name}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold mb-4">XP: {habit.xp}</p>
              <Button 
                onClick={() => completeHabit(habit.id)}
                disabled={completedHabits.includes(habit.id)}
                className="w-full"
              >
                {completedHabits.includes(habit.id) ? 'Completed' : 'Complete'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-4xl font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              +XP!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}