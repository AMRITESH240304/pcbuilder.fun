"use client";

import Search from "@/components/search";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[100px] md:min-h-[400px] relative p-4">
      <Search
        applicationId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!}
        indexName="*"
        attributes={{
          primaryText: "name",
          secondaryText: undefined,
          tertiaryText: undefined,
          image: undefined,
          url: "",
        }}
      />
    </div>
  );
}
