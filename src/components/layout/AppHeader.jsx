import { Button, Select, Space, Modal, Drawer } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import CoinInfoModal from "../CoinInfoModal";
import AddAsset from "../AddAsset";

const headerStyle = {
   width: "100%",
   textAlign: "center",
   color: "#fff",
   height: 64,
   paddingInline: 48,
   lineHeight: "64px",
   backgroundColor: "#4096ff",
   padding: "1rem",
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
};

const AppHeader = () => {
   const [isModal, setIsModal] = useState(false);
   const [isDrawer, setIsDrawer] = useState(false);
   const [coin, setCoin] = useState(null);

   const coins = useSelector((state) => state.crypto.crypto);

   function handleSelect(currentCoin) {
      setIsModal(true);
      setCoin(coins.find((c) => c.id === currentCoin));
   }

   return (
      <Header style={headerStyle}>
         <Select
            style={{
               width: 250,
            }}
            placeholder="Press to open"
            optionLabelProp="label"
            onSelect={handleSelect}
            options={coins.map((coin) => ({
               label: coin.name,
               value: coin.id,
               icon: coin.icon,
            }))}
            optionRender={(option) => (
               <Space>
                  <img
                     src={option.data.icon}
                     style={{
                        width: "20px",
                     }}
                     alt={option.data.label}
                  />
                  <span role="img" aria-label={option.data.label}></span>
                  {option.data.value}
               </Space>
            )}
         />
         <Button type="primary" onClick={() => setIsDrawer(true)}>
            Add asset
         </Button>

         <Modal
            title="Coin info"
            open={isModal}
            onOk={() => setIsModal(false)}
            onCancel={() => setIsModal(false)}
         >
            <CoinInfoModal coin={coin} />
         </Modal>

         <Drawer
            title="Add asset"
            destroyOnClose
            onClose={() => setIsDrawer(false)}
            open={isDrawer}
         >
            <AddAsset onClose={() => setIsDrawer(false)} />
         </Drawer>
      </Header>
   );
};

export default AppHeader;
