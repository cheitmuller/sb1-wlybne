'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from 'lucide-react';

type Attribute = {
  name: string;
  value: number;
  maxValue: number;
  description: string;
  icon: React.ReactNode;
};

const ATTRIBUTES: Attribute[] = [
  { 
    name: 'Vitality', 
    value: 0, 
    maxValue: 100, 
    description: 'Represents your overall health and energy levels. Higher vitality helps you stay active throughout the day, resist illness, and recover faster from physical and mental exertion.',
    icon: '❤️'
  },
  { 
    name: 'Strength', 
    value: 0, 
    maxValue: 100, 
    description: 'Reflects your physical and mental resilience. Higher strength allows you to tackle challenging tasks, resist stress, and maintain focus under pressure.',
    icon: '💪'
  },
  { 
    name: 'Dexterity', 
    value: 0, 
    maxValue: 100, 
    description: 'Represents your agility, reflexes, and adaptability. Higher dexterity improves your ability to multitask, react quickly to changes, and maintain work-life balance.',
    icon: '🏃'
  },
  { 
    name: 'Intelligence', 
    value: 0, 
    maxValue: 100, 
    description: 'Reflects your cognitive abilities and problem-solving skills. Higher intelligence enhances your learning capacity, creativity, and ability to find innovative solutions in various aspects of life.',
    icon: '🧠'
  },
  { 
    name: 'Charisma', 
    value: 0, 
    maxValue: 100, 
    description: 'Represents your social skills and personal magnetism. Higher charisma improves your ability to communicate effectively, build relationships, and inspire others in both personal and professional settings.',
    icon: '🗣️'
  },
  { 
    name: 'Wisdom', 
    value: 0, 
    maxValue: 100, 
    description: 'Reflects your life experience and decision-making abilities. Higher wisdom helps you make better choices, understand long-term consequences, and provide valuable advice to others.',
    icon: '🦉'
  },
];

export default function AttributesPage() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  useEffect(() => {
    // Initialize attributes with random values
    const initialAttributes = ATTRIBUTES.map(attr => ({
      ...attr,
      value: Math.floor(Math.random() * 50) + 50, // Random value between 50 and 100
    }));
    setAttributes(initialAttributes);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">My Attributes</h1>
      <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
        Your character's core attributes shape your overall capabilities. Improve these attributes to become a more well-rounded and capable individual.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attributes.map((attr) => (
          <Card key={attr.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  {attr.icon} {attr.name}
                </span>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p>{attr.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center mb-2">{attr.value}</div>
              <Progress value={(attr.value / attr.maxValue) * 100} className="w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}