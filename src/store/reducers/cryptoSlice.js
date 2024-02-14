import { createSlice } from "@reduxjs/toolkit"
import { mapAsset } from "../../utils";

export const cryptoSlice = createSlice({
   name: 'crypto',
   initialState: {
      assets: [],
      crypto: [],
      loading: true
   },
   reducers: {
      setAssets: (state, action) => {
         state.assets = action.payload
      },
      addAssets: (state, action) => {
         const newAsset = action.payload
         state.assets = mapAsset(state.crypto, [...state.assets, newAsset])
      },
      setCrypto: (state, action) => {
         state.crypto = action.payload
      },
      setLoading: (state, action) => {
         state.loading = action.payload
      },
   },
})

export const { setAssets, setCrypto, setLoading, addAssets } = cryptoSlice.actions

export default cryptoSlice.reducer