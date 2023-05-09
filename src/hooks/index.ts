import { useDispatch, useSelector } from "react-redux";
import { setRecords, setLoading, setModalRecord } from "../redux/slice";

import { State, Query, Record } from "../types";
import { URL } from "../constants/urls";

const request = async (): Promise<any> => {
    const res = await fetch(URL, {
        method: 'GET',
        mode: 'no-cors',
    });

    return await res.json();
};

const deleteRecordRequest = async (query: Query): Promise<any> => {
    const res = await fetch(URL + new URLSearchParams(query), {
        method: 'DELETE',
        mode: 'no-cors',
    });

    return await res.json();
};

const createRecordRequest = async (record: Record): Promise<any> => {
    const res = await fetch(URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(record),
    });

    return await res.json();
};

const updateRecordRequest = async (record: Record): Promise<any> => {
    const res = await fetch(URL, {
        method: 'PUT',
        mode: 'no-cors',
        body: JSON.stringify(record),
    });

    return await res.json();
};

export const useRecords = () => {
    const dispatch = useDispatch();

    const records = useSelector((state: State) => state.store.records);

    const isLoading = useSelector((state: State) => state.store.records);

    const recordsRequest = () => {
        dispatch(setLoading(true));

        request().then((data) => {
            dispatch(setLoading(false));
            dispatch(setRecords(data));
        });
    };

    const deleteRecord = (query: Query) => {
        dispatch(setLoading(true));

        deleteRecordRequest(query).then(() => {
            dispatch(setLoading(false));
        }).then(() => recordsRequest());
    };

    const updateRecord = (record: Record) => {
        dispatch(setLoading(true));

        updateRecordRequest(record).then(() => {
            dispatch(setLoading(false));
        }).then(() => recordsRequest());
    };

    const createRecord = (record: Record) => {
        dispatch(setLoading(true));

        createRecordRequest(record).then(() => {
            dispatch(setLoading(false));
        }).then(() => recordsRequest());
    };

    return { records, isLoading, recordsRequest, deleteRecord, updateRecord, createRecord };
};

export const useModal = () => {
    const dispatch = useDispatch();

    const record = useSelector((state: State) => state.store.modalRecord);

    const setRecord = (value: Record | null) => dispatch(setModalRecord(value));

    return { record, setRecord };
};