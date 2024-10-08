'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Heart, Shield, Zap, Clover } from 'lucide-react';

type Attribute = {
  name: string;
  value: number;
  maxValue: number;
  icon: React.ReactNode;
};

type Profile = {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  attributes: Attribute[];
};

const ATTRIBUTES: Attribute[] = [
  { name: 'Vitality', value: 0, maxValue: 100, icon: <Heart className="w-4 h-4" /> },
  { name: 'Strength', value: 0, maxValue: 100, icon: <Shield className="w-4 h-4" /> },
  { name: 'Dexterity', value: 0, maxValue: 100, icon: <Zap className="w-4 h-4" /> },
  { name: 'Luck', value: 0, maxValue: 100, icon: <Clover className="w-4 h-4" /> },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch this data from an API or database
    setProfile({
      name: 'Adventurer',
      level: 5,
      xp: 450,
      nextLevelXp: 1000,
      attributes: ATTRIBUTES.map(attr => ({
        ...attr,
        value: Math.floor(Math.random() * 50) + 50,
      })),
    });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={profile.name} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                {profile.name}
              </span>
              <span className="text-2xl font-bold">Lv. {profile.level}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(profile.xp / profile.nextLevelXp) * 100} className="mb-2" />
            <p className="text-center">{profile.xp} / {profile.nextLevelXp} XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.attributes.map((attr) => (
                <div key={attr.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center">
                      {attr.icon}
                      <span className="ml-2">{attr.name}</span>
                    </span>
                    <span>{attr.value}</span>
                  </div>
                  <Progress value={(attr.value / attr.maxValue) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}