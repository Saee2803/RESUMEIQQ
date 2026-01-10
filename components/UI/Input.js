'use client';

import { twMerge } from 'tailwind-merge';
import { sentenceCase } from 'change-case';
import ContentEditable from 'react-contenteditable';
import { useRef, useMemo } from 'react';

const Input = ({ label, name, type, placeholder, options, span, value, ...props }) => {
    // Safely handle undefined/null values
    const safeValue = value ?? '';
    
    const inputClassName = `block w-full rounded-md border border-gray-600 bg-gray-700/75 p-2 text-sm text-gray-100 shadow-md shadow-gray-800 outline-none focus:border-2 focus:border-primary-500 focus:bg-gray-700 md:text-base 2xl:p-2.5`;

    const inputRef = useRef(null);

    const InputEl = () => {
        // if (type === 'textarea' && props.multipoints) {
        //     return (
        //         <div
        //             contentEditable={true}
        //             role="textbox"
        //             className={twMerge(inputClassName, 'min-h-56 whitespace-pre-wrap text-sm md:min-h-40 md:text-sm')}
        //             {...props}
        //             // onInput={e => {
        //             //     const text = e.target.innerText;
        //             //     console.log(text);
        //             //     props.onChange({ target: { name, value: text } });

        //             // }}

        //             // onKeyDown={e => {console.log('key down')}}
        //         >
        //             <ul className="space-y-2 list-disc">
        //                 {value?.split('\n')?.map((line, index) => (
        //                     <li
        //                         key={index}
        //                         className={
        //                             "relative ml-[10px] leading-[1.35em] before:absolute before:left-[-10px] before:content-['•']"
        //                         }
        //                     >
        //                         {line}
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     );
        // }

        if (type === 'textarea' && props.multipoints) {
            // Build HTML from value, handling undefined/null safely
            const lines = (safeValue || '')
                .split('\n')
                .filter(line => line.trim());
            
            const html = lines.length > 0 
                ? `<ul class="space-y-1.5 list-disc pl-4 md:pl-5">${lines.map(line => `<li>${line || ''}</li>`).join('')}</ul>`
                : '';

            return (
                <ContentEditable
                    role="textbox"
                    html={html}
                    innerRef={inputRef}
                    className={twMerge(inputClassName, 'min-h-56 text-sm md:min-h-40 md:text-sm')}
                    onChange={e => {
                        const text = inputRef.current?.innerText || '';
                        props.onChange({ target: { name, value: text } });
                    }}
                />
            );
        }

        if (type === 'textarea') {
            return (
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={safeValue}
                    className={twMerge(inputClassName, 'min-h-56 text-sm md:min-h-40')}
                    {...props}
                />
            );
        }

        if (type == 'select') {
            return (
                <select
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className={inputClassName}
                    value={safeValue}
                    {...props}
                >
                    <option value="">Select {label}</option>
                    {options?.map(option => (
                        <option key={option.value} value={option.value}>
                            {option?.name || option?.value}
                        </option>
                    ))}
                </select>
            );
        }

        if (type == 'color') {
            return (
                <input
                    type={'color'}
                    name={name}
                    id={name}
                    className={twMerge(inputClassName, 'py-1')}
                    placeholder={placeholder || `Enter ${label}`}
                    {...props}
                />
            );
        }

        return (
            <input
                type={type ?? 'text'}
                name={name}
                id={name}
                className={inputClassName}
                placeholder={placeholder || `Enter ${label}`}
                value={type === 'file' ? undefined : safeValue}
                {...props}
            />
        );
    };

    return (
        <div className={`${span ? 'md:col-span-2' : ''}`}>
            {label && (
                <label htmlFor={name} className="mb-0.5 block text-xs text-gray-300 md:text-sm 2xl:text-base">
                    {label ?? sentenceCase(name)} {props.required && '*'}
                </label>
            )}

            {InputEl()}
        </div>
    );
};

export default Input;
