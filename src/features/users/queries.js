
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/users";

export function useUsers(params) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    placeholderData: (previousData) => previousData,
  });
}
