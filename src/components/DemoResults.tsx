
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const DemoResults = () => {
  // Updated articles to be more clearly related to each other (same event, different perspectives)
  const articles = [
    {
      id: 1,
      title: "Climate Activists Demand Action in Nairobi Protest",
      source: "The Nation",
      date: "May 8, 2023",
      snippet: "Hundreds gathered in peaceful demonstration calling for stronger environmental policies.",
      differencesCount: 12,
      url: "#"
    },
    {
      id: 2,
      title: "Thousands March for Climate Justice in Capital",
      source: "Daily Nation",
      date: "May 8, 2023",
      snippet: "Over 1,000 protestors marched through Nairobi demanding climate action from government.",
      differencesCount: 8,
      url: "#"
    },
    {
      id: 3,
      title: "Climate Protest Disrupts City Center Traffic",
      source: "The Standard",
      date: "May 8, 2023",
      snippet: "Environmental demonstration causes traffic delays as protestors block main roads in Nairobi.",
      differencesCount: 15,
      url: "#"
    },
    {
      id: 4,
      title: "Youth-Led Climate March Shows Growing Public Concern",
      source: "Capital FM",
      date: "May 8, 2023",
      snippet: "Students and young activists lead environmental justice rally in capital.",
      differencesCount: 10,
      url: "#"
    }
  ];

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Multiple Perspectives Found</h2>
        <Button variant="outline">Filter Results</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="border-none shadow-md hover:shadow-xl transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-medium">{article.title}</CardTitle>
                  <CardDescription>
                    {article.source} • {article.date}
                  </CardDescription>
                </div>
                <Badge variant={article.source === "The Nation" ? "default" : "outline"}>
                  {article.source === "The Nation" ? "Original" : "Alternative"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{article.snippet}</p>
              
              <div className="mt-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {article.differencesCount} Key Differences
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a href={article.url}>Read Full Article</a>
              </Button>
              <Button size="sm" className="gap-1">
                <Eye className="h-4 w-4" />
                Compare
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DemoResults;
