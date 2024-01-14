import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {
    addRewards,
    closeEditRewardDialog,
    closeNewRewardDialog,
    selectRewardDialog,
    updateRewards
} from "../store/rewardSlice";
import {Controller,useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCallback, useEffect} from "react";
import EnvelopeUtils from "../../../../../@envelope/utils";
import {Button, IconButton, Popover, TextField} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import _ from "../../../../../@lodash";
import RewardModel from "../models/RewardModel";


const defaultValues = RewardModel();

const schema = yup.object().shape({

})



function RewardForm(props) {

    const dispatch = useDispatch();
    const userId = '1';

    const rewardDialog = useSelector(selectRewardDialog);

    const {reset, formState, watch, control, getValues} = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const {isValid, dirtyFields, errors} = formState;

    const initDialog = useCallback(() => {
        if (rewardDialog.type === 'edit' && rewardDialog.data) {
            reset({...rewardDialog.data});
        }

        if (rewardDialog.type === 'new') {
            reset({
                ...defaultValues,
                ...rewardDialog.data,
                id: EnvelopeUtils.generateGUID(),
            });
        }
    }, [rewardDialog.data, rewardDialog.type, reset])


    useEffect(() => {
        if (rewardDialog.props.open) {
            initDialog();
        }
    }, [rewardDialog.props.open, initDialog])


    function closeComposeDialog() {
        return rewardDialog.type === 'edit'
            ? dispatch(closeEditRewardDialog())
            : dispatch(closeNewRewardDialog());
    }

    function handleRemove() {
        closeComposeDialog();
    }

    function onSubmit(ev) {
        ev.preventDefault();
        const data = getValues();
        if (rewardDialog.type === 'new') {
            dispatch(addRewards({data, userId}));
        }
        else {
            dispatch(updateRewards({...rewardDialog.data, ...data}));
        }
        closeComposeDialog();
    }


    return(
        <Popover
            {...rewardDialog.props}
            anchorReference="anchorPosition"
            anchorPosition={{
                top: 450,
                left: 800
            }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left'
            }}
            component='form'
            onClose={closeComposeDialog}
        >
            <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">

                {/*rewardName*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="rewardName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="rewardName"
                                label="rewardName"
                                className="flex-auto"
                                error={!!errors.title}
                                helperText={errors?.title?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                            />
                        )}
                    />
                </div>


                {/*score*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="score"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="score"
                                label="score"
                                className="flex-auto"
                                error={!!errors.title}
                                helperText={errors?.title?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                            />
                        )}
                    />
                </div>


                {/*reward*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="reward"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="reward"
                                label="reward"
                                className="flex-auto"
                                error={!!errors.title}
                                helperText={errors?.title?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                            />
                        )}
                    />
                </div>


                {/*submit button*/}
                {rewardDialog.type === 'new' ? (
                    <div className="flex items-center space-x-8">
                        <div className="flex flex-1" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            Add
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-8">
                        <div className="flex flex-1" />
                        <IconButton onClick={handleRemove} size="large">
                            <EnvelopeSvgIcon>heroicons-outline:x</EnvelopeSvgIcon>
                        </IconButton>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            Save
                        </Button>
                    </div>
                )}

            </div>
        </Popover>
    )
}

export default RewardForm;
