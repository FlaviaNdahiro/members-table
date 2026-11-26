
import { api } from "./client";

const FIELDS =
  "firstName,lastName,email,phone,age,gender,company,address";

export async function fetchUsers({
  page = 1,
  pageSize = 10,
  sortBy = "firstName",
  order = "asc",
  q = "",
  gender = "",
}) {
  const skip = (page - 1) * pageSize;

  let endpoint = "/users";

  let params = {
    limit: pageSize,
    skip,
    select: FIELDS,
    sortBy,
    order,
  };

  if (q.trim()) {
    endpoint = "/users/search";

    params.q = q.trim();
  } else if (gender) {
    endpoint = "/users/filter";

    params.key = "gender";
    params.value = gender;
  }

  const response = await api.get(endpoint, { params });

  return response.data;
}
