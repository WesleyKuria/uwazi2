
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ArticleComparisonView = () => {
  const sources = [
    { id: "source1", name: "The Nation", logo: "nation" },
    { id: "source2", name: "Daily Nation", logo: "dailynation" },
    { id: "source3", name: "The Standard", logo: "standard" },
    { id: "source4", name: "Capital FM", logo: "capitalfm" },
  ];
  
  const [selectedSource, setSelectedSource] = useState("source1");
  
  // Example highlighted differences between articles
  const differences = [
    {
      source1: "protestors demanded change",
      source2: "demonstrators called for reforms",
      source3: "rioters clashed with police",
      source4: "activists rallied for rights",
      type: "phrasing",
    },
    {
      source1: "hundreds attended",
      source2: "over a thousand gathered",
      source3: "a small group of people",
      source4: "massive turnout of supporters",
      type: "numbers",
    },
    {
      source1: "peaceful assembly",
      source2: "organized demonstration",
      source3: "chaotic confrontation",
      source4: "historic protest",
      type: "tone",
    }
  ];
  
  const getHighlightColor = (type: string) => {
    switch (type) {
      case "phrasing":
        return "bg-yellow-100 border-yellow-300";
      case "numbers":
        return "bg-green-100 border-green-300";
      case "tone":
        return "bg-purple-100 border-purple-300";
      default:
        return "bg-blue-100 border-blue-300";
    }
  };
  
  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Article Comparison</span>
          <div className="flex gap-2">
            <Badge variant="outline">Story: Climate Protests</Badge>
            <Badge variant="outline">Date: May 8, 2023</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none">
            <TabsTrigger value="comparison">Side-by-Side View</TabsTrigger>
            <TabsTrigger value="highlight">Highlight View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">The Nation</h3>
                <div className="prose">
                  <p>Climate activists gathered in Nairobi yesterday as <span className={`px-1 border ${getHighlightColor("phrasing")}`}>protestors demanded change</span> in environmental policies. The demonstration, which saw <span className={`px-1 border ${getHighlightColor("numbers")}`}>hundreds attended</span>, remained a <span className={`px-1 border ${getHighlightColor("tone")}`}>peaceful assembly</span> as participants marched through the city center.</p>
                  <p>Organizers claimed the event was a success, highlighting the growing concern about climate issues in Kenya.</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Comparison Source:</h3>
                  <select 
                    className="border rounded p-1"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                  >
                    {sources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="prose">
                  {selectedSource === "source2" && (
                    <p>A large crowd formed in Nairobi yesterday where <span className={`px-1 border ${getHighlightColor("phrasing")}`}>demonstrators called for reforms</span> to the country's climate policy. With <span className={`px-1 border ${getHighlightColor("numbers")}`}>over a thousand gathered</span>, the <span className={`px-1 border ${getHighlightColor("tone")}`}>organized demonstration</span> showcased growing public concern about environmental issues.</p>
                  )}
                  
                  {selectedSource === "source3" && (
                    <p>Tension rose in Nairobi yesterday when <span className={`px-1 border ${getHighlightColor("phrasing")}`}>rioters clashed with police</span> during a climate protest. Only <span className={`px-1 border ${getHighlightColor("numbers")}`}>a small group of people</span> participated in what quickly became a <span className={`px-1 border ${getHighlightColor("tone")}`}>chaotic confrontation</span>, raising questions about the movement's legitimacy.</p>
                  )}
                  
                  {selectedSource === "source4" && (
                    <p>In a show of public concern about climate change, <span className={`px-1 border ${getHighlightColor("phrasing")}`}>activists rallied for rights</span> to a cleaner environment yesterday in Nairobi. The event saw a <span className={`px-1 border ${getHighlightColor("numbers")}`}>massive turnout of supporters</span> in what observers described as a <span className={`px-1 border ${getHighlightColor("tone")}`}>historic protest</span> for environmental justice in Kenya.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Key Differences</h3>
              <div className="space-y-2">
                {differences.map((diff, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div className={`p-2 rounded border ${getHighlightColor(diff.type)}`}>
                      <div className="text-xs font-medium mb-1">The Nation</div>
                      {diff.source1}
                    </div>
                    <div className={`p-2 rounded border ${getHighlightColor(diff.type)}`}>
                      <div className="text-xs font-medium mb-1">Daily Nation</div>
                      {diff.source2}
                    </div>
                    <div className={`p-2 rounded border ${getHighlightColor(diff.type)}`}>
                      <div className="text-xs font-medium mb-1">The Standard</div>
                      {diff.source3}
                    </div>
                    <div className={`p-2 rounded border ${getHighlightColor(diff.type)}`}>
                      <div className="text-xs font-medium mb-1">Capital FM</div>
                      {diff.source4}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="highlight" className="p-4">
            <div className="prose mx-auto">
              <h3 className="font-semibold text-lg mb-2">Climate Protests in Nairobi</h3>
              <p>
                Climate activists gathered in Nairobi yesterday as 
                <span className="relative group">
                  <span className={`px-1 border ${getHighlightColor("phrasing")}`}>protestors demanded change</span>
                  <span className="absolute bottom-full left-0 hidden group-hover:block bg-white p-2 border shadow-lg rounded z-10 w-64">
                    <strong>Other sources say:</strong><br />
                    Daily Nation: "demonstrators called for reforms"<br />
                    The Standard: "rioters clashed with police"<br />
                    Capital FM: "activists rallied for rights"
                  </span>
                </span> in environmental policies. The demonstration, which saw 
                <span className="relative group">
                  <span className={`px-1 border ${getHighlightColor("numbers")}`}>hundreds attended</span>
                  <span className="absolute bottom-full left-0 hidden group-hover:block bg-white p-2 border shadow-lg rounded z-10 w-64">
                    <strong>Other sources say:</strong><br />
                    Daily Nation: "over a thousand gathered"<br />
                    The Standard: "a small group of people"<br />
                    Capital FM: "massive turnout of supporters"
                  </span>
                </span>, remained a 
                <span className="relative group">
                  <span className={`px-1 border ${getHighlightColor("tone")}`}>peaceful assembly</span>
                  <span className="absolute bottom-full left-0 hidden group-hover:block bg-white p-2 border shadow-lg rounded z-10 w-64">
                    <strong>Other sources say:</strong><br />
                    Daily Nation: "organized demonstration"<br />
                    The Standard: "chaotic confrontation"<br />
                    Capital FM: "historic protest"
                  </span>
                </span> as participants marched through the city center.
              </p>
              <p>Organizers claimed the event was a success, highlighting the growing concern about climate issues in Kenya.</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Legend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getHighlightColor("phrasing")} text-black`}>Phrasing Differences</Badge>
                <Badge className={`${getHighlightColor("numbers")} text-black`}>Number Differences</Badge>
                <Badge className={`${getHighlightColor("tone")} text-black`}>Tone Differences</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-2">Hover over highlighted text to see how other sources described the same fact.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ArticleComparisonView;
