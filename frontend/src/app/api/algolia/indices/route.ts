import { algoliasearch } from "algoliasearch";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      process.env.ALGOLIA_WRITE_API_KEY! // Write key has listIndexes permission
    );

    const { items } = await client.listIndices();
    
    return NextResponse.json({
      indices: items.map((index) => ({
        name: index.name,
        entries: index.entries,
        dataSize: index.dataSize,
      })),
    });
  } catch (error) {
    console.error("Error fetching indices:", error);
    return NextResponse.json(
      { error: "Failed to fetch indices" },
      { status: 500 }
    );
  }
}
