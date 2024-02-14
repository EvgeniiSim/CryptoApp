
export const cryptoAssets = [
  {
    id: 'bitcoin',
    amount: 0.02,
    price: 26244,
    date: new Date(),
  },
  {
    id: 'ethereum',
    amount: 5,
    price: 2400,
    date: new Date(),
  },
]

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'DsRNsOYg6ddYSMRiGbjDaydq24ye/mQfO7gc05g3M1o='
  }
};

export async function fetchCoins() {
  try {
    const data = await fetch('https://openapiv1.coinstats.app/coins', options);
    const response = await data.json();
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function fetchAssets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 500);
  })
}
