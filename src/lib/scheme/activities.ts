import { z } from 'zod';

const TlActivityScheme = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  user: z.object({
    id: z.string(),
    displayName: z.string().nullable(),
    username: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  liked: z.boolean(),
  _count: z.object({
    likes: z.number(),
    replies: z.number(),
  }),
});

export const ActivitiesScheme = z.object({
  activities: z.array(TlActivityScheme),
  nextPage: z.number().optional().nullable(),
});

export type TlActivitiesPage = z.infer<typeof ActivitiesScheme>;
export type TlActivities = z.infer<typeof ActivitiesScheme>['activities'];
export type TlActivity = TlActivities[number];

// Extends TlTweetScheme to add `replies` property
export const ActivityScheme = z.object({
    activity: TlActivityScheme.extend({
        replies: z.array(TlActivityScheme).optional(),
    }),
});

export type TweetView = z.infer<typeof ActivityScheme>['activity'];
