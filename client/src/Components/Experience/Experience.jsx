import Navbar from "../Navbar/Navbar"
import "./Experience.css"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Clock, BookOpen, Target, Route, Library, Gavel } from 'lucide-react';
const Experience = () => {
  return (
    <div>
        <div>
      <Navbar/> 
        </div>
        <div className="min-h-screen  mt-20">
      {/* Blur effect background */}
      <div className="fixed inset-0  backdrop-blur-sm" />
      
      {/* Main content */}
      <div className="relative max-w-4xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Software Engineer Interview at TechCorp</h1>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-green-900/50 text-green-200">Accepted</Badge>
            <Badge className="bg-blue-900/50 text-blue-200">On-site</Badge>
            <Badge className="bg-purple-900/50 text-purple-200">New Grad</Badge>
          </div>
        </div>

        {/* Basic Criteria */}
        <Card className="basic-criteria-exp bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">Basic Criteria</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-slate-100 ">
            <ul className="list-disc pl-6 space-y-2 ">
              <li>Bachelor's degree in Computer Science or related field</li>
              <li>0-2 years of professional experience</li>
              <li>Strong knowledge of data structures and algorithms</li>
              <li>Proficiency in at least one programming language</li>
            </ul>
          </CardContent>
        </Card>

        {/* Pre-interview Journey */}
        <Card className="pre-interview-exp bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-green-400" />
              <CardTitle className="text-white">Pre-interview Journey</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-100">
            <div className="timeline-exp">
              <div className="flex gap-4 pb-4">
                <div className="w-24 font-semibold text-slate-400">Day 1-30</div>
                <div className="flex-1">
                  <p>Started with basic DSA preparation and system design fundamentals</p>
                </div>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex gap-4 py-4">
                <div className="w-24 font-semibold text-slate-400">Day 31-45</div>
                <div className="flex-1">
                  <p>Focused on mock interviews and problem-solving practice</p>
                </div>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex gap-4 pt-4">
                <div className="w-24 font-semibold text-slate-400">Day 46-60</div>
                <div className="flex-1">
                  <p>Company-specific preparation and behavioral interview practice</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Summary */}
        <Card className="interview-summary-exp bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-white">Interview Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="summary-item-exp p-4 bg-slate-700/50 rounded-lg text-slate-200">
                <h3 className="font-semibold mb-2">Duration</h3>
                <p>4 hours total (4 rounds)</p>
              </div>
              <div className="summary-item-exp p-4 bg-slate-700/50 rounded-lg text-slate-200">
                <h3 className="font-semibold mb-2">Difficulty</h3>
                <p>Moderately Difficult</p>
              </div>
              <div className="summary-item-exp p-4 bg-slate-700/50 rounded-lg text-slate-200">
                <h3 className="font-semibold mb-2">Topics Covered</h3>
                <p>DSA, System Design, Behavioral</p>
              </div>
              <div className="summary-item-exp p-4 bg-slate-700/50 rounded-lg text-slate-200">
                <h3 className="font-semibold mb-2">Interview Type</h3>
                <p>Virtual On-site</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Experience */}
        <Card className="detailed-exp bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white">Detailed Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="round-exp">
              <h3 className="text-lg font-semibold mb-3 text-white">Round 1: Technical</h3>
              <CardDescription className="mb-2 text-slate-400">Duration: 1 hour</CardDescription>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-slate-200">Problem 1: Binary Tree Level Order Traversal</h4>
                  <p className="text-slate-300">The interviewer started with a discussion about my background before diving into the technical question. They asked me to implement level-order traversal of a binary tree...</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-slate-200">Problem 2: System Design Discussion</h4>
                  <p className="text-slate-300">We discussed the design of a simple URL shortener service, focusing on the API design and data model...</p>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            <div className="round-exp">
              <h3 className="text-lg font-semibold mb-3 text-white">Round 2: Behavioral</h3>
              <CardDescription className="mb-2 text-slate-400">Duration: 45 minutes</CardDescription>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-300">The behavioral round focused on past projects, team collaboration experiences, and conflict resolution scenarios...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Resources */}
        <Card className="resources-exp bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Library className="h-5 w-5 text-red-400" />
              <CardTitle className="text-white">Recommended Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="resource-item-exp p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-200">DSA Practice</h3>
                <ul className="list-disc pl-4 text-slate-300">
                  <li>LeetCode Premium</li>
                  <li>Blind 75 Questions</li>
                  <li>Cracking the Coding Interview</li>
                </ul>
              </div>
              <div className="resource-item-exp p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-200">System Design</h3>
                <ul className="list-disc pl-4 text-slate-300">
                  <li>System Design Primer</li>
                  <li>Grokking System Design</li>
                  <li>High Scalability Blog</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verdict */}
        <Card className="verdict-exp bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-white">Final Verdict</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-green-900/30 p-6 rounded-lg">
              <h3 className="text-green-200 font-semibold text-lg mb-2">Selected! 🎉</h3>
              <p className="text-green-100">Received the offer after 1 week. The interview process was thorough but fair. The team was professional and made the experience comfortable despite the technical rigor.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    </div>
  )
}

export default Experience
