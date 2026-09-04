import { get } from "../api/apiclient";
import { post } from "../api/apiclient";

export async function getListings() {
  const { data } = await get("/auction/listings?sort=created&sordOrder=desc");
  return data;
}

export async function getSingleListing(id) {
  const { data } = await get(`/auction/listings/${id}?_bids=true`);
  return data;
}

export async function postNewListing(requestBody) {
  const { data } = await post(`auction/listings`, requestBody);
  return data;
}
