import { useInfiniteQuery } from '@tanstack/react-query';
import { client } from '../client/client';
import { ActivitiesScheme } from '../scheme/activities';

export const activityKeys = {
  all: ['activities'],
  getById: (id: string) => ['activity', id],
  getByUser: (id: string) => ['activities', 'user', id],
};

const getActivities = async (signal?: AbortSignal, page = 0) =>
  client(`/api/activities?page=${page}`, { signal, zodSchema: ActivitiesScheme });

export const useInfiniteActivities = () =>
  useInfiniteQuery({
    queryKey: activityKeys.all,
    queryFn: ({ signal, pageParam }) => getActivities(signal, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
