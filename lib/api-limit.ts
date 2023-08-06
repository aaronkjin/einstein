import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

/* Increment user limit count per use
*/
export const increaseApiLimit = async () => {
  const { userId } = auth();

  // Edge case: no user ID
  if (!userId) {
    return;
  }

  // Check if limit for each unique user exists
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  });

  // Increase the count by 1 each time they use a model
  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId: userId
      },
      data: { 
        count: userApiLimit.count + 1
      },
    })
  } else {
    // For new users: user does not exist in database yet
    await prismadb.userApiLimit.create({
      data: {
        userId: userId, 
        count: 1
      }
    });
  }
};

/* Check if user is at their limit count
*/
export const checkApiLimit = async () => {
  const { userId } = auth();

  // Edge case: no user ID
  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  });

  // User is still under their limit count, can proceed with more free tier usage
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;

  // User has exceed their limit count, block them from using more models
  } else {
    return false;
  }
};

/* Get the user limit count to show it
*/
export const getApiLimitCount = async () => {
  const { userId } = auth();

  // Edge case: no user ID means new user
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  });

  // Edge case: Not a new user, but has not generated a model yet
  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
}