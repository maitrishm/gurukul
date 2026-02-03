export default async (request, context) => {
  const country = context.geo?.country || "UNKNOWN"

  const blockedCountries = ["IN" ] // ISO country codes

  if (blockedCountries.includes(country)) {
    return new Response("Access denied in your region", {
      status: 403,
    })
  }

  return context.next()
}
