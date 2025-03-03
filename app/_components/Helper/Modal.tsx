import { useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
				<h2 className="text-xl font-semibold mb-4">{title}</h2>
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					&times;
				</button>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
