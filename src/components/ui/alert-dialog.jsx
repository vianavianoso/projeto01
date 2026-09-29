"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const AlertDialogContext = React.createContext();

export function AlertDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children, render, asChild }) {
  const { setOpen } = React.useContext(AlertDialogContext);
  
  if (render) {
    return React.cloneElement(render, { onClick: () => setOpen(true) });
  }

  return (
    <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

export function AlertDialogContent({ children, className }) {
  const { open } = React.useContext(AlertDialogContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={cn("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95", className)}>
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h3 className="text-lg font-bold text-slate-900 dark:text-white">{children}</h3>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-xs text-slate-600 dark:text-slate-400">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="flex justify-end gap-2 pt-4">{children}</div>;
}

export function AlertDialogCancel({ children, onClick }) {
  const { setOpen } = React.useContext(AlertDialogContext);
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen(false);
        if (onClick) onClick(e);
      }}
      className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  const { setOpen } = React.useContext(AlertDialogContext);
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen(false);
        if (onClick) onClick(e);
      }}
      className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
    >
      {children}
    </button>
  );
}