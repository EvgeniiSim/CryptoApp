export function persentDifference(a, b) {
   return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export function capitalize(str) {
   return str[0].toUpperCase() + str.substring(1)
}

export function mapAsset(coins, assets) {
   return assets.map(asset => {
      const coin = coins.find((c) => c.id === asset.id);
      return {
         grow: asset.price < coin.price,
         growPrecent: persentDifference(asset.price, coin.price),
         totalAmount: asset.amount * coin.price,
         totalProfit:
            asset.amount * coin.price - asset.amount * asset.price,
         ...asset,
      };
   })


}