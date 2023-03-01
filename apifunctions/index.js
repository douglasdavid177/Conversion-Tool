export async function ConvertBetweenCurrencies(from, to, startAmount) {
  //Get current rates
  const ratesObj = await getListOfRatesObject();
  let rate1 = ratesObj[from];
  let rate2 = ratesObj[to];
  const factor = rate2 / rate1;
  const result = startAmount * factor;
  return result;
}

export async function getListOfRatesObject() {
  // Get current rates
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89260a76efmsha2a6c5ea934b8edp15799bjsnbc7c1cfc42a9",
      "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
    },
  };

  const resp = await fetch(
    "https://currencyscoop.p.rapidapi.com/latest",
    options
  );

  if (!resp.ok) {
    throw new Error("something happened.... status: " + resp.status);
  }
  const j = await resp.json();
  const rates = j.response.rates;
  console.log(rates);
  return rates;
}

export async function getListOfCurrenciesObject() {
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
    throw new Error("something happened.... status: " + resp.status);
  }
  const j = await resp.json();
  //console.log(j);
  return j.response.fiats;
}
