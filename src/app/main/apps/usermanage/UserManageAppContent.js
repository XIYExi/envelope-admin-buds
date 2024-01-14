import React, {Fragment, useEffect, useState} from "react";
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination, Button
} from "@mui/material";
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {selectUsersTable} from "./store/usersTableSlice";
import {useNavigate} from "react-router-dom";
import {removeUserItem} from "./store/userItemSlice";

/**
 * 表头数据约束
*/
const columns = [
    { id: 'id', label: 'ID',minWidth: 170, },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'phoneNumbers', label: 'Phone', minWidth: 100 },
    { id: 'emails', label: 'Email', },
    { id: 'createTime',  label: 'Create Time' },
    { id: 'operation',  label: 'Operation' },
];


function UserManageAppContent(props) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const dispatch = useDispatch();
    const userTables = useSelector(selectUsersTable);
    const [selected, setSelected] = React.useState([]);
    const navigate = useNavigate();


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);

        console.log('selected', id)
        navigate(`/apps/usermanage/${id}`);
    }

    const handleRemoveUserItem = (id) => {
        dispatch(removeUserItem(id)).then(() => {
            navigate('/apps/usermanage');
        });
    }

    return(
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex flex-col flex-auto min-w-[100%] w-full max-h-full"
        >
            <Paper className='w-full'>

                <TableContainer className='w-full'>
                    <Table stickyHeader aria-label="sticky table" className='w-full'>
                        <TableHead>
                            <TableRow>
                                {columns.map((column,index) => (
                                    <TableCell
                                        key={index}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userTables.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <Fragment key={index}>
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            {columns.map((column,_index) => {
                                                const value = row[column.id];
                                                if (_index !== columns.length-1)
                                                    return (
                                                        <TableCell key={_index} align={column.align}
                                                                   onClick={(event) => handleClick(event, row.id)}
                                                        >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                            })}

                                            <TableCell>
                                                <Button
                                                    onClick={() => {navigate(`/apps/usermanage/${row.id}/edit`)}}
                                                >Edit</Button>
                                                <Button
                                                    color="error" onClick={() => handleRemoveUserItem(row.id)}
                                                >Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userTables.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </motion.div>
    )
}


export default UserManageAppContent
