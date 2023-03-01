export async function ConvertBetweenCurrencies(from, to, startAmount) {
  //Get current rates
  //console.log("starting");
  const ratesObj = await getCurrencyRatesObject();
  let rate1 = ratesObj[from];
  let rate2 = ratesObj[to];
  const factor = rate2 / rate1;
  const result = startAmount * factor;

  //console.log(to);
  //console.log("finished");
  return result;
}

export async function getCurrencyRatesObject() {
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
  //console.log(rates);
  return rates;
}

export async function getCurrenciesObject() {
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
  const fiats = j.response.fiats;
  // const entries = Object.entries(fiats);
  // const newArr = entries.map((val, ind) => {
  //   return val[1];
  // });
  //console.log(fiats);

  return fiats;
}
