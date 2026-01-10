'use client';

import ResumeFields from '@/config/ResumeFields';
import { addNewIndex, deleteIndex, moveIndex, updateResumeValue } from '@/store/slices/resumeSlice';
import { useCallback, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp, FaPencil, FaTrash } from 'react-icons/fa6';
import { LuPlus } from 'react-icons/lu';
import { TbArrowsMinimize } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';

const MultiEditor = ({ tab }) => {
    const { fields } = ResumeFields[tab];
    const [selectedCard, setSelectedCard] = useState(null);

    const dispatch = useDispatch();
    const resumeData = useSelector(state => state.resume[tab]) || [];

    // Memoized change handler for better performance
    const handleChange = useCallback((e, i) => {
        const { name, value } = e.target;

        dispatch(
            updateResumeValue({
                tab,
                name,
                value,
                index: i,
            }),
        );
    }, [dispatch, tab]);

    const addNew = useCallback(() => {
        dispatch(
            addNewIndex({
                tab,
                name: 'degree',
                value: 'new',
            }),
        );

        setSelectedCard(resumeData.length);
    }, [dispatch, tab, resumeData.length]);

    const deleteCard = useCallback((index) => {
        dispatch(deleteIndex({ tab, index }));
        setSelectedCard(null);
    }, [dispatch, tab]);

    const handleMove = useCallback((index, dir) => {
        dispatch(moveIndex({ tab, index, dir }));
    }, [dispatch, tab]);

    // Get display title safely
    const getDisplayTitle = (item) => {
        if (!item) return 'Untitled';
        const firstValue = Object.values(item)[0];
        return firstValue || 'Untitled';
    };

    return (
        <div>
            <button 
                type="button" 
                className="btn mb-6 ml-auto bg-gray-600/75 text-sm 2xl:text-base" 
                onClick={addNew}
            >
                <LuPlus />
                <span>Add New</span>
            </button>

            {resumeData.length === 0 && (
                <div className="my-16">
                    <p className="text-center text-gray-500">Please Add a New {tab}</p>
                </div>
            )}

            <div className="space-y-5">
                {resumeData.map((item, i) => (
                    <div
                        key={`${tab}-${i}`}
                        className="card h-full py-3 transition-all duration-300"
                        onClick={() => setSelectedCard(i)}
                    >
                        <h3 className="flex items-center justify-between gap-5">
                            <span className="mr-auto text-sm md:text-base truncate">
                                {getDisplayTitle(item)}
                            </span>

                            <button
                                type="button"
                                disabled={i === 0}
                                className="hover:text-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMove(i, 'up');
                                }}
                            >
                                <FaArrowUp />
                            </button>

                            <button
                                type="button"
                                disabled={i === resumeData.length - 1}
                                className="hover:text-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMove(i, 'down');
                                }}
                            >
                                <FaArrowDown />
                            </button>

                            {selectedCard === i ? (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCard(null);
                                    }}
                                >
                                    <TbArrowsMinimize />
                                </button>
                            ) : (
                                <button type="button" className="text-primary-400">
                                    <FaPencil />
                                </button>
                            )}

                            <button
                                type="button"
                                className="text-red-400"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCard(i);
                                }}
                            >
                                <FaTrash />
                            </button>
                        </h3>

                        {selectedCard === i && (
                            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
                                {fields.map(field => (
                                    <Input
                                        key={`${tab}-${i}-${field.name}`}
                                        {...field}
                                        onChange={(e) => handleChange(e, i)}
                                        value={item?.[field.name] ?? ''}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiEditor;
