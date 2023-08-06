"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ina C.",
    avatar: "A",
    title: "Software Engineer",
    description:
      "By far the best all-in-one application for helping me write code more efficiently!",
  },
  {
    name: "Daniel G.",
    avatar: "B",
    title: "Student",
    description:
      "Einstein is THE tool for students in this day and age! It helps me with all my day-to-day tasks at school.",
  },
  {
    name: "Justin L.",
    avatar: "C",
    title: "Content Creator",
    description:
      "Having image generation and video generation in the same site alone makes Einstein super convenient and worth it!",
  },
  {
    name: "Jeremy H.",
    avatar: "D",
    title: "Music Producer",
    description:
      "I always come back to Einstein for inspiration before I produce my own beats because of its music generation AI model.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-indigo-900 border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
