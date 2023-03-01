export async function ConvertBetweenCurrencies(from, to, startAmount) {}

export async function getListOfCurrencyObjects() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89260a76efmsha2a6c5ea934b8edp15799bjsnbc7c1cfc42a9",
      "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
    },
  };

  const resp = await fetch(
    "https://currencyscoop.p.rapidapi.com/currencies",
    options
  );

  if (!resp.ok) {
    throw new Error("something happened.... status: " + response.status);
  }
  const j = await resp.json();
  console.log(j);
  return j.response.fiats;
}
