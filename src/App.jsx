import { Layout, Spin } from "antd";
import AppHeader from "./components/layout/AppHeader";
import AppSider from "./components/layout/AppSider";
import AppContent from "./components/layout/AppContent";
import { mapAsset, persentDifference } from "./utils";

import { useSelector, useDispatch } from "react-redux";
import {
   setAssets,
   setLoading,
   setCrypto,
} from "./store/reducers/cryptoSlice.js";

import { useEffect } from "react";

import { fetchAssets, fetchCoins } from "./api";

export default function App() {
   const loading = useSelector((state) => state.crypto.loading);

   const dispatch = useDispatch();

   useEffect(() => {
      (async function () {
         dispatch(setLoading(true));

         try {
            const { result: coins } = await fetchCoins();
            let dataAssets = await fetchAssets();

            dataAssets = mapAsset(coins, dataAssets);

            dispatch(setCrypto(coins))

            dispatch(setAssets(dataAssets));
         } catch (err) {
            console.log(err);
         }
         dispatch(setLoading(false));
      })();
   }, []);

   if (loading) {
      return <Spin fullscreen />;
   }
   return (
      <>
         <Layout>
            <AppHeader></AppHeader>
            <Layout>
               <AppSider></AppSider>
               <AppContent></AppContent>
            </Layout>
         </Layout>
      </>
   );
}
