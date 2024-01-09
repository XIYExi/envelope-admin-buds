import {Button, FormControlLabel, IconButton, Popover, Switch, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeEditAchieveDialog, selectAchieveDialog, updateAchieve} from "../store/achievesSlice";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {useCallback, useEffect} from "react";
import AchieveModel from "../models/AchieveModel";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import EnvelopeUtils from "../../../../../@envelope/utils";
import {DateTimePicker} from "@mui/x-date-pickers";
import _ from "../../../../../@lodash";


const defaultValues = AchieveModel();


const schema = yup.object().shape({

})


function AchieveForm(props) {
    const dispatch = useDispatch();


    const achieveDialog = useSelector(selectAchieveDialog);


    const {reset, formState, watch, control, getValues} = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const {isValid, dirtyFields, errors} = formState;

    const start = watch('start');
    const end = watch('end');
    const id = watch('id');


    const initDialog = useCallback(() => {
        if (achieveDialog.type === 'edit' && achieveDialog.data) {
            reset({...achieveDialog.data});
        }

        if (achieveDialog.type === 'new') {
            reset({
                ...defaultValues,
                ...achieveDialog.data,
                id: EnvelopeUtils.generateGUID(),
            });
        }
    }, [achieveDialog.data, achieveDialog.type, reset])


    useEffect(() => {
        if (achieveDialog.props.open) {
            initDialog();
        }
    }, [achieveDialog.props.open, initDialog]);


    function closeComposeDialog() {
        return achieveDialog.type === 'edit'
            ? dispatch(closeEditAchieveDialog())
            : null;
    }

    function handleRemove() {
        closeComposeDialog();
    }

    function onSubmit(ev) {
        ev.preventDefault();
        const data = getValues();
        // console.log(data);
        if (achieveDialog.type === 'new') {
            //dispatch(addEvent(data));
        } else {
            dispatch(updateAchieve({ ...achieveDialog.data, ...data }));
        }
        closeComposeDialog();
    }


    return (
        <Popover
            {...achieveDialog.props}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 250, left: 600 }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            component='form'
            onClose={closeComposeDialog}
        >
            <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">

                {/*achieveName*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="achieveName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="achieveName"
                                label="achieveName"
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

                {/*address*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="address"
                                label="address"
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

                {/*conditions*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="conditions"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="conditions"
                                label="conditions"
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

                {/*deathTime*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:calendar
                    </EnvelopeSvgIcon>
                    <div className="w-full">
                        <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
                            <Controller
                                name="deathTime"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DateTimePicker
                                        className="mt-8 mb-16 w-full"
                                        value={new Date(value)}
                                        onChange={onChange}
                                        slotProps={{
                                            textField: {
                                                label: 'deathTime',
                                                variant: 'outlined',
                                            },
                                        }}
                                        maxDate={end}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/*description*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="description"
                                label="description"
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


                {/*image*/}
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="image"
                                label="image"
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




                {/*submit button*/}
                {achieveDialog.type === 'new' ? (
                    <div className="flex items-center space-x-8">
                        <div className="flex flex-1" />
                        <Button
                            variant="contained"
                            color="primary"
                            /*onClick={onSubmit}*/
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

export default AchieveForm;
