import * as React from "react";
import * as yup from 'yup';
import _ from '../../../../../@lodash';
import {useDispatch, useSelector} from "react-redux";
import {
    addUserItem,
    getUserItem,
    newUser,
    removeUserItem,
    selectUserItem,
    updateUserItem
} from "../store/userItemSlice";
import {useNavigate, useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";
import EnvelopeLoading from "../../../../../@envelope/core/EnvelopeLoading";
import {Box} from "@mui/system";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import {Avatar, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import NavLinkAdapter from "../../../../../@envelope/core/NavLinkAdapter";
import {getTableUsers} from "../store/usersTableSlice";



const schema = yup.object().shape({

});



function EditView(props) {

    const user = useSelector(selectUserItem);
    const routerParams = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        console.log('user! -> ',user);
    }, [dispatch, user])



    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const {isValid, dirtyFields, errors} = formState;
    const form = watch();

    useEffect(() => {
        if (routerParams.id === 'new')
            dispatch(newUser());
        else
            dispatch(getUserItem(routerParams.id));
    }, [dispatch, routerParams]);

    useEffect(() => {
        reset({...user});
    }, [user, reset])

    function handleRemoveContact() {
        console.log('?')
        dispatch(removeUserItem(user.sysId)).then(() => {
            dispatch(getTableUsers('1')).then(() => {
                navigate('/apps/users');
            })
        });
    }

    function onSubmit(data) {
        if (routerParams.id === 'new') {
            const event = {
                user: data,
                // TODO 从userSlice中取出当前用户的id
                opsId: '1',
            }
            dispatch(addUserItem(event)).then(() => {
                // 刷新一下数据
                // TODO 学院id！
                dispatch(getTableUsers('1')).then(() => navigate(`/apps/users`));

            });
        }
        else {
            const event = {
                user: data,
                id: routerParams.id,
            }
            dispatch(updateUserItem(event)).then(() => {
                dispatch(getTableUsers('1')).then(() => navigate(`/apps/users`))// 更新完成后跳转到列表页
            });
        }
    }

    console.log('user', user);

    if (_.isEmpty(form) || !user) {
        // console.log('edit form not render', form, user)
        return <EnvelopeLoading />;
    }


    return (
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
                                        {user.name}
                                    </Avatar>
                                </Box>
                            )}
                        />
                    </div>
                </div>


                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="username"
                            placeholder="Username"
                            id="username"
                            error={!!errors.username}
                            helperText={errors?.username?.message}
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
                    name="password"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="password"
                            placeholder="******"
                            id="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
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
                    name="trueName"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="trueName"
                            placeholder="真实姓名"
                            id="trueName"
                            error={!!errors.trueName}
                            helperText={errors?.trueName?.message}
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
                    name="major"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="major"
                            placeholder="专业名称"
                            id="major"
                            error={!!errors.major}
                            helperText={errors?.major?.message}
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
                    name="studentId"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="studentId"
                            placeholder="学号"
                            id="studentId"
                            error={!!errors.studentId}
                            helperText={errors?.studentId?.message}
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
                    name="idCard"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="idCard"
                            placeholder="身份证号"
                            id="idCard"
                            error={!!errors.idCard}
                            helperText={errors?.idCard?.message}
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
                    name="nickName"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="nickName"
                            placeholder="昵称"
                            id="nickName"
                            error={!!errors.nickName}
                            helperText={errors?.nickName?.message}
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
                    name="phone"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="phone"
                            placeholder="联系方式"
                            id="phone"
                            error={!!errors.phone}
                            helperText={errors?.phone?.message}
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
                    name="email"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="email"
                            placeholder="邮箱"
                            id="email"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
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
                    name="address"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="address"
                            placeholder="地址"
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
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="birthday"
                            placeholder="YYYY-MM-DD"
                            id="birthday"
                            error={!!errors.birthday}
                            helperText={errors?.birthday?.message}
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
                    name="sex"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="sex"
                            placeholder="性别"
                            id="sex"
                            error={!!errors.sex}
                            helperText={errors?.sex?.message}
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
                    name="description"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="description"
                            placeholder="个人简介"
                            id="description"
                            error={!!errors.description}
                            helperText={errors?.description?.message}
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
