import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getRewardsById = createAsyncThunk("achieveApp/reward/getRewards", async (id, {dispatch, getState}) => {
    try{
        const response = await axios.post(`/back/reward/list?id=${id}`);
        const res = await response.data.data.response;
        return res;
    } catch (err) {
        console.log(err);
    }
})


export const updateRewards = createAsyncThunk("achieveApp/reward/updateRewards", async (event, {dispatch, getState}) => {
    //const {data, userId} = event;
    try{
       const response = await axios.post('/back/reward/update', event);
       const res = await response.data.data.response;
       if (res.data === 'success') {
           return event;
       }
       else {
           // TODO 更新错误提示prompt
       }
    } catch (err) {
        console.log(err);
    }
})



export const addRewards = createAsyncThunk("achieveApp/reward/addRewards", async (event, {dispatch, getState}) => {
    const {data, userId} = event;
    try{
        const qo = {
            ...data,
            createdBy: userId
        };
        const response = await axios.post('/back/reward/created', qo);
        const res = await response.data.data.response;
        if (res.data === 'error') {
            // TODO 错误提示
        }
        else {
            return res.data;
        }
    }catch (err){
        console.log(err);
    }
})


export const removeRewards = createAsyncThunk('achieveApp/reward/removeRewards', async (id, {dispatch, getState}) => {
    try{
        const response = await axios.post(`/back/reward/delete?id=${id}`);
        const res = await response.data.data.response;
        if(res.data === 'error'){
            // TODO 错误提示
        }
        else {
            return id;
        }
    }catch (err){
        console.log(err);
    }
})




const initialState = {
    rewards: [],
    rewardDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null,
    }
}

const rewardSlice = createSlice({
    name: 'achieveApp/reward',
    initialState: initialState,
    reducers: {
        openEditRewardDialog:{
            prepare: (clickInfo) => {
                const payload = {
                    type: 'edit',
                    props: {
                        open:true
                    },
                    data: clickInfo
                };
                return {payload};
            },
            reducer: (state, action) => {
                state.rewardDialog = action.payload;
            }
        },
        closeEditRewardDialog: (state, action) => {
            state.rewardDialog = {
                type: 'edit',
                props: {
                    open: false
                },
                data: null,
            };
        },
        openNewRewardDialog: {
            prepare: () => {
                const payload = {
                    type: 'new',
                    props: {
                        open: true,
                    },
                    data: {}
                };
                return {payload};
            },
            reducer: (state, action) => {
                state.rewardDialog = action.payload;
            }
        },
        closeNewRewardDialog: (state, action) => {
            state.rewardDialog = {
                type: 'new',
                props: {
                    open: false,
                },
                data: null,
            }
        },
    },
    extraReducers: {
        [getRewardsById.fulfilled]: (state, action) => {
            state.rewards = action.payload.data;
        },
        [updateRewards.fulfilled]: (state, action) => {
            for (let i = 0; i< state.rewards.length;++i){
                if (state.rewards[i].id === action.payload.id)
                    state.rewards[i] = action.payload;
            }
        },
        [addRewards.fulfilled]: (state, action) => {
            const temp = state.rewards;
            temp.push(action.payload);
            state.rewards = temp.sort((a,b) => {return a.score - b.score;});
        },
        [removeRewards.fulfilled]: (state, action) => {
            state.rewards = state.rewards.filter(item => item.id !== action.payload);
        }
    }
});

export const selectRewards = ({achieveApp}) => achieveApp.reward.rewards;
export const selectRewardDialog = ({achieveApp}) => achieveApp.reward.rewardDialog;

export const {
    closeEditRewardDialog,
    closeNewRewardDialog,
    openEditRewardDialog,
    openNewRewardDialog,
} = rewardSlice.actions;

export default rewardSlice.reducer;
