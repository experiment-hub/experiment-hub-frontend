import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params: { experimentId } }: { params: { experimentId: string } }
) {
  const body = await request.json();
  const headers = new Headers(request.headers);
  const res = await fetch(`${API_URL}/experiments/${experimentId}/views`, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  const data = await res.json();
  return NextResponse.json(data);
}
