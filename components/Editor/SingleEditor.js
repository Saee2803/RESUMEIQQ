'use client';

import ResumeFields from '@/config/ResumeFields';
import { updateResumeValue } from '@/store/slices/resumeSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';

const SingleEditor = ({ tab }) => {
    const { fields } = ResumeFields[tab];

    const dispatch = useDispatch();
    const resumeData = useSelector(state => state.resume[tab]) || {};

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        dispatch(
            updateResumeValue({
                tab,
                name,
                value,
            }),
        );
    }, [dispatch, tab]);

    return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 md:gap-x-8">
            {fields.map(field => (
                <Input 
                    key={`${tab}-${field.name}`} 
                    {...field} 
                    onChange={handleChange} 
                    value={resumeData?.[field?.name] ?? ''} 
                />
            ))}
        </div>
    );
};

export default SingleEditor;
