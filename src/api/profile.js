import { get, put } from "./apiclient";

export async function getProfile(name) {
  const { data } = await get(`/auction/profiles/${name}`);
  return data;
}

export async function getBidsByProfile(name) {
  const { data } = await get(`/auction/profiles/${name}/bids?_listings=true`);
  return data;
}

export async function getListingsByProfile(name) {
  const { data } = await get(`/auction/profiles/${name}/listings?_bids=true`);
  return data;
}

export async function updateProfile(name, requestBody) {
  const { data } = await put(`/auction/profiles/${name}`, requestBody);
  return data;
}
