import React, { PropsWithChildren, ReactComponentElement, ReactNode, useEffect, useRef } from "react";

export interface ModalProps {
  toggleModalOpen(): void;
}

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children, toggleModalOpen } = props;
  const modalRef = useRef<any>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleModalOpen();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  return (
    <div className="fixed flex items-center inset-0 z-30">
      <div className="w-full h-full absolute bg-stone-500 opacity-50" />
      <div ref={modalRef} className="relative m-auto w-2/3 h-2/3 items-center z-10" role="dialog" id="modal">
        <div className="m-0 p-5 w-full h-full absolute top-1/2 left-1/2 bg-stone-900 rounded-lg -translate-x-1/2 -translate-y-1/2 shadow-lg overflow-y-auto">
          <header className="flex justify-end">
            <button
              className="aspect-square inline-flex items-center justify-center border-none text-xl cursor- pointer"
              aria-label="close"
              onClick={() => toggleModalOpen()}
            >
              X
            </button>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};
