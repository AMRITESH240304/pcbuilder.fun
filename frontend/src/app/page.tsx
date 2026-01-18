"use client";

import MultiIndexSearch, { PC_COMPONENT_INDEXES } from "@/components/multi-index-search";

export default function Home() {
  const handleSelectComponent = (component: any, indexName: string) => {
    console.log("Selected component:", component, "from index:", indexName);
    // TODO: Add component to build
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            PC Builder
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Build your dream PC with intelligent compatibility checking and real-time recommendations
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
    </div>
  );
}
