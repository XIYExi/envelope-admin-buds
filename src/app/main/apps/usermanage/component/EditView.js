import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUserItem, getUserItem, newUser, removeUserItem, selectUser, updateUserItem} from "../store/userItemSlice";
import {getTags, selectTags} from "../store/tagSlice";
import {useNavigate, useParams} from "react-router-dom";
import EnvelopeLoading from "../../../../../@envelope/core/EnvelopeLoading";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import _ from '../../../../../@lodash';
import {Box} from "@mui/system";
import {Controller, useForm} from "react-hook-form";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import {Autocomplete, Avatar, Button, Checkbox, IconButton, InputAdornment, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import NavLinkAdapter from "../../../../../@envelope/core/NavLinkAdapter";


const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
});


function EditView (props) {
    const user = useSelector(selectUser);
    const tags = useSelector(selectTags);
    const routerParams = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const {isValid, dirtyFields, errors} = formState;

    const form = watch();

    useEffect(() => {
        if (routerParams.id === 'new') {
            dispatch(newUser());
        } else {
            dispatch(getUserItem(routerParams.id));
        }
    }, [dispatch, routerParams])


    useEffect(() => {
        reset({ ...user });
    }, [user, reset])


    function handleRemoveContact() {
        dispatch(removeUserItem(user.id)).then(() => {
            navigate('/apps/contacts');
        });
    }

    function onSubmit(data) {

        // console.log('submit', data)

        if (routerParams.id === 'new') {
            dispatch(addUserItem(data)).then(({ payload }) => {
                navigate(`/apps/usermanage/${payload.id}`);
            });
        } else {
            dispatch(updateUserItem(data)).then(() => {
                console.log(`%c${'更新后Phone 和 Email不显示，是因为mock数据格式问题！'}`,'color: green')
                navigate(`/apps/usermanage`); // 更新完成后跳转到列表页
            })
        }
    }



    if (_.isEmpty(form) || !user) {
        // console.log('edit form not render', form, user)
        return <EnvelopeLoading />;
    }

    return(
        <React.Fragment>
            <Box
                className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
                sx={{
                    backgroundColor: 'background.default',
                }}
            >
                {user.background && (
                    <img
                        className="absolute inset-0 object-cover w-full h-full"
                        src={user.background}
                        alt="user background"
                    />
                )}
            </Box>

            <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
                <div className="w-full">
                    <div className="flex flex-auto items-end -mt-64">
                        <Controller
                            control={control}
                            name="avatar"
                            render={({ field: { onChange, value } }) => (
                                <Box
                                    sx={{
                                        borderWidth: 4,
                                        borderStyle: 'solid',
                                        borderColor: 'background.paper',
                                    }}
                                    className="relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div>
                                            <label htmlFor="button-avatar" className="flex p-8 cursor-pointer">
                                                <input
                                                    accept="image/*"
                                                    className="hidden"
                                                    id="button-avatar"
                                                    type="file"
                                                    onChange={async (e) => {
                                                        function readFileAsync() {
                                                            return new Promise((resolve, reject) => {
                                                                const file = e.target.files[0];
                                                                if (!file) {
                                                                    return;
                                                                }
                                                                const reader = new FileReader();

                                                                reader.onload = () => {
                                                                    resolve(`data:${file.type};base64,${btoa(reader.result)}`);
                                                                };

                                                                reader.onerror = reject;

                                                                reader.readAsBinaryString(file);
                                                            });
                                                        }

                                                        const newImage = await readFileAsync();

                                                        onChange(newImage);
                                                    }}
                                                />
                                                <EnvelopeSvgIcon className="text-white">heroicons-outline:camera</EnvelopeSvgIcon>
                                            </label>
                                        </div>
                                        <div>
                                            <IconButton
                                                onClick={() => {
                                                    onChange('');
                                                }}
                                            >
                                                <EnvelopeSvgIcon className="text-white">heroicons-solid:trash</EnvelopeSvgIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Avatar
                                        sx={{
                                            backgroundColor: 'background.default',
                                            color: 'text.secondary',
                                        }}
                                        className="object-cover w-full h-full text-64 font-bold"
                                        src={value}
                                        alt={user.name}
                                    >
                                        {user.name.charAt(0)}
                                    </Avatar>
                                </Box>
                            )}
                        />
                    </div>
                </div>

                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Name"
                            placeholder="Name"
                            id="name"
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:user-circle</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="tags"
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            multiple
                            id="tags"
                            className="mt-32"
                            options={tags}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(_props, option, { selected }) => (
                                <li {..._props}>
                                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                    {option.title}
                                </li>
                            )}
                            value={value ? value.map((id) => _.find(tags, { id })) : []}
                            onChange={(event, newValue) => {
                                onChange(newValue.map((item) => item.id));
                            }}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Tags" placeholder="Tags" />}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Title"
                            placeholder="Job title"
                            id="title"
                            error={!!errors.title}
                            helperText={errors?.title?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:briefcase</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="company"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Company"
                            placeholder="Company"
                            id="company"
                            error={!!errors.company}
                            helperText={errors?.company?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:office-building</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="emails"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Email"
                            placeholder="123456@email.com"
                            id="emails"
                            error={!!errors.emails}
                            helperText={errors?.emails?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:email</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phoneNumbers"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="phoneNumber"
                            placeholder="12345678900"
                            id="phoneNumbers"
                            error={!!errors.emails}
                            helperText={errors?.emails?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:phone</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Address"
                            placeholder="Address"
                            id="address"
                            error={!!errors.address}
                            helperText={errors?.address?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:location-marker</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="birthday"
                    render={({ field: { value, onChange } }) => (
                        <DateTimePicker
                            value={new Date(value)}
                            onChange={onChange}
                            className="mt-32 mb-16 w-full"
                            clearable
                            slotProps={{
                                textField: {
                                    id: 'birthday',
                                    label: 'Birthday',
                                    InputLabelProps: {
                                        shrink: true,
                                    },
                                    fullWidth: true,
                                    variant: 'outlined',
                                },
                                actionBar: {
                                    actions: ['clear', 'today'],
                                },
                            }}
                            slots={{
                                openPickerIcon: () => <EnvelopeSvgIcon size={20}>heroicons-solid:cake</EnvelopeSvgIcon>,
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="notes"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Notes"
                            placeholder="Notes"
                            id="notes"
                            error={!!errors.notes}
                            helperText={errors?.notes?.message}
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={5}
                            maxRows={10}
                            InputProps={{
                                className: 'max-h-min h-min items-start',
                                startAdornment: (
                                    <InputAdornment className="mt-16" position="start">
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:menu-alt-2</EnvelopeSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </div>


            <Box
                className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
                sx={{ backgroundColor: 'background.default' }}
            >
                {routerParams.id !== 'new' && (
                    <Button color="error" onClick={handleRemoveContact}>
                        Delete
                    </Button>
                )}
                <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
                    Cancel
                </Button>
                <Button
                    className="ml-8"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSubmit(onSubmit)}
                >
                    Save
                </Button>
            </Box>

        </React.Fragment>
    )
}

export default EditView;