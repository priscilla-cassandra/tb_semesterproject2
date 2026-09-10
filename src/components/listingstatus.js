function isAuctionEnded(endsAt) {
  return new Date(endsAt) < new Date();
}

export function renderEndedBanner(endsAt) {
  return isAuctionEnded(endsAt)
    ? `<span class="absolute top-8 -left-20 lg:top-10 lg:-left-12 lg:text-lg lg:font-semibold md:top-8 md:-left-16 w-60 rotate-[-45deg] bg-indigo-900 text-white text-center text-sm py-1 shadow-md">Avsluttet</span>`
    : "";
}
