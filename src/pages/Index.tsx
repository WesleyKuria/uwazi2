
import React from "react";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import DemoResults from "@/components/DemoResults";
import ArticleComparisonView from "@/components/ArticleComparisonView";
import TechnologySection from "@/components/TechnologySection";
import DownloadExtension from "@/components/DownloadExtension";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-8">
          <h2 className="text-3xl font-bold mb-6">Try Uwazi Today</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
            Experience news from multiple perspectives and make more informed decisions
            about what's happening in the world.
          </p>
          <DownloadExtension />
        </div>
        
        <DemoResults />
        <ArticleComparisonView />
      </div>
      
      <TechnologySection />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default Index;
