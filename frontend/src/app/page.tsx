"use client";

import MultiIndexSearch, { PC_COMPONENT_INDEXES } from "@/components/multi-index-search";
import Hero3D from "@/components/3d-hero";
import FeaturesSection from "@/components/features-section";
import { useState } from "react";

export default function Home() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, any>>({});

  const handleSelectComponent = (component: any, indexName: string) => {
    console.log("Selected component:", component, "from index:", indexName);
    
    // Add component to selected components
    setSelectedComponents(prev => ({
      ...prev,
      [indexName]: component
    }));
    
    // Show toast or notification (optional)
    console.log(`✅ Added ${component.name} to your build`);
  };

  return (
    <>
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Features Section */}
      <FeaturesSection />

      {/* Search & Build Section */}
      <section id="search-section" className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Start Building Your PC
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search components, check compatibility, and get AI-powered recommendations
            </p>
          </header>

          {/* Search Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-xl">
              <MultiIndexSearch
                applicationId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!}
                apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!}
                placeholder="Search for PC components..."
                hitsPerPage={3}
                onSelectComponent={handleSelectComponent}
              />
            </div>

            {/* Selected Components Preview */}
            {Object.keys(selectedComponents).length > 0 && (
              <div className="w-full max-w-4xl mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Build ({Object.keys(selectedComponents).length} components)</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(selectedComponents).map(([indexName, component]) => {
                    const indexConfig = PC_COMPONENT_INDEXES.find(idx => idx.name === indexName);
                    return (
                      <div
                        key={indexName}
                        className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{indexConfig?.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              {indexConfig?.label}
                            </p>
                            <p className="font-medium text-foreground truncate">
                              {component.name}
                            </p>
                            {component.price && (
                              <p className="text-sm text-primary mt-1">
                                ${typeof component.price === 'number' ? component.price.toFixed(2) : component.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Component Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
              {PC_COMPONENT_INDEXES.slice(0, 8).map((category) => (
                <div
                  key={category.name}
                  className="group p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-foreground">{category.label}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{category.name.replace(/-/g, " ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
