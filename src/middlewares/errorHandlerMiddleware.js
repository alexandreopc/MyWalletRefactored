export default async function handleError(error, req, res, next) {
  console.error(error);
  if (error.type === "conflict") {
    return res.sendStatus(404).status("conflict");
  }

  if (error.type === "unauthorized") {
    return res.sendStatus(404).status("unauthorized");
  }

  return res.sendStatus(500).status("Internal Server Error");
}
