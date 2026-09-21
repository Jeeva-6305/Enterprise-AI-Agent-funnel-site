import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.type || 'info'}`}
          onClick={() => onDismiss(toast.id)}
        >
          {toast.type === 'success' && <CheckCircle2 size={18} color="#16a34a" />}
          {toast.type === 'error' && <AlertCircle size={18} color="#dc2626" />}
          {(!toast.type || toast.type === 'info') && <Info size={18} color="#1D4ED8" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
