# Einstein

An all-in-one content generation website powered by OpenAI and ReplicateAI. Allows users to generate conversations, images, videos, music, and code, all through a single interface.

<img width="400" alt="Screen Shot 2023-08-06 at 3 29 06 AM" src="https://github.com/aaronkjin/einstein/assets/58490258/ed47523f-9139-400e-af38-e71d57733e0d">

<img width="400" alt="Screen Shot 2023-08-06 at 3 27 58 AM" src="https://github.com/aaronkjin/einstein/assets/58490258/be8f66bc-3287-49e2-ba14-0e71408c7a3a">

## Getting Started

1. Visit the [Einstein Website](https://ai-einstein.vercel.app/).
2. Sign up or log in to explore the generative tools.
3. Enjoy 10 free generations under the Free tier, or upgrade to the Pro tier for unlimited access.

## Pro Tier

- The Pro tier is available at no cost as part of my development exercise with Stripe.
- Users can simulate a subscription using dummy credit card details provided in the sign-up flow.
    - Example:
        - Credit Card #: 4242 4242 4242 4242
        - Credit Card Month/Year: 04/24
        - CVV: 424
        - Address: 4242 Patrice Rd, Newport Beach, CA 92663
        - Phone #: +1 (111) 111-1111

## Technologies Used

### Frontend

- TypeScript
- React
- Next.js
- Tailwind CSS

### Backend

- Node.js
- Prisma
- MySQL

### Authentication

- Clerk (for credential management with email + Google sign-in support)

### AI Tools

- OpenAI (for ChatGPT and DALL-E)
- ReplicateAI (for Zeroscope V2 and Riffusion)

### Payments

- Stripe (for handling subscriptions and payment processes)

### Customer Support

- Crisp (for real-time user interaction and support)

## Features

### Generative AI Tools

Utilizes ChatGPT for conversations, DALL-E for image generation, Zeroscope V2 and Riffusion from ReplicateAI for video and music generation.

### Subscription Management

Integrates Stripe for handling recurring payments and subscription cancellations.

### Data Management

Utilizes Prisma for database operations and securely stores user data/credentials.

### UI/UX

Features a responsive and animation-rich UI built with Tailwind CSS.

### API and Server Management

Includes comprehensive endpoint handling for RESTful services.

## Background and Inspiration

During the summer of 2023, I interned at Wagyu.ai, a generative AI start-up that provided a mobile experience for humanized AI personalities. Because of this experience, I was inspired by the potential of AI in various domains, thus beginning my project in building Einstein. Witnessing the capabilities of various AI tools sparked the idea to create a unified platform that blends technology with creativity.

## Developer

Aaron Jin  
[GitHub Profile](https://github.com/aaronkjin)
