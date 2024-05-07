

import { createSlice } from "@reduxjs/toolkit";
const videoFile = createSlice({
  name: "videoFile",
  initialState: {
   file: null
  },
  reducers: {
    setVideoFile: (state, action) => {
      console.log(action.payload);
      return {
        file: action.payload,
      };
    },
  },
});
export const { setVideoFile } = videoFile.actions;
export default videoFile.reducer;
