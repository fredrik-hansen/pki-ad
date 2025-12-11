
import React from 'react';
import { Award, Shield, Users, Globe, Monitor } from 'lucide-react';
import { SiFreebsd, SiOpenbsd, SiApple, SiDebian, SiUbuntu } from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import { IconType } from 'react-icons';

export const Certifications = () => {
  const operatingSystems: { name: string; icon: IconType }[] = [
    { name: "FreeBSD", icon: SiFreebsd },
    { name: "OpenBSD", icon: SiOpenbsd },
    { name: "macOS", icon: SiApple },
    { name: "Debian", icon: SiDebian },
    { name: "Ubuntu", icon: SiUbuntu },
    { name: "Windows Client", icon: FaWindows },
    { name: "Windows Server", icon: FaWindows }
  ];

  const certificates = [
    {
      title: "ITIL Foundation",
      issuer: "Change Management Framework",
      type: "ITIL Foundation Course",
      level: "Level-Introductory",
      date: "October 2010",
      image: "/images/1e973b5f-757d-4ee5-8ace-8aa30b8f51ce.png",
      icon: Shield,
      category: "IT Service Management"
    },    {
      title: "PEJL",
      issuer: "PEJL AB",
      type: "Completed specialized leadership and project management certification",
      level: " ",
      date: "October 2010",
      image: "/images/1e973b5f-757d-4ee5-8ace-8aa30b8f51ce.png",
      icon: Shield,
      category: "Project Management"
    },    {
      title: "Cluster Munitions",
      issuer: "United Nations Office for Disarmament Affairs",
      type: "Online Short Course",
      level: "Level-Introductory",
      date: "October 2023",
      image: "/images/1e973b5f-757d-4ee5-8ace-8aa30b8f51ce.png",
      icon: Shield,
      category: "Weapons Systems"
    },
    {
      title: "Lethal Autonomous Weapon Systems",
      issuer: "United Nations Office for Disarmament Affairs", 
      type: "Online Short Course",
      level: "Level-Introductory",
      date: "October 2023",
      image: "/images/1062d581-372a-4f92-b112-5aec3ae9e5fc.png",
      icon: Shield,
      category: "Weapons Systems"
    },
    {
      title: "Nuclear Security",
      issuer: "United Nations Office for Disarmament Affairs",
      type: "Online Short Course", 
      level: "Level-Introductory",
      date: "October 2023",
      image: "/images/d345539c-6195-4d9d-8f86-b7f5ea233e83.png",
      icon: Shield,
      category: "Nuclear Security"
    },
    {
      title: "Introduction to Disarmament",
      issuer: "United Nations Office for Disarmament Affairs",
      type: "Online Short Course",
      level: "Level-Introductory", 
      date: "October 2023",
      image: "/images/79fbd4b7-89b3-4864-aa05-a0999f2e63a0.png",
      icon: Globe,
      category: "International Relations"
    }
  ];

  const recognition = {
    title: "UN Internet Governance Forum 2021",
    issuer: "Republic of Poland - Chancellery of the Prime Minister",
    signatory: "Krzysztof Szubert",
    position: "High Representative for European Digital Policy",
    description: "Acknowledgment for active involvement in the 16th UN Internet Governance Forum meeting in Katowice, Poland",
    date: "December 15th, 2021",
    image: "/images/cdaa755b-7933-47de-a383-3e2daa2347e0.png"
  };

  return (
    <section id="certifications" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Certifications & Recognition
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Professional certifications and international recognition in cybersecurity, 
            disarmament affairs, and global digital governance initiatives.
          </p>
        </div>

        {/* Operating Systems Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Monitor className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-2xl font-semibold text-white">Operating Systems Experience</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {operatingSystems.map((os, index) => {
              const OSIcon = os.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative h-full p-4 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <OSIcon className="w-8 h-8 text-purple-400" />
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {os.name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* UN Certificates Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Award className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-2xl font-semibold text-white">Courses and Certificates</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative h-full p-6 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <cert.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-white mb-2 leading-tight">
                        {cert.title}
                      </h4>
                      <p className="text-slate-300 text-sm mb-2">{cert.issuer}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/50">
                          {cert.type}
                        </span>
                        <span className="px-2 py-1 text-xs bg-cyan-600/20 text-cyan-300 rounded-full border border-cyan-500/50">
                          {cert.level}
                        </span>
                        <span className="px-2 py-1 text-xs bg-slate-600/20 text-slate-300 rounded-full border border-slate-500/50">
                          {cert.category}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{cert.date}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Section */}
        <div>
          <div className="flex items-center mb-8">
            <Users className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-semibold text-white">International Recognition</h3>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative p-8 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Globe className="w-10 h-10 text-green-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {recognition.title}
                      </h4>
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {recognition.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="text-slate-400 w-24">From:</span>
                          <span className="text-slate-300">{recognition.issuer}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-400 w-24">Signatory:</span>
                          <span className="text-slate-300">{recognition.signatory}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-400 w-24">Position:</span>
                          <span className="text-slate-300">{recognition.position}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-400 w-24">Date:</span>
                          <span className="text-slate-300">{recognition.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 text-xs bg-green-600/20 text-green-300 rounded-full border border-green-500/50">
                          Internet Governance
                        </span>
                        <span className="px-3 py-1 text-xs bg-teal-600/20 text-teal-300 rounded-full border border-teal-500/50">
                          Digital Policy
                        </span>
                        <span className="px-3 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/50">
                          International Relations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-slate-300 font-medium">Official Recognition</p>
                      <p className="text-xs text-slate-400 mt-1">Government of Poland</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 h-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center space-y-4 px-8 py-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-200"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-300"></div>
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-medium text-lg mb-2">
                Professional Development Summary
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-purple-300 font-semibold">7 Operating Systems</p>
                  <p className="text-slate-400">Expert & Advanced</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-300 font-semibold">4 UN Certificates</p>
                  <p className="text-slate-400">Disarmament & Security</p>
                </div>
                <div className="text-center">
                  <p className="text-green-300 font-semibold">1 Government Recognition</p>
                  <p className="text-slate-400">Digital Governance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
