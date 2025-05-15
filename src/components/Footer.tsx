
import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Uwazi</h2>
            <p className="mb-4 text-slate-300">
              Empowering readers with multiple perspectives on news stories. Developed for The Nation Hackathon 2.0.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Product</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Extension</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-slate-700" />
        
        <div className="text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Uwazi. All rights reserved.</p>
          <p className="mt-2">Created for The Nation Hackathon 2.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
