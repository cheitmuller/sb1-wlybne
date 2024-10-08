'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skill } from '@/types/skill';
import { Brain, Plus, Trash2, Edit, Sword, Book, Music, Palette, Code, Heart, Star, Dumbbell, Zap } from 'lucide-react';

const INITIAL_SKILLS = ['Cooking', 'Fitness', 'Programming', 'Art', 'Salsa', 'Spanish', 'Mindfulness'];

const ICONS = [
  { name: 'Brain', component: Brain },
  { name: 'Sword', component: Sword },
  { name: 'Book', component: Book },
  { name: 'Music', component: Music },
  { name: 'Palette', component: Palette },
  { name: 'Code', component: Code },
  { name: 'Heart', component: Heart },
  { name: 'Star', component: Star },
  { name: 'Dumbbell', component: Dumbbell },
  { name: 'Zap', component: Zap },
];

type SkillWithLevel = Skill & {
  level: number;
  xp: number;
  nextLevelXp: number;
  icon: string;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillWithLevel[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', icon: 'Brain' });
  const [editingSkill, setEditingSkill] = useState<SkillWithLevel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Initialize skills with levels, XP, and icons
    setSkills(INITIAL_SKILLS.map(name => ({
      id: name.toLowerCase(),
      name,
      level: Math.floor(Math.random() * 5) + 1,
      xp: Math.floor(Math.random() * 100),
      nextLevelXp: 100,
      icon: 'Brain',
    })));
  }, []);

  const handleNewSkill = () => {
    if (newSkill.name.trim()) {
      const skill: SkillWithLevel = {
        id: newSkill.name.toLowerCase(),
        name: newSkill.name,
        level: 1,
        xp: 0,
        nextLevelXp: 100,
        icon: newSkill.icon,
      };
      setSkills([...skills, skill]);
      setNewSkill({ name: '', icon: 'Brain' });
      setIsDialogOpen(false);
    }
  };

  const startEditing = (skill: SkillWithLevel) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, icon: skill.icon });
    setIsDialogOpen(true);
  };

  const handleEditSkill = () => {
    if (editingSkill && newSkill.name.trim()) {
      setSkills(skills.map(s => s.id === editingSkill.id ? { ...editingSkill, name: newSkill.name, icon: newSkill.icon } : s));
      setEditingSkill(null);
      setNewSkill({ name: '', icon: 'Brain' });
      setIsDialogOpen(false);
    }
  };

  const deleteSkill = (id: string) => {
    setSkillToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (skillToDelete !== null) {
      setSkills(skills.filter(s => s.id !== skillToDelete));
      setDeleteConfirmOpen(false);
      setSkillToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">My Skills</h1>
      <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
        Track and level up your various abilities. Each skill represents a unique talent or area of expertise you're developing on your journey.
      </p>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <Plus className="mr-2 h-4 w-4" /> New Skill
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSkill ? 'Edit Skill' : 'Create New Skill'}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="mb-4"
          />
          <Select
            value={newSkill.icon}
            onValueChange={(value) => setNewSkill({ ...newSkill, icon: value })}
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
          <DialogFooter>
            <Button onClick={editingSkill ? handleEditSkill : handleNewSkill}>
              {editingSkill ? 'Save Changes' : 'Create Skill'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const IconComponent = ICONS.find(icon => icon.name === skill.icon)?.component || Brain;
          return (
            <Card key={skill.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <IconComponent className="mr-2 h-5 w-5" />
                    {skill.name}
                  </span>
                  <span className="text-2xl font-bold">Lv. {skill.level}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Progress value={(skill.xp / skill.nextLevelXp) * 100} className="mb-2" />
                <p className="text-center mb-4">{skill.xp} / {skill.nextLevelXp} XP</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => startEditing(skill)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteSkill(skill.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
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
          <p>Are you sure you want to delete this skill?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}