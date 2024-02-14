import {
   Flex,
   Form,
   Select,
   Space,
   Typography,
   Button,
   Divider,
   InputNumber,
   DatePicker,
   Result,
} from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoinInfo from "./CoinInfo";
import { addAssets } from "../store/reducers/cryptoSlice";

const AddAsset = ({onClose}) => {
   const coins = useSelector((state) => state.crypto.crypto);
   const [coin, setCoin] = useState(null);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const assetRef = useRef()
   const [form] = Form.useForm();

   const dispatch = useDispatch()

   const validateMessage = {
      required: "${label} is required",
      type: {
         number: "${label} in not valid number",
      },
      number: {
         range: "${label} must be between ${min} and ${max}",
      },
   };

   if (!coin) {
      return (
         <Select
            style={{ width: "100%" }}
            placeholder="Select a coin"
            optionLabelProp="label"
            onSelect={(value) => setCoin(coins.find((c) => c.id === value))}
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
      );
   }

   if (isSubmitted) {
      return (
         <Result
            status="success"
            title="New Asset Added"
            subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
            extra={[
               <Button type="primary" key="console" onClick={onClose}>
                  Close
               </Button>,
            ]}
         />
      );
   }

   function onFinish(values) {
      const newAsset = {
         id: coin.id,
         amount: values.amount,
         price: values.price,
         date: values.date?.$d ?? new Date(),
      }
      assetRef.current = newAsset
      setIsSubmitted(true);
      dispatch(addAssets(newAsset))
   }

   function handleAmountChange(value) {
      const price = form.getFieldValue("price");
      form.setFieldsValue({
         total: +(value * price).toFixed(2),
      });
   }

   function handlePriceChange(value) {
      const amount = form.getFieldValue("amount");
      form.setFieldsValue({
         total: +(amount * value).toFixed(2),
      });
   }

   return (
      <>
         <CoinInfo coin={coin}/>
         <Divider />
         <Form
            form={form}
            name="basic"
            labelCol={{
               span: 6,
            }}
            wrapperCol={{
               span: 5,
            }}
            initialValues={{
               price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessage}
         >
            <Form.Item
               label="Amount"
               name="amount"
               rules={[
                  {
                     required: true,
                     type: "number",
                     min: 0,
                  },
               ]}
            >
               <InputNumber
                  placeholder="Enter the amount of coins"
                  onChange={handleAmountChange}
                  style={{ width: "200px" }}
               />
            </Form.Item>

            <Form.Item label="Price" name="price">
               <InputNumber
                  onChange={handlePriceChange}
                  style={{ width: "200px" }}
               />
            </Form.Item>

            <Form.Item
               label="Date & Time"
               name="date"
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <DatePicker style={{ width: "200px" }} showTime></DatePicker>
            </Form.Item>

            <Form.Item label="Total" name="total">
               <InputNumber style={{ width: "200px" }} disabled />
            </Form.Item>

            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Add Asset
               </Button>
            </Form.Item>
         </Form>
      </>
   );
};

export default AddAsset;
