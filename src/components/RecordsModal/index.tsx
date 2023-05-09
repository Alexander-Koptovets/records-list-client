import React, {useEffect, useState} from 'react';
import {ModalTypes, Role, Status} from "../../types";

import {useModal, useRecords} from "../../hooks";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    type: ModalTypes;
};

export const RecordsModal = ({ isOpen, onClose, type }: Props): JSX.Element => {
    const { createRecord, updateRecord } = useRecords();
    const { record } = useModal();

    const [name, setName] = useState<string>(record?.name || '');
    const [address, setAddress] = useState<string>(record?.address || '');
    const [amount, setAmount] = useState<number>(record?.amount || 0);
    const [role, setRole] = useState<Role>(record?.role || Role.Admin);
    const [status, setStatus] = useState<Status>(record?.status || Status.Open);

    useEffect(() => {
        if (record) {
            const { name, address, amount, role, status } = record;

            setName(name);
            setAddress(address);
            setAmount(amount);
            setRole(role);
            setStatus(status);
        } else {
            setName('');
            setAddress('');
            setAmount(0);
            setRole(Role.Admin);
            setStatus(Status.Open);
        }
    }, [record]);

    const isActive = name && address && amount;

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as Role);
    };

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };

    const onSave = (): void => {
        if (type === ModalTypes.create) {
            const data = {name, address, amount, role, status};

            createRecord(data);
        } else if (type === ModalTypes.update) {
            const data = { id: record?._id, name, address, amount, role, status};

            updateRecord(data);
        }
        onClose();
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
    };

    const resolvedTitle = type === ModalTypes.create ? 'Create Record' : 'Update Record';

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h4">{resolvedTitle}</Typography>
                <TextField
                    required
                    id="name"
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    id="address"
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    required
                    id="amount"
                    label="Amount"
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <FormControl fullWidth>
                    <InputLabel id="select-label-role">Role</InputLabel>
                    <Select
                        labelId="select-label-role"
                        id="select-role"
                        value={role}
                        label="Role"
                        onChange={handleChangeRole}
                    >
                        <MenuItem value={Role.Admin}>{Role.Admin}</MenuItem>
                        <MenuItem value={Role.Customer}>{Role.Customer}</MenuItem>
                        <MenuItem value={Role.Business}>{Role.Business}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-label-status">Status</InputLabel>
                    <Select
                        labelId="select-label-status"
                        id="select-status"
                        value={status}
                        label="Status"
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value={Status.Open}>{Status.Open}</MenuItem>
                        <MenuItem value={Status.Close}>{Status.Close}</MenuItem>
                        <MenuItem value={Status.Pending}>{Status.Pending}</MenuItem>
                    </Select>
                </FormControl>
                {!isActive && (
                    <Box sx={{ color: "red" }}>
                        All fields must be filled
                    </Box>
                )}
                <Button
                    variant="contained"
                    disabled={!isActive}
                    onClick={() => onSave()}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};