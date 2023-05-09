import React, { useEffect, useState } from 'react';
import { ModalTypes, Record } from "../../types";

import {useModal, useRecords} from "../../hooks";

import { RecordsModal } from "../RecordsModal";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export const TableList = (): JSX.Element => {
    const { records, isLoading, recordsRequest, deleteRecord } = useRecords();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { setRecord } = useModal();

    useEffect(() => {
        recordsRequest();
    }, [recordsRequest]);

    const onCloseModal = (): void => {
        setIsOpen(false);
        setRecord(null);
    };

    const cell = [
        { cell: 'name', cellName: 'Name' },
        { cell: 'address', cellName: 'Address' },
        { cell: 'amount', cellName: 'Amount' },
        { cell: 'role', cellName: 'Role' },
        { cell: 'status', cellName: 'Status' },
        { cell: 'updateBtn', cellName: '' },
        { cell: 'deleteBtn', cellName: '' },
    ];

    const onUpdateRecord = (id: string) => {
        const record = records.find(({_id}) => _id === id);
        setRecord(record as Record);
        setIsOpen(true);
    };

    if (!isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
                <TableHead>
                    <TableRow>
                        {cell.map(({ cell, cellName }) => (
                            <TableCell key={cell}>{cellName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records?.map((record) => (
                        <TableRow
                            key={record._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{record.name}</TableCell>
                            <TableCell>{record.address}</TableCell>
                            <TableCell>{record.amount}</TableCell>
                            <TableCell>{record.role}</TableCell>
                            <TableCell>{record.status}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => onUpdateRecord(record._id as string)}
                                >
                                    Update
                                </Button>
                                <RecordsModal
                                    isOpen={isOpen}
                                    onClose={() => onCloseModal()}
                                    type={ModalTypes.update}
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteRecord({ id: record._id as string})}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};