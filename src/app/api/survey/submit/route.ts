import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const ROLES = ["CEO", "CTO", "Consultant"];
function normalizeRole(role: string): string {
  return ROLES.includes(role) ? role : "Consultant";
}

export async function POST(req: NextRequest) {
  const { userId, answers } = await req.json();

  const normalizedAnswers = {
    ...answers,
    role: answers.role ? normalizeRole(answers.role) : undefined,
  };

  const client = await clientPromise;
  const db = client.db("survey");
  await db.collection("survey_answers").insertOne({
    userId,
    answers: normalizedAnswers,
    submittedAt: new Date(),
  });
  return NextResponse.json({ ok: true });
}
