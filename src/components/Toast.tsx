import React from 'react';
import { motion, AnimatePresence } from './Motion';
import { CheckCircle2, AlertCircle, Info } from './Icons';



export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl backdrop-blur-xl border shadow-2xl ${
              toast.type === 'success'
                ? 'bg-slate-900/90 border-amber-500/40 text-amber-100 shadow-amber-500/10'
                : toast.type === 'error'
                ? 'bg-slate-900/90 border-red-500/40 text-red-100 shadow-red-500/10'
                : 'bg-slate-900/90 border-cyan-500/40 text-cyan-100 shadow-cyan-500/10'
            }`}
            onClick={() => onDismiss(toast.id)}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
