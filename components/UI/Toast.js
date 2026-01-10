'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const ToastItem = ({ toast, onRemove }) => {
    const icons = {
        success: <FaCheck className="text-green-400" />,
        error: <FaExclamationTriangle className="text-red-400" />,
        info: <FaInfoCircle className="text-blue-400" />,
        warning: <FaExclamationTriangle className="text-amber-400" />,
    };

    const bgColors = {
        success: 'bg-green-900/40 border-green-500/40',
        error: 'bg-red-900/40 border-red-500/40',
        info: 'bg-blue-900/40 border-blue-500/40',
        warning: 'bg-amber-900/40 border-amber-500/40',
    };

    return (
        <div
            className={`flex items-center gap-3 rounded-lg border ${bgColors[toast.type]} px-4 py-3 shadow-lg backdrop-blur-sm animate-slide-in`}
        >
            {icons[toast.type]}
            <p className="text-sm text-gray-200 flex-1">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
            >
                <FaTimes className="text-xs" />
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
    const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
    const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);
    const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
                {toasts.map(toast => (
                    <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
