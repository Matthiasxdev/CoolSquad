import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";


const selectActivityQuery = (userId?: string) =>
  ({
    id: true,
    image: true,
    title: true,
    description: true,
    price: true,
    unit: true,
    rating: true,
    location: true,
    city: true,
    createdAt: true,
    owner: true, 
    likes: true

    // id: true,
    // content: true,
    // createdAt: true,
    // user: {
    //   select: {
    //     id: true,
    //     displayName: true,
    //     username: true,
    //     avatarUrl: true,
    //   },
    // },
    // likes: {
    //   where: {
    //     userId,
    //   },
    //   select: {
    //     id: true,
    //     userId: true,
    //   },
    // },
    // _count: {
    //   select: {
    //     likes: true,
    //     replies: true,
    //   },
    // },
  } satisfies Prisma.ActivitySelect);




export const getActivities = async (userId?: string, page = 0) => {
    const activities = await prisma.activity.findMany({
      skip: page * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    //   where: {
    //     activityId: null,
    //   },
      select: selectActivityQuery(),
    });
  
    const fixedActivity = activities.map((activity) => ({
      ...activity,
      liked: activity.likes.some((l) => l.id === userId),
      createdAt: activity.createdAt.toISOString(),
    }));
  
    return fixedActivity;
  };