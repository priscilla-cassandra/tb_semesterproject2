import { get } from "../api/apiclient";

export async function getListings() {
  const { data } = await get("/auction/listings?sort=created&sordOrder=desc");
  return data;
}

export async function getSingleListing() {
  const { data } = await get(`/auction/listings/${id}`);
  return data;
}
