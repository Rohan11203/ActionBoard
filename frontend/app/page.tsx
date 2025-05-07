"use client";
import {
  ArrowRight,
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  Menu,
  X,
} from "lucide-react";
import Dashboard from "./dashboard/page";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-blue-800">Action Aboard</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-blue-800 hover:text-blue-600 px-3 py-2 font-medium">Features</a>
              <a href="#" className="text-blue-800 hover:text-blue-600 px-3 py-2 font-medium">Pricing</a>
              <a href="#" className="ml-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700">Sign Up</a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-blue-800">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              
              <a href="#" className="block px-3 py-2 mt-4 text-center rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700">Sign Up</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - First Slide */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl tracking-tight font-extrabold text-blue-900 sm:text-5xl md:text-6xl">
                <span className="block">Manage tasks</span>
                <span className="block text-blue-600">with ease</span>
              </h1>
              <p className="mt-4 text-base text-blue-800 sm:text-lg md:text-xl">
                Streamline your workflow, collaborate seamlessly, and never miss a deadline with TaskFlow.
              </p>
              <div className="mt-8">
                <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Get started for free
                </a>
                <a href="#" className="ml-4 inline-flex items-center px-6 py-3 border border-blue-300 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
                  Learn more <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-blue-100 rounded-lg shadow-lg p-4 h-64 sm:h-72 md:h-96 flex items-center justify-center">
                <img src="/taskImage.avif" alt="Task management dashboard" className="h-full w-full object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Second Slide */}
      <div className="min-h-screen bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Simple tools that make task management a breeze
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Task Management</h3>
              <p className="mt-2 text-base text-gray-600">
                Create, assign, and track tasks with ease. Set priorities and deadlines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Time Tracking</h3>
              <p className="mt-2 text-base text-gray-600">
                Track time spent on tasks and analyze your productivity patterns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Team Collaboration</h3>
              <p className="mt-2 text-base text-gray-600">
                Work together seamlessly with your team members on any project.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-lg">
              Start your free trial today
            </a>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-medium text-blue-800">Action Aboard</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">© 2025 TaskFlow. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
}
