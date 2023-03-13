export async function ConvertBetweenCurrencies(
  from,
  to,
  startAmount,
  ratesObj = null
) {
  //Get current rates
  //console.log("starting");
  if (ratesObj == null) {
    ratesObj = await getCurrencyRatesObject();
  }
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
      // "X-RapidAPI-Key": "89260a76efmsha2a6c5ea934b8edp15799bjsnbc7c1cfc42a9",
      // "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
      api_key: "39b30d55711e20e1fddfe14d8d8371de",
    },
  };

  const resp = await fetch(
    // "https://currencyscoop.p.rapidapi.com/latest",
    "https://api.currencybeacon.com/v1/latest?api_key=39b30d55711e20e1fddfe14d8d8371de" //,
    // options
  );

  if (!resp.ok) {
    throw new Error("something happened.... status: " + resp.status);
  }
  const j = await resp.json();
  const rates = j.response.rates;
  //console.log(rates);

  console.log("fetched from api...");
  return rates;
}

export async function getCurrenciesObject() {
  const options = {
    method: "GET",
    headers: {
      // "X-RapidAPI-Key": "89260a76efmsha2a6c5ea934b8edp15799bjsnbc7c1cfc42a9",
      // "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
      api_key: "39b30d55711e20e1fddfe14d8d8371de",
    },
  };

  const resp = await fetch(
    // "https://currencyscoop.p.rapidapi.com/currencies",
    "https://api.currencybeacon.com/v1/currencies?api_key=39b30d55711e20e1fddfe14d8d8371de" //,
    // options
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

  console.log("fetched from api...");
  return fiats;
}
