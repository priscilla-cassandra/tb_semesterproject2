import { get } from "../api/apiclient";
import { post } from "../api/apiclient";
import { put } from "../api/apiclient";
import { del } from "../api/apiclient";

export async function getListings() {
  const { data } = await get("/auction/listings?sort=created&sordOrder=desc");
  return data;
}

export async function getSingleListing(id) {
  const { data } = await get(`/auction/listings/${id}?_bids=true&_seller=true`);
  return data;
}

export async function postNewListing(requestBody) {
  const { data } = await post(`/auction/listings`, requestBody);
  return data;
}

export async function updateListing(id, requestBody) {
  const { data } = await put(`/auction/listings/${id}`, requestBody);
  return data;
}

export async function deleteListing(id) {
  await del(`/auction/listings/${id}`);
}
