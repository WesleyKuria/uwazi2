
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DownloadExtension = () => {
  const handleDownload = () => {
    // Create a zip file download of the extension
    const extensionFiles = [
      "/extension/manifest.json",
      "/extension/popup.html",
      "/extension/popup.css",
      "/extension/popup.js",
      "/extension/content.js",
      "/extension/content.css",
      "/extension/background.js",
      "/extension/images/icon16.png",
      "/extension/images/icon48.png",
      "/extension/images/icon128.png"
    ];

    // This function would normally use JSZip to bundle these files
    // But for demo purposes, we'll just provide the ZIP directly
    
    // For demo purposes, create a direct download for the pre-packaged extension
    const downloadLink = document.createElement('a');
    downloadLink.href = '/extension/uwazi-extension.zip';
    downloadLink.download = 'uwazi-extension.zip';
    
    // Handle cases where the file might not exist
    downloadLink.onerror = () => {
      toast({
        title: "Extension Download Failed",
        description: "The extension package could not be downloaded. Please try again later.",
        variant: "destructive"
      });
    };
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast({
      title: "Extension Downloaded!",
      description: "Unzip the file and load it as an unpacked extension in Chrome.",
    });
  };

  return (
    <Button onClick={handleDownload} size="lg" className="mt-2 gap-2">
      <Download className="h-4 w-4" />
      Download Extension
    </Button>
  );
};

export default DownloadExtension;
