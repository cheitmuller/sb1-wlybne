'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Habit } from '@/types/habit';
import { Skill } from '@/types/skill';
import { Dumbbell, Brain, Zap, Trash2, Plus, Sword, Book, Music, Palette, Code, Heart, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const INITIAL_SKILLS: Skill[] = [
  { id: 'cooking', name: 'Cooking' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'programming', name: 'Programming' },
  { id: 'art', name: 'Art' },
  { id: 'salsa', name: 'Salsa' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'mindfulness', name: 'Mindfulness' },
];

const ATTRIBUTES = ['Vitality', 'Strength', 'Dexterity', 'Luck'];

const ICONS = [
  { name: 'Sword', component: Sword },
  { name: 'Dumbbell', component: Dumbbell },
  { name: 'Brain', component: Brain },
  { name: 'Book', component: Book },
  { name: 'Music', component: Music },
  { name: 'Palette', component: Palette },
  { name: 'Code', component: Code },
  { name: 'Heart', component: Heart },
  { name: 'Star', component: Star },
];

export default function HabitsPage() {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<Habit>({
    id: 0,
    name: '',
    difficulty: 'medium',
    xp: 50,
    skills: [],
    attributes: [],
    icon: 'Sword'
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [skillsInteracted, setSkillsInteracted] = useState(false);
  const [attributesInteracted, setAttributesInteracted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [attributeError, setAttributeError] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<number | null>(null);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleNewHabit = () => {
    if (newHabit.name.trim()) {
      const skillsTotal = newHabit.skills.reduce((sum, skill) => sum + skill.percentage, 0);
      const attributesTotal = newHabit.attributes.reduce((sum, attr) => sum + attr.percentage, 0);

      setSkillError(newHabit.skills.length === 0);
      setAttributeError(newHabit.attributes.length === 0);

      if (newHabit.skills.length === 0 || newHabit.attributes.length === 0) {
        return;
      }

      if (skillsTotal < 99 || skillsTotal > 100 || attributesTotal < 99 || attributesTotal > 100) {
        toast({
          title: "Error",
          description: "Skills and Attributes must each total between 99-100%.",
          variant: "destructive",
        });
        return;
      }

      if (editingHabit) {
        setHabits(habits.map(h => h.id === editingHabit.id ? newHabit : h));
        toast({
          title: "Habit Updated",
          description: `${newHabit.name} has been successfully updated.`,
        });
      } else {
        setHabits([...habits, { ...newHabit, id: Date.now() }]);
        toast({
          title: "Habit Created",
          description: `${newHabit.name} has been successfully created.`,
        });
      }
      setNewHabit({
        id: 0,
        name: '',
        difficulty: 'medium',
        xp: 50,
        skills: [],
        attributes: [],
        icon: 'Sword'
      });
      setEditingHabit(null);
      setIsDialogOpen(false);
      setSkillsInteracted(false);
      setAttributesInteracted(false);
      setNameError(false);
      setSkillError(false);
      setAttributeError(false);
    } else {
      setNameError(true);
    }
  };

  const deleteHabit = (id: number) => {
    setHabitToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (habitToDelete !== null) {
      setHabits(habits.filter(h => h.id !== habitToDelete));
      setDeleteConfirmOpen(false);
      setHabitToDelete(null);
      toast({
        title: "Habit Deleted",
        description: "The habit has been successfully deleted.",
      });
    }
  };

  const handleSkillChange = (skillId: string, checked: boolean) => {
    setSkillsInteracted(true);
    setSkillError(false);
    if (checked) {
      const updatedSkills = [...newHabit.skills, { id: skillId, percentage: 0 }];
      distributePercentages(updatedSkills, 'skills');
    } else {
      const updatedSkills = newHabit.skills.filter(s => s.id !== skillId);
      distributePercentages(updatedSkills, 'skills');
    }
  };

  const handleAttributeChange = (attrName: string, checked: boolean) => {
    setAttributesInteracted(true);
    setAttributeError(false);
    if (checked) {
      const updatedAttributes = [...newHabit.attributes, { name: attrName, percentage: 0 }];
      distributePercentages(updatedAttributes, 'attributes');
    } else {
      const updatedAttributes = newHabit.attributes.filter(a => a.name !== attrName);
      distributePercentages(updatedAttributes, 'attributes');
    }
  };

  const distributePercentages = (items: any[], type: 'skills' | 'attributes') => {
    const totalItems = items.length;
    if (totalItems === 0) return;

    const percentagePerItem = Math.floor(100 / totalItems);
    const remainder = 100 % totalItems;

    const updatedItems = items.map((item, index) => ({
      ...item,
      percentage: percentagePerItem + (index < remainder ? 1 : 0)
    }));

    setNewHabit(prev => ({
      ...prev,
      [type]: updatedItems
    }));
  };

  const handlePercentageChange = (type: 'skill' | 'attribute', id: string, value: number) => {
    if (type === 'skill') setSkillsInteracted(true);
    if (type === 'attribute') setAttributesInteracted(true);

    const updatedHabit = { ...newHabit };
    if (type === 'skill') {
      updatedHabit.skills = updatedHabit.skills.map(s => 
        s.id === id ? { ...s, percentage: value } : s
      );
    } else {
      updatedHabit.attributes = updatedHabit.attributes.map(a => 
        a.name === id ? { ...a, percentage: value } : a
      );
    }
    setNewHabit(updatedHabit);
  };

  const handleDifficultyChange = (value: string) => {
    const difficulty = value as 'easy' | 'medium' | 'hard';
    let xp = newHabit.xp;
    switch (difficulty) {
      case 'easy':
        xp = Math.min(Math.max(xp, 0), 50);
        break;
      case 'medium':
        xp = Math.min(Math.max(xp, 50), 100);
        break;
      case 'hard':
        xp = Math.min(Math.max(xp, 100), 200);
        break;
    }
    setNewHabit({ ...newHabit, difficulty, xp });
  };

  const handleXpChange = (value: number[]) => {
    setNewHabit({ ...newHabit, xp: value[0] });
  };

  const handleIconChange = (value: string) => {
    setNewHabit({ ...newHabit, icon: value });
  };

  const skillsTotal = newHabit.skills.reduce((sum, skill) => sum + skill.percentage, 0);
  const attributesTotal = newHabit.attributes.reduce((sum, attr) => sum + attr.percentage, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">My Habits</h1>
      <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
        Create and track your daily quests. Level up your life by completing habits and gaining experience!
      </p>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <Plus className="mr-2 h-4 w-4" /> New Habit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingHabit ? 'Edit Habit' : 'Create New Habit'}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Habit name"
            value={newHabit.name}
            onChange={(e) => {
              setNewHabit({ ...newHabit, name: e.target.value });
              setNameError(false);
            }}
            className="mb-4"
          />
          <Select
            value={newHabit.difficulty}
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <div className="mb-4">
            <Label>XP: {newHabit.xp}</Label>
            <Slider
              value={[newHabit.xp]}
              onValueChange={handleXpChange}
              max={newHabit.difficulty === 'easy' ? 50 : newHabit.difficulty === 'medium' ? 100 : 200}
              min={newHabit.difficulty === 'easy' ? 0 : newHabit.difficulty === 'medium' ? 50 : 100}
              step={1}
              className="mt-2"
            />
          </div>
          <Select
            value={newHabit.icon}
            onValueChange={handleIconChange}
          >
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              {ICONS.map((icon) => (
                <SelectItem key={icon.name} value={icon.name}>
                  <div className="flex items-center">
                    <icon.component className="mr-2 h-4 w-4" />
                    {icon.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mb-4">
            <Label>Skills</Label>
            {INITIAL_SKILLS.map((skill) => (
              <div key={skill.id} className="flex items-center mb-2">
                <Checkbox
                  id={`skill-${skill.id}`}
                  checked={newHabit.skills.some(s => s.id === skill.id)}
                  onCheckedChange={(checked) => handleSkillChange(skill.id, checked as boolean)}
                />
                <Label htmlFor={`skill-${skill.id}`} className="ml-2">{skill.name}</Label>
                {newHabit.skills.some(s => s.id === skill.id) && (
                  <div className="ml-auto flex items-center">
                    <Input
                      type="number"
                      value={newHabit.skills.find(s => s.id === skill.id)?.percentage || 0}
                      onChange={(e) => handlePercentageChange('skill', skill.id, parseInt(e.target.value))}
                      className="w-16 mr-1"
                      min="0"
                      max="100"
                      step="1"
                      style={{ appearance: 'textfield' }}
                    />
                    <span>%</span>
                  </div>
                )}
              </div>
            ))}
            {skillsInteracted && (skillsTotal < 99 || skillsTotal > 100) && (
              <p className="text-red-500 text-sm mt-2">Skills total needs to be 100%</p>
            )}
          </div>
          <div className="mb-4">
            <Label>Attributes</Label>
            {ATTRIBUTES.map((attr) => (
              <div key={attr} className="flex items-center mb-2">
                <Checkbox
                  id={`attr-${attr}`}
                  checked={newHabit.attributes.some(a => a.name === attr)}
                  onCheckedChange={(checked) => handleAttributeChange(attr, checked as boolean)}
                />
                <Label htmlFor={`attr-${attr}`} className="ml-2">{attr}</Label>
                {newHabit.attributes.some(a => a.name === attr) && (
                  <div className="ml-auto flex items-center">
                    <Input
                      type="number"
                      value={newHabit.attributes.find(a => a.name === attr)?.percentage || 0}
                      onChange={(e) => handlePercentageChange('attribute', attr, parseInt(e.target.value))}
                      className="w-16 mr-1"
                      min="0"
                      max="100"
                      step="1"
                      style={{ appearance: 'textfield' }}
                    />
                    <span>%</span>
                  </div>
                )}
              </div>
            ))}
            {attributesInteracted && (attributesTotal < 99 || attributesTotal > 100) && (
              <p className="text-red-500 text-sm mt-2">Attributes total needs to be 100%</p>
            )}
          </div>
          <DialogFooter>
            <div className="w-full">
              {nameError && (
                <p className="text-red-500 text-sm mb-2">Please enter a habit name</p>
              )}
              {skillError && (
                <p className="text-red-500 text-sm mb-2">Don't forget to select a skill</p>
              )}
              {attributeError && (
                <p className="text-red-500 text-sm mb-2">Don't forget to select an attribute</p>
              )}
              <Button onClick={handleNewHabit} className="w-full">
                {editingHabit ? 'Update Habit' : 'Create Habit'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => {
          const IconComponent = ICONS.find(icon => icon.name === habit.icon)?.component || Sword;
          return (
            <Card key={habit.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <IconComponent className="mr-2 h-4 w-4" />
                    {habit.name}
                  </span>
                  <Badge>{habit.difficulty}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xl font-bold mb-2">XP: {habit.xp}</p>
                <div className="mb-2">
                  <h4 className="font-semibold text-sm mb-1">Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {habit.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="text-xs">
                        {INITIAL_SKILLS.find(s => s.id === skill.id)?.name}: {skill.percentage}%
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="font-semibold text-sm mb-1">Attributes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {habit.attributes.map((attr) => (
                      <Badge key={attr.name} variant="outline" className="text-xs">
                        {attr.name}: {attr.percentage}%
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingHabit(habit);
                    setNewHabit(habit);
                    setIsDialogOpen(true);
                    setSkillsInteracted(false);
                    setAttributesInteracted(false);
                    setNameError(false);
                    setSkillError(false);
                    setAttributeError(false);
                  }}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteHabit(habit.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this habit?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}