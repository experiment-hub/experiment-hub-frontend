import { views } from "@/mock-data";
import { NextResponse } from "next/server";
import { z } from "zod";

const newViewSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
});

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  return NextResponse.json(views);
}

export async function POST(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { name, slug, description } = newViewSchema.parse(request.body);
  // TODO create a new view

  return NextResponse.json({});
}
