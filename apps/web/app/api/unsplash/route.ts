import UnsplashApi from "lib/services/unsplash";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, res) {
  const req = request.nextUrl.searchParams;
  const page = Number(req.get("page")) || 1;
  const query = req.get("query") || "";
  const perPage = Number(req.get("perPage")) || 12;
  const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

  if (!UNSPLASH_KEY) {
    console.error(
      "UNSPLASH is not configured. Please add a NEXT_PUBLIC_UNSPLASH_KEY in your .env file."
    );
    return new NextResponse(
      JSON.stringify({ error: "UNSPLASH is not configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const unsplashApi = new UnsplashApi(UNSPLASH_KEY);

  try {
    const [photos, totalPages] = await unsplashApi.searchPhotos(
      query,
      page,
      perPage
    );
    return new NextResponse(JSON.stringify({ photos, totalPages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const error_response = {
      status: "error",
      message: error.message,
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
