# Einstein

An all-in-one content generation website powered by OpenAI and ReplicateAI

<img width="400" alt="Screen Shot 2023-08-06 at 3 29 06 AM" src="https://github.com/aaronkjin/einstein/assets/58490258/ed47523f-9139-400e-af38-e71d57733e0d">

<img width="400" alt="Screen Shot 2023-08-06 at 3 27 58 AM" src="https://github.com/aaronkjin/einstein/assets/58490258/be8f66bc-3287-49e2-ba14-0e71408c7a3a">

## Link to website

Come see it for yourself!

[Einstein Website](https://ai-einstein.vercel.app/)

## Background and Inspiration

In the dynamic world of technology, we stand witness to a groundbreaking transformation fueled by generative AI. As a student at Stanford, I found myself intrigued by the buzz surrounding ChatGPT and its potential to revolutionize education, careers, and even daily tasks. Eager to stay ahead of the inevitable AI wave, I embarked on a journey to explore its capabilities.

During the summer of 2023, I had the privilege of interning at Wagyu.ai, a visionary generative AI start-up. There, I witnessed the magic of chatbots—AI experts with unique personalities and skills, engaging users in truly personable conversations. This experience left me spellbound.

But the allure of generative AI didn't stop at chatbots. I delved into various AI projects, uncovering the incredible power of OpenAI and other LLMs in image generation, video generation, music generation, and code generation. Each discovery fueled my ambition to combine these exceptional AI tools into a single, unified platform.

And so, with unbridled enthusiasm, I present to you Einstein: an all-in-one, AI-powered content generation website. Imagine a canvas where AI converses effortlessly, images come to life from the depths of imagination, and music and videos manifest with artistic brilliance. Einstein is not just a tool; it's a gateway to the future of human-machine creativity. Whether you're a seasoned AI enthusiast or simply curious about the endless possibilities of generative AI, Einstein promises to inspire and empower you. Step into a world where creativity knows no bounds, where art and technology unite in seamless harmony.

&mdash; Written by Einstein (2023)


## Details and Features

- Technologies used: TypeScript, React, Next, Tailwind, Stripe, Crisp, Prisma, and MySQL.
- Initial landing page with Clerk credential authentication.
- Email and Google authentication integration.
- Chatbot conversation (OpenAI ChatGPT).
- Image generation (OpenAI DALL-E).
- Video generation (ReplicateAI Zeroscope V2).
- Music generation (ReplicateAI Riffusion).
- Code generation (OpenAI ChatGPT).
- Page loading state.
- Free tier with API limiting.
- Integration of recurring payments and cancellation of subscriptions using Stripe.
- Storage of user subscription and free tier count information with Prisma.
- Customer support and chatting with Crisp.
- A sleek, seamless UI with animations and transition effects using Tailwind.
- Client form validation and handling using react-hook-form.
- Server error handling with react-toast.
- APP/API exposure with writing POSt, GET, and DELETE routes in route handlers.
- Direct access to the database to fetch data in server-side React components (without the use of APIs).
- Handling of relations between Server and Child components in a real-time environment.
- Full responsiveness for all devices.

### Instructions

1. Click the link above.
2. Sign up or log in by clicking "Start Generating for Free" or "Get Started."
3. Upon log-in, tap into any of the five tools: Conversation, Image Generation, Video Generation, Music Generation, and Code Generation.
    1. With each prompt + response, notice you are using up 1 of your 10 free generations.
    2. This is because all users are initially on the Free tier.
4. Fear not, the Pro tier is actually free!
    1. The Pro subscription is there for my development practice with Stripe and as a means to mimic a SaaS business.
5. To subscribe to Einstein Pro...
    1. Either click on "Upgrade" on the lower left _or_ head to Settings to manage your subscription plan.
    2. Alternatively, you can use all 10 free generations, in which you will be prompted to subscribe to Einstein Pro.
6. On the Subscriptions page, once again, you don't need to spend any money.
    1. Feel free to enter fake information for the subscription.
    2. Don't worry, all data, even fake data, is encrypted and secured through Prisma.
    3. Example:
       1. Credit Card #: 4242 4242 4242 4242
       2. Credit Card Month/Year: 04/24
       3. CVV: 424
       4. Address: 4242 Patrice Rd, Newport Beach, CA 92663
       5. Phone #: +1 (111) 111-1111
7. Now that you're subscribed to Einstein Pro, you have unlimited number of generations of the AI tools on the site. Congratulations!

By: Aaron Jin

Main GitHub Profile link: https://github.com/aaronkjin

