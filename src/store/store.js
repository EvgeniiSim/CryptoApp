import { configureStore } from '@reduxjs/toolkit';
import cryptoSlice from './reducers/cryptoSlice';

export default configureStore({
   reducer: {
      crypto: cryptoSlice,
   },
});