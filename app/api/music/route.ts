import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

/* Use Replicate API for the Music model
*/
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    // Edge case: missing user ID
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Edge case: prompt has not been passed to this route
    if (!prompt) {
      return new NextResponse("Prompt arise required", { status: 400 });
    }

    // Check user's plan: free trials and Pro plan
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    // Throw a 403 error to open the Einstein Pro modal
    if (!freeTrial && !isPro) {
      return new NextResponse("Oh no, you have used up your free trial!", { status: 403 });
    }

    /* Audio generation model from Replicate: Riffusion - 
    * https://replicate.com/riffusion/riffusion/api
    */
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    // Increment user limit count
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);

  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}