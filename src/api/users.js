
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
  };

  if (q.trim()) {
    endpoint = "/users/search";
    params = {
      ...params,
      q: q.trim(),
    };
  } else if (gender) {
    endpoint = "/users/filter";
    params = {
      ...params,
      key: "gender",
      value: gender,
    };
  }

  if (!q.trim() && !gender) {
    params.sortBy = sortBy;
    params.order = order;
  }

  const response = await api.get(endpoint, { params });

  return response.data;
}
