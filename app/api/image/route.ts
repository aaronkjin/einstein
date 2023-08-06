import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

/* Use OpenAI API for the Image model
*/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // Edge case: missing user ID
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Edge case: key is not configured
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    // Edge case: prompt has not been passed to this route
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Edge case: number of images has not been passed to this route
    if (!amount) {
      return new NextResponse("Number of images is required", { status: 400 });
    }

    // Edge case: resolution has not been passed to this route
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    // Check user's plan: free trials and Pro plan
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    // Throw a 403 error to open the Einstein Pro modal
    if (!freeTrial && !isPro) {
      return new NextResponse("Oh no, you have used up your free trial!", { status: 403 });
    }

    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    // Increment user limit count
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);

  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}