interface ConfirmationProps {
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
}

export function ConfirmationPopup({ message, onConfirm, onCancel }: ConfirmationProps) {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-transparent-gray flex justify-center items-center">
            <div className="bg-gray p-4 rounded text-white font-semibold text-xl">
                <p>{message}</p>
                <button className="text-red mr-4 hover:opacity-95" onClick={onConfirm}>Confirm</button>
                <button className="hover:opacity-95" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}