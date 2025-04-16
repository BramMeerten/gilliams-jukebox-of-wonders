"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  visible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const ROOT_ID = "modal-root";

export const Modal = ({ visible, children, onClose }: Props) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let modalRoot = document.getElementById(ROOT_ID);

    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.setAttribute("id", ROOT_ID);
      document.body.appendChild(modalRoot);
    }
    setModalRoot(modalRoot);
  }, []);

  const closeClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onClose) {
      onClose();
    }
  };

  const keyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape' && onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", keyDown, false);
    }
    return () => document.removeEventListener("keydown", keyDown, false);
  }, [keyDown, visible]);

  // TODO animate
  return (
    visible &&
    modalRoot &&
    createPortal(
      <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/20">
        <div className="text-white bg-gray-800 rounded-2xl shadow-xl w-full max-w-md mt-24 p-6 pt-2 relative animate-fadeIn">
          <button
            onClick={closeClicked}
            className="absolute right-4 text-white hover:text-gray-500 cursor-pointer"
          >
            ✕
          </button>
          {children}
        </div>
      </div>,
      modalRoot,
    )
  );
};
