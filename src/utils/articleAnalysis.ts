
// Utility functions for article analysis and comparison

import { toast } from "@/components/ui/use-toast";

// Types
export interface Article {
  id?: string;
  title: string;
  content: string;
  source: string;
  url: string;
  date?: string;
  topics?: string[];
}

export interface ArticleDifference {
  type: 'phrasing' | 'numbers' | 'tone' | 'fact' | 'emphasis';
  originalText: string;
  alternativeText: string;
  originalSource: string;
  alternativeSource: string;
  context?: string;
}

export interface ComparisonResult {
  originalArticle: Article;
  comparedArticle: Article;
  differences: ArticleDifference[];
  similarityScore: number;
}

// Mock data for demo purposes
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Climate Activists Demand Action in Nairobi Protest",
    content: "Climate activists gathered in Nairobi yesterday as protestors demanded change in environmental policies. The demonstration, which saw hundreds attended, remained a peaceful assembly as participants marched through the city center. Organizers claimed the event was a success, highlighting the growing concern about climate issues in Kenya.",
    source: "The Nation",
    url: "https://nation.africa/kenya/news/climate-activists-demand-action",
    date: "2023-05-08",
    topics: ["climate change", "protest", "environment", "Nairobi"]
  },
  {
    id: "2",
    title: "Thousands March for Climate Justice in Capital",
    content: "More than a thousand demonstrators called for reforms to the country's climate policy during yesterday's march in Nairobi. The organized demonstration showcased growing public concern about environmental issues, with participants calling for immediate action from government officials.",
    source: "Daily Nation",
    url: "https://www.dailynation.co.ke/news/environmental-protests",
    date: "2023-05-08",
    topics: ["climate change", "protest", "environment", "Nairobi"]
  },
  {
    id: "3",
    title: "Climate Protest Disrupts City Center Traffic",
    content: "Traffic in central Nairobi was significantly disrupted yesterday when environmental demonstrators blocked several main roads. While police maintained a presence, the event proceeded without major incidents despite some tensions between motorists and protesters.",
    source: "The Standard",
    url: "https://www.standardmedia.co.ke/news/climate-protest-disrupts",
    date: "2023-05-08",
    topics: ["climate change", "traffic", "protest", "Nairobi", "police"]
  },
  {
    id: "4",
    title: "Youth-Led Climate March Shows Growing Public Concern",
    content: "Young activists spearheaded yesterday's environmental rally in Nairobi, with students comprising the majority of participants. Speakers emphasized the need for intergenerational justice and criticized current environmental policies as insufficient to address climate change.",
    source: "Capital FM",
    url: "https://www.capitalfm.co.ke/news/youth-climate-march",
    date: "2023-05-08",
    topics: ["climate change", "youth", "students", "environmental justice", "Nairobi"]
  }
];

// Mock differences for demo
const mockDifferences: Record<string, ArticleDifference[]> = {
  "1_2": [
    {
      type: 'phrasing',
      originalText: "protestors demanded change",
      alternativeText: "demonstrators called for reforms",
      originalSource: "The Nation",
      alternativeSource: "Daily Nation",
    },
    {
      type: 'numbers',
      originalText: "hundreds attended",
      alternativeText: "over a thousand gathered",
      originalSource: "The Nation",
      alternativeSource: "Daily Nation",
    },
    {
      type: 'tone',
      originalText: "peaceful assembly",
      alternativeText: "organized demonstration",
      originalSource: "The Nation",
      alternativeSource: "Daily Nation",
    }
  ],
  "1_3": [
    {
      type: 'phrasing',
      originalText: "protestors demanded change",
      alternativeText: "rioters clashed with police",
      originalSource: "The Nation",
      alternativeSource: "The Standard",
    },
    {
      type: 'numbers',
      originalText: "hundreds attended",
      alternativeText: "a small group of people",
      originalSource: "The Nation",
      alternativeSource: "The Standard",
    },
    {
      type: 'tone',
      originalText: "peaceful assembly",
      alternativeText: "chaotic confrontation",
      originalSource: "The Nation",
      alternativeSource: "The Standard",
    }
  ],
  "1_4": [
    {
      type: 'phrasing',
      originalText: "protestors demanded change",
      alternativeText: "activists rallied for rights",
      originalSource: "The Nation",
      alternativeSource: "Capital FM",
    },
    {
      type: 'numbers',
      originalText: "hundreds attended",
      alternativeText: "massive turnout of supporters",
      originalSource: "The Nation",
      alternativeSource: "Capital FM",
    },
    {
      type: 'tone',
      originalText: "peaceful assembly",
      alternativeText: "historic protest",
      originalSource: "The Nation",
      alternativeSource: "Capital FM",
    }
  ]
};

// Function to search for related articles by topic
export const findRelatedArticles = async (query: string): Promise<Article[]> => {
  try {
    // In a real implementation, this would call an API
    console.log(`Searching for articles related to: ${query}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, just return mock articles
    return mockArticles;
  } catch (error) {
    console.error("Error finding related articles:", error);
    toast({
      title: "Error",
      description: "Failed to find related articles",
      variant: "destructive",
    });
    return [];
  }
};

// Function to extract key topics from an article
export const extractTopics = (articleContent: string): string[] => {
  // In a real implementation, this would use NLP techniques like TF-IDF, entity recognition, etc.
  // Simplified demo implementation:
  
  // Remove common stop words
  const stopWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  
  const words = articleContent
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  // Count word frequencies
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // Sort by frequency and get top keywords
  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
};

// Function to compare two articles and find differences
export const compareArticles = async (articleA: Article, articleB: Article): Promise<ComparisonResult> => {
  try {
    // In a real implementation, this would use NLP techniques
    console.log(`Comparing articles: ${articleA.title} and ${articleB.title}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, just return mock differences
    const comparisonKey = `${articleA.id}_${articleB.id}`;
    const fallbackKey = "1_2";  // Default comparison if not found
    
    const differences = mockDifferences[comparisonKey] || mockDifferences[fallbackKey];
    
    // Calculate a mock similarity score (0-1)
    const similarityScore = 0.65;
    
    return {
      originalArticle: articleA,
      comparedArticle: articleB,
      differences,
      similarityScore
    };
  } catch (error) {
    console.error("Error comparing articles:", error);
    toast({
      title: "Error",
      description: "Failed to compare articles",
      variant: "destructive",
    });
    
    // Return empty comparison
    return {
      originalArticle: articleA,
      comparedArticle: articleB,
      differences: [],
      similarityScore: 0
    };
  }
};

// Analyze article to find possible bias indicators
export const analyzeArticleBias = (article: Article) => {
  // In a real implementation, this would use NLP techniques to identify:
  // - Emotional language
  // - Subjective adjectives
  // - Source credibility assessment
  // - Political leaning estimation
  
  // Demo implementation with dummy data
  return {
    emotionalLanguage: 0.35,  // 0-1 scale
    subjectivity: 0.28,       // 0-1 scale
    politicalLeaning: 0.1,   // -1 to 1 scale (left to right)
    sourceBias: 0.2,         // -1 to 1 scale (known biases)
    confidenceScore: 0.75    // How confident is this assessment
  };
};

// Helper to get highlight color based on difference type
export const getDifferenceColor = (type: string): string => {
  switch (type) {
    case 'phrasing':
      return 'bg-yellow-100 border-yellow-300';
    case 'numbers':
      return 'bg-green-100 border-green-300';
    case 'tone':
      return 'bg-purple-100 border-purple-300';
    case 'fact':
      return 'bg-red-100 border-red-300';
    case 'emphasis':
      return 'bg-blue-100 border-blue-300';
    default:
      return 'bg-blue-100 border-blue-300';
  }
};
