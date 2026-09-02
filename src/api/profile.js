import { get } from "./apiclient";

export async function getProfile(name) {
  const { data } = await get(`/auction/profiles/${name}`);
  return data;
}
