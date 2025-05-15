
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Book, Link, Eye } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      title: "Compare Perspectives",
      description: "See how different media outlets cover the same story with our semantic comparison engine.",
      icon: <Eye className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Discover Hidden Facts",
      description: "Find facts and details mentioned in some sources but omitted in others.",
      icon: <Search className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Chrome Extension",
      description: "Get insights right where you read with our browser extension overlay.",
      icon: <Link className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Language Analysis",
      description: "Identify emotional language and potential bias through NLP analysis.",
      icon: <Book className="h-8 w-8 text-purple-600" />,
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
