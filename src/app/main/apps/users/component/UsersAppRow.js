import * as React from "react";
import {Box, Button, Collapse, Divider, Paper, Stack, Table, TableCell, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";



function UsersAppRow(props) {
    const [open, setOpen] = React.useState(false);

    const {columns, row} = props;


    return (
        <>
            {/*Preview Data*/}
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
            >
                {/*Open and Close Icon*/}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                {/*Data Item Preview*/}
                {
                    columns.map((column, _index) => {
                        const value = row[column.id]; // value为对应的内容
                        if (_index !== columns.length - 1)
                            return (
                                <TableCell
                                    key={_index}
                                    align={column.align}
                                    onClick={event => {
                                        setOpen(!open);
                                    }}
                                    style={{
                                        fontWeight: 300
                                    }}
                                >
                                    {
                                        column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value
                                    }
                                </TableCell>
                            )
                    })
                }

                {/*Operation Columns*/}
                <TableCell>
                    <Button
                        style={{
                            fontWeight: 300
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        style={{
                            fontWeight: 300
                        }}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>

            {/*All Data*/}
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={12}>
                    <Collapse in={open} timeout={"auto"}>
                        <Box sx={{margin: 1}}>
                            <Typography
                                style={{fontSize: '16px', fontWeight: 600}}
                                gutterBottom
                                component='div'
                            >
                                更多
                            </Typography>
                            <Stack
                                spacing={2}
                                direction='row'
                                useFlexGap
                                flexWrap='wrap'
                                className='mt-12'
                            >
                                <div className='flex w-[200px] max-w-[200px] px-20 '>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>ID：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.sysId}</Typography>
                                </div>
                                <div className='flex w-[200px] max-w-[200px] px-20 '>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>身份证：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.idCard}</Typography>
                                </div>
                                <div className='flex w-[200px] max-w-[200px] px-20 -1'>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>用户名：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.username}</Typography>
                                </div>
                                <div className='flex w-[200px] max-w-[200px] px-20 '>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>密码：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.password}</Typography>
                                </div>

                                <div className='flex w-[200px] max-w-[200px] px-20 '>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>地址：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.address}</Typography>
                                </div>
                                <div className='flex w-[200px] max-w-[200px] px-20 '>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>生日：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.birthday}</Typography>
                                </div>
                                <div className='flex w-[200px] max-w-[200px] px-20'>
                                    <Typography className='min-w-[64px]' style={{fontWeight: 300}}>创建日期：</Typography>
                                    <Typography style={{fontWeight: 300}}>{moment(row.createTime).format('YYYY-MM-DD')}</Typography>
                                </div>
                                <div className='flex w-[200px] max-w-[200px] px-20'>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>专业：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.major}</Typography>
                                </div>

                                <div className='flex px-20'>
                                    <Typography className='w-[64px]' style={{fontWeight: 300}}>描述：</Typography>
                                    <Typography style={{fontWeight: 300}}>{row.description}</Typography>
                                </div>
                            </Stack>
                        </Box>
                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    )
}


export default UsersAppRow;
