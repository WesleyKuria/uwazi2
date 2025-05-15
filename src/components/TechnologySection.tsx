
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TechnologySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Technology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Backend & NLP</CardTitle>
              <CardDescription>Powerful language processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Under the hood, Uwazi is built with Python, spaCy for keyword extraction, and 
                sentence-transformers to compare article content semantically.
              </p>
              <p>
                We use lightweight scrapers for Kenyan sources like Nation and Citizen, and 
                APIs for international ones.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Frontend & Extension</CardTitle>
              <CardDescription>Seamless user experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The frontend is a clean, React-based Chrome extension that integrates seamlessly 
                into your browsing experience.
              </p>
              <p>
                And yes—it supports English and Swahili, because that's essential for the 
                Kenyan context.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
