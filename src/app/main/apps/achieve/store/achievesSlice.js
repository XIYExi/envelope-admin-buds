import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getAchievesById = createAsyncThunk('achieveApp/achieves/getAchieves', async (id, {dispatch, getState}) => {
    try{
        const response = await axios.post(`/back/achieve/listById?id=${id}`);
        const res = await response.data.data.response; // {data: Array}
        return res;
    }catch (err) {
        console.log(err);
    }
})


export const addAchieve = createAsyncThunk('achieveApp/achieves/addAchieve', async (event, {dispatch}) => {
    const {data, userId} = event;
    try{
        const qo = {
            ...data,
            deathTime: `${data.deathTime.getYear()}-${data.deathTime.getMonth()+1}-${data.deathTime.getDay()} ${data.deathTime.getHours()}:${data.deathTime.getMinutes()}:${data.deathTime.getSeconds()}`,
            sysUserId: userId
        };

        //console.log('qo',qo)
        const response = await axios.post('/back/achieve/created', qo);
        const res = await response.data.data.response; // {data: Array}
        if (res.data === 'error') {
            // TODO 添加错误提示
        }
        else{
            return res.data;
        }
    } catch (err) {
        console.log(err);
    }
})


export const deleteAchieve = createAsyncThunk('achieveApp/achieves/deleteAchieve', async (id, {dispatch}) => {
    // console.log(id);
    try{
        const response = await axios.post(`/back/achieve/delete?id=${id}`);
        const res = await response.data.data.response;
        if (res.data === 'error') {
            // TODO 错误提示信息
        }
        else{
            return id;
        }
    } catch (err) {
        console.log(err);
    }
})


export const updateAchieve = createAsyncThunk('achieveApp/achieves/updateAchieve', async (event, {dispatch}) => {
    // console.log(event)
    try {
        const response = await axios.post(`/back/achieve/update`,event);
        const res = await response.data.data.response;
        // console.log(res)
        if (res.data === 'success') {
            return event;
        }
        else {
            // TODO 更新失败的提示
        }
    } catch (err) {
        console.log(err)
    }
})


const initialState = {
    achieves: [],
    selectedId: '',
    achieveDialog: {
        type: 'new',
        props: {
            open: false,
        },
        data: null,
    }
}


const achievesSlice = createSlice({
    name: 'achieveApp/achieves',
    initialState: initialState,
    reducers: {
        openEditAchieveDialog: {
            prepare: (clickInfo) => {
                const payload = {
                    type: 'edit',
                    props: {
                        open:true
                    },
                    data: clickInfo
                }
                return {payload};
            },
            reducer: (state, action) => {
                state.achieveDialog = action.payload;
            }
        },
        closeEditAchieveDialog: (state, action) => {
            state.achieveDialog = {
                type: 'edit',
                props: {
                    open: false,
                },
                data: null
            };
        },
        openNewAchieveDialog: {
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
                state.achieveDialog = action.payload;
            }
        },
        closeNewAchieveDialog: (state, action) => {
            state.achieveDialog = {
                type: 'new',
                props: {
                    open: false,
                },
                data: null,
            };
        },
    },
    extraReducers: {
        [getAchievesById.fulfilled]: (state, action) => {
            // console.log(' ?? ',action.payload);
            // achievesAdapter.setAll(state, action.payload.data);
            // 讲查询到的成就列表保存
            state.achieves = action.payload.data;
        },
        [updateAchieve.fulfilled]: (state, action) => {
            // console.log('!', state.achieves, action.payload)
            for(let i=0;i<state.achieves.length;++i){
                if (state.achieves[i].id === action.payload.id){
                    state.achieves[i] = action.payload;
                }
            }
        },
        [addAchieve.fulfilled]: (state, action) => {
            // console.log('addAchieve', action.payload)
            state.achieves.push(action.payload);
        },
        [deleteAchieve.fulfilled]: (state, action) => {
            state.achieves = state.achieves.filter(item => item.id !== action.payload);
        }
    }
})

export const selectAchieves = ({achieveApp}) => achieveApp.achieves.achieves;
export const selectAchieveDialog = ({achieveApp}) => achieveApp.achieves.achieveDialog;


export const {
    closeEditAchieveDialog,
    openEditAchieveDialog,
    openNewAchieveDialog,
    closeNewAchieveDialog,
} = achievesSlice.actions;

export default achievesSlice.reducer;
