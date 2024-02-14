import { Content } from "antd/es/layout/layout";
import Typography from "antd/es/typography/Typography";
import { useSelector } from "react-redux";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
   textAlign: "center",
   minHeight: "calc(100vh - 60px)",
   lineHeight: "120px",
   color: "#fff",
   backgroundColor: "#001529",
   padding: "1rem",
};

const AppContent = () => {
   const assets = useSelector((state) => state.crypto.assets);
   const coins = useSelector((state) => state.crypto.crypto);

   const cryptoPriceMap = coins.reduce((acc, coin) => {
      acc[coin.id] = coin.price
      return acc
   }, {})

   return (
      <Content style={contentStyle}>
         <Typography.Title
            level={3}
            style={{
               textAlign: "left",
               color: "#fff",
            }}
         >
            Portfolio{" "}
            {assets.map((asset) => {
               return asset.amount * cryptoPriceMap[asset.id];
            }).reduce((acc, value) => acc += value, 0).toFixed(2)}$
         </Typography.Title>
         <PortfolioChart/>
         <AssetsTable/>
      </Content>
   );
};

export default AppContent;
