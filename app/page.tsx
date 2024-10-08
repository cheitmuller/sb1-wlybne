import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sword, Brain, Heart, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        RPG Habit Tracker
      </h1>
      <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
        Level up your life by turning your daily habits into an epic adventure. Track your progress, gain experience, and become the hero of your own story!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Sword className="mr-2 h-6 w-6" /> Habits
            </CardTitle>
            <CardDescription>Create and track your daily quests</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/habits">
              <Button className="w-full">Manage Habits</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Brain className="mr-2 h-6 w-6" /> Skills
            </CardTitle>
            <CardDescription>Develop your character's abilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/skills">
              <Button className="w-full">View Skills</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Heart className="mr-2 h-6 w-6" /> Profile
            </CardTitle>
            <CardDescription>Check your hero's stats and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile">
              <Button className="w-full">My Profile</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="mr-2 h-6 w-6" /> Quick Start
            </CardTitle>
            <CardDescription>Begin your journey now</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/habits">
              <Button className="w-full">Add First Habit</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}