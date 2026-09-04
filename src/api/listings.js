import { get } from "../api/apiclient";
import { post } from "../api/apiclient";
import { put } from "../api/apiclient";
import { del } from "../api/apiclient";

export async function getListings() {
  const { data } = await get("/auction/listings?sort=created&sordOrder=desc");
  return data;
}

export async function getSingleListing(id) {
  const { data } = await get(`/auction/listings/${id}?_bids=true_seller=true`);
  return data;
}

export async function postNewListing(requestBody) {
  const { data } = await post(`auction/listings`, requestBody);
  return data;
}

export async function editListing() {
  const { data } = await put(`/auction/listings/${id}`);
  return data;
}

export async function deleteListing(id) {
  await del(`/auction/listings/${id}`);
}
