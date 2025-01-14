import type { User } from "@/types/user";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";

import { type Ref } from "vue";

const fetcher = async (page: Ref<number>) => {
  const params = new URLSearchParams();
  params.append("page", page.value.toString());
  params.append("results", "20");
  params.append("seed", "kira");
  return fetch(`https://randomuser.me/api/?${params}`).then((response) =>
    response.json(),
  );
};

interface UserQuery {
  results: User[];
}

interface Props {
  page: Ref<number>;
  enabled: Ref<boolean>;
}

export function useUserQuery(props: Props) {
  return useQuery<UserQuery>({
    queryKey: ["users", props.page],
    queryFn: () => fetcher(props.page),
    placeholderData: keepPreviousData,
    retry: 5,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
}
