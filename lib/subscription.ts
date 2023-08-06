import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// One "grace day" period
const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  // Edge case: Assume they have no subscription if there is no user ID
  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  // Edge case: user is not subscribed to Einstein Pro
  if (!userSubscription) {
    return false;
  }

  // Check if user's subscription has not expired
  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  
  return !!isValid;
};