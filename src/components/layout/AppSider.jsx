import Sider from "antd/es/layout/Sider";
import { Card, List, Statistic, Tag, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";

import { useSelector } from "react-redux";

const siderStyle = {
   textAlign: "center",
   lineHeight: "1.2",
   color: "#fff",
   padding: "1rem",
};

const AppSider = () => {
   const assets = useSelector((state) => state.crypto.assets);

   return (
      <>
         <Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
               <Card
                  key={asset.id}
                  style={{
                     marginBottom: "1rem",
                  }}
               >
                  <Statistic
                     title={capitalize(asset.id)}
                     value={asset.totalAmount}
                     precision={2}
                     valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                     prefix={
                        asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                     }
                     suffix="$"
                  />
                  <List
                     size="large"
                     bordered
                     dataSource={[
                        {
                           title: "Total Profit",
                           value: asset.totalProfit,
                           withTag: true,
                        },
                        {
                           title: "Asset Amount",
                           value: asset.amount,
                           isPlain: true,
                        },
                     ]}
                     renderItem={(item) => (
                        <List.Item>
                           <span>{item.title}</span>
                           <span>
                              {item.withTag && (
                                 <Tag color={asset.grow ? "green" : "red"}>
                                    {asset.growPrecent}%
                                 </Tag>
                              )}
                              {item.isPlain && item.value}
                              {!item.isPlain && (
                                 <Typography.Text
                                    type={asset.grow ? "success" : "danger"}
                                 >
                                    {item.value.toFixed(2)}$
                                 </Typography.Text>
                              )}
                           </span>
                        </List.Item>
                     )}
                  />
               </Card>
            ))}
         </Sider>
      </>
   );
};

export default AppSider;
