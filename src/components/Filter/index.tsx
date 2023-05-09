import React, {useState} from 'react';
import {Role, Status} from "../../types";
import {useDispatch} from "react-redux";

import {setRecords} from "../../redux/slice";
import {useRecords} from "../../hooks";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';

export const Filter = (): JSX.Element => {
    const dispatch = useDispatch();
    const { records, recordsRequest } = useRecords();

    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<Role>(Role.Admin);
    const [status, setStatus] = useState<Status>(Status.Open);

    const onFilter = (): void => {
        if (records.length) {
            const findRecord = records.filter((record) => {
                if (name) {
                    return record.name && record.role === role && record.status === status;
                }

                return record.role === role && record.status === status;
            });

            dispatch(setRecords(findRecord));
            return;
        }

        return;
    };

    const onClear = (): void => {
        setName('');
        setRole(Role.Admin);
        setStatus(Status.Open);
        recordsRequest();
    };

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as Role);
    };

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
        }}>
            <Typography variant="h3">Filter</Typography>
            <TextField
                fullWidth
                id="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <Button
                variant='contained'
                onClick={() => onFilter()}
            >
                Filter
            </Button>
            <Button
                variant='contained'
                onClick={() => onClear()}
            >
                Clear
            </Button>
        </Box>
    );
};
