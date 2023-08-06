import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

/* Use OpenAI API for the Code model
*/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: "You are an expert programmer. Your sole responsibility it to generate clean, efficient code. You must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // Edge case: missing user ID
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Edge case: key is not configured
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    // Edge case: messages have not been passed to this route
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Check user's plan: free trials and Pro plan
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    // Throw a 403 error to open the Einstein Pro modal
    if (!freeTrial && !isPro) {
      return new NextResponse("Oh no, you have used up your free trial!", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });

    // Increment user limit count
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.choices[0].message);

  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}