import { Table } from "antd";
import { useSelector } from "react-redux";

const columns = [
   {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
   },
   {
      title: "Price, $",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
   },
   {
      title: "Amount",
      dataIndex: "amount",
   },
];
const onChange = (pagination, filters, sorter, extra) => {
   console.log("params", pagination, filters, sorter, extra);
};
const AssetsTable = () => {
   const assets = useSelector(state => state.crypto.assets);

   const data = assets.map(asset => ({
      key: asset.id,
      name: asset.id,
      price: asset.price,
      amount: asset.amount
   }))

   return (
      <Table
         columns={columns}
         dataSource={data}
         onChange={onChange}
         pagination={false}
      />
   );
};

export default AssetsTable;
