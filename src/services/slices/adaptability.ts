import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TStateAdaptability = {
  coordBottomHeader: number;
}

const adaptabilityInitialState: TStateAdaptability = {
  coordBottomHeader: 88,
}

const adaptabilitySlice = createSlice({
  name: 'adaptability',
  initialState: adaptabilityInitialState,
  reducers: {
    setCoordBottomHeaderStore: (state, action: PayloadAction<number>) => {
      state.coordBottomHeader = action.payload;
    }
  },
});

export const {
  setCoordBottomHeaderStore,
} = adaptabilitySlice.actions;
export default adaptabilitySlice.reducer;
