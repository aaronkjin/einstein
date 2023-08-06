import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

/* Use Replicate API for the Video model
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

    /* Video generation model from Replicate: Zeroscope V2 -
    * https://replicate.com/anotherjesse/zeroscope-v2-xl/api
    */
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt
        }
      }
    );

    // Increment user limit count
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);

  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}