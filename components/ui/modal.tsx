'use client';

import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnBackdrop?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  closeOnBackdrop = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="bg-background/50 fixed inset-0 z-50 flex items-center justify-center"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className="bg-background relative min-w-[320px] rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}

        <button
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
