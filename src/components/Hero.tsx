
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-700 to-blue-700 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAxOHYyaC00di0yaDR6TTE4IDE4aDJ2LTRoLTJ2NHptLTItMnYtMmgtNHYyaDR6bTAgMTJ2LTJoLTR2Mmg0em0wIDEydi0yaC00djJoNHptMTIgMmgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6bTEyIDB2LTJoLTR2Mmg0em0wLTEydi0yaC00djJoNHptMC0xMnYtMmgtNHYyaDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              Uwazi
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-100">
            See the whole picture. Discover multiple perspectives on news stories.
          </p>
          <div className="text-lg mb-8 opacity-90">
            Uwazi reveals how different media outlets cover the same story—empowering you to see beyond a single narrative.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="default" className="bg-white text-blue-700 hover:bg-blue-50">
              Download Extension
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
          
          {/* Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold">15+</div>
              <div className="text-blue-200">News Sources</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">1000+</div>
              <div className="text-blue-200">Articles Compared</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">360°</div>
              <div className="text-blue-200">News Experience</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f8fafc" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
