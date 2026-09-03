export function renderCreditsDesktop(credits) {
  return `
        <section aria-labelledby="credits-heading" class="flex items-center gap-2">
            <i class="fa-solid fa-coins fa-lg text-primary-blue"></i>
            <p class="text-lg">${credits}</p>
        </section>
    `;
}

export function renderCreditsMobile(credits) {
  return `
        <section aria-labelledby="credits-heading" class=" text-md rounded-lg text-center flex items-center gap-2 bg-linear-to-r from-primary-blue via-gradient-blue-middle to-gradient-blue py-2 px-4">
            <i class="fa-solid fa-coins text-white"></i>
            <p class="text-white">${credits}</p>
        </section>
    `;
}
