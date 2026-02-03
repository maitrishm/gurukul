export default async (request, context) => {
  const geo = context.geo

  if (
    geo?.country === "IN" &&
    geo?.region === "MH"
  ) {
    return new Response(
      "Access is restricted in this area.",
      { status: 403 }
    )
  }

  return context.next()
}
