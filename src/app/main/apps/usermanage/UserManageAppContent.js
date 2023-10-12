import React, {useEffect, useState} from "react";
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination
} from "@mui/material";
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {selectUsersTable} from "./store/usersTableSlice";

/**
 * 表头数据约束
*/
const columns = [
    { id: 'id', label: 'ID',minWidth: 170, },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'phoneNumbers', label: 'Phone', minWidth: 100 },
    { id: 'emails', label: 'Email', },
    { id: 'createTime',  label: 'Create Time' }
];


function UserManageAppContent(props) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const dispatch = useDispatch();
    const userTables = useSelector(selectUsersTable);
    const [selected, setSelected] = React.useState([]);


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



    }

    return(
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex flex-col flex-auto w-full max-h-full"
        >
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
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
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                        onClick={(event) => handleClick(event, row.id)}
                                    >
                                        {columns.map((column,_index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={_index} align={column.align}
                                                >
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
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