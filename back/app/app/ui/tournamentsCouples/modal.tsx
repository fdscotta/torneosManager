import { MouseEventHandler, ReactNode, forwardRef } from "react";

interface Props {
    children?: ReactNode;
    onClose: MouseEventHandler<HTMLButtonElement>;
}

export type Ref = HTMLDialogElement;

export default forwardRef<Ref, Props>(function Modal({ children, onClose }, ref) {
    return (
        <dialog ref={ref} className="bg-white rounded-lg shadow w-1/4">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900"> Agregar Pareja</h3>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                    &times;
                </button>
            </div>
            <div className="flex items-center justify-between p-4">{children}</div>
        </dialog>
    );
});