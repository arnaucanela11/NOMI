'use client'

import { configureStore } from '@reduxjs/toolkit';
import videoFile from './Slice';
import { useSelector } from 'react-redux';
const store = configureStore({
 reducer: {
 videoFile,
 // Add more reducers as needed
 },
 });
export default store;

export const VideoUseSelector = useSelector;