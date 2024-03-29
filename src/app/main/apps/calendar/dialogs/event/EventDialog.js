import EventModel from "../../model/EventModel";
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {
    addEvent,
    closeEditEventDialog,
    closeNewEventDialog,
    removeEvent,
    selectEventDialog,
    updateEvent
} from "../../store/eventsSlice";
import {selectFirstLabelId} from "../../store/labelsSlice";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCallback, useEffect} from "react";
import {Button, FormControlLabel, IconButton, Popover, Switch, TextField} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../../@envelope/core/EnvelopeSvgIcon";
import {DateTimePicker} from "@mui/x-date-pickers";
import _ from '../../../../../../@lodash';
import EnvelopeUtils from "../../../../../../@envelope/utils";
import EventLabelSelect from "../../EventLabelSelect";

const defaultValues = EventModel();

/**
 * 表单验证schema
 */
const schema = yup.object().shape({
    title: yup.string().required('必须输入标题'),
});

function EventDialog(props) {
    const dispatch = useDispatch();
    const eventDialog = useSelector(selectEventDialog);
    const firstLabelId = useSelector(selectFirstLabelId);

    const {reset, formState, watch, control, getValues} = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const {isValid, dirtyFields, errors} = formState;

    const start = watch('start');
    const end = watch('end');
    const id = watch('id');

    const initDialog = useCallback(() => {
        if (eventDialog.type === 'edit' && eventDialog.data) {
            reset({ ...eventDialog.data });
        }

        if (eventDialog.type === 'new') {
            reset({
                ...defaultValues,
                ...eventDialog.data,
                extendedProps: {
                    ...defaultValues.extendedProps,
                    label: firstLabelId,
                },
                id: EnvelopeUtils.generateGUID(),
            });
        }
    }, [eventDialog.data, eventDialog.type, reset]);

    useEffect(() => {
        if (eventDialog.props.open) {
            initDialog();
        }
    }, [eventDialog.props.open, initDialog]);

    function closeComposeDialog() {
        return eventDialog.type === 'edit'
            ? dispatch(closeEditEventDialog())
            : dispatch(closeNewEventDialog());
    }

    function onSubmit(ev) {
        ev.preventDefault();
        const data = getValues();
        if (eventDialog.type === 'new') {
            dispatch(addEvent(data));
        } else {
            dispatch(updateEvent({ ...eventDialog.data, ...data }));
        }
        closeComposeDialog();
    }

    function handleRemove() {
        dispatch(removeEvent(id));
        closeComposeDialog();
    }


    return(
        <Popover
            {...eventDialog.props}
            anchorReference="anchorPosition"
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            onClose={closeComposeDialog}
            component="form"
        >
            <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">
                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </EnvelopeSvgIcon>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="title"
                                label="Title"
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

                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:calendar
                    </EnvelopeSvgIcon>
                    <div className="w-full">
                        <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
                            <Controller
                                name="start"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DateTimePicker
                                        className="mt-8 mb-16 w-full"
                                        value={new Date(value)}
                                        onChange={onChange}
                                        slotProps={{
                                            textField: {
                                                label: 'Start',
                                                variant: 'outlined',
                                            },
                                        }}
                                        maxDate={end}
                                    />
                                )}
                            />

                            <Controller
                                name="end"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <DateTimePicker
                                        className="mt-8 mb-16 w-full"
                                        value={new Date(value)}
                                        onChange={onChange}
                                        slotProps={{
                                            textField: {
                                                label: 'End',
                                                variant: 'outlined',
                                            },
                                        }}
                                        minDate={start}
                                    />
                                )}
                            />
                        </div>

                        <Controller
                            name="allDay"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormControlLabel
                                    className="mt-8"
                                    label="All Day"
                                    control={
                                        <Switch
                                            onChange={(ev) => {
                                                onChange(ev.target.checked);
                                            }}
                                            checked={value}
                                            name="allDay"
                                        />
                                    }
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:tag
                    </EnvelopeSvgIcon>

                    <Controller
                        name="extendedProps.label"
                        control={control}
                        render={({ field }) => <EventLabelSelect className="mt-8 mb-16" {...field} />}
                    />
                </div>

                <div className="flex sm:space-x-24 mb-16">
                    <EnvelopeSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:menu-alt-2
                    </EnvelopeSvgIcon>

                    <Controller
                        name="extendedProps.desc"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                id="desc"
                                label="Description"
                                type="text"
                                multiline
                                rows={5}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </div>

                {eventDialog.type === 'new' ? (
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
                            <EnvelopeSvgIcon>heroicons-outline:trash</EnvelopeSvgIcon>
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

export default EventDialog;

