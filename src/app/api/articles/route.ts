import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tech_articles");
    const articles = await db.collection("articles").find().toArray();

    const formatted = articles.map((article) => ({
      _id: article._id.toString(),
      title: article.title,
      date: article.date,
      content: article.content,
      thumbnail: article.thumbnail,
      url: article.url,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}