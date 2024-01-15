import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUsersTable} from "../usermanage/store/usersTableSlice";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {selectFilteredUsers, selectFilteredUsersWithCreatedTime, selectUsersDataSource} from "./store/usersTableSlice";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UsersAppRow from "./component/UsersAppRow";
import UsersAppSearchForm from "./component/UsersAppSearchForm";


/**
 * 表头数据约束
 */
const columns = [
    { id: 'studentId', label: '学号',minWidth: 170, },
    { id: 'nickname', label: '昵称', minWidth: 170 },
    { id: 'trueName', label: '姓名', minWidth: 170},
    { id: 'phone', label: '联系方式', minWidth: 100 },
    { id: 'email', label: '邮箱', },
    { id: 'createTime',  label: 'Create Time' },
    { id: 'operation',  label: 'Operation' },
];


function UsersAppContent(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const dispatch = useDispatch();


    const userTables = useSelector(selectFilteredUsersWithCreatedTime);
    const [selected, setSelected] = React.useState([]);
    const navigate = useNavigate();



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex flex-col flex-auto min-w-[100%] w-full max-h-full"
        >
            <Paper className='w-full px-20 py-12'>

                <UsersAppSearchForm />

                <TableContainer className='w-full'>
                    <Table
                        className='w-full'
                    >
                        <TableHead>
                            <TableRow>
                                {/*空一个，第一个位置留给折叠icon*/}
                                <TableCell />
                                {
                                    columns.map((column, index) => (
                                        <TableCell
                                            key={index}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                                fontWeight: 500
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                userTables
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <UsersAppRow
                                                    columns={columns}
                                                    row={row}
                                                />
                                            </Fragment>
                                        );
                                    })
                            }
                        </TableBody>


                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    count={userTables.length}
                />
            </Paper>
        </motion.div>
    )
}


export default UsersAppContent;
