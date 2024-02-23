'use client'

import Modal from '@/app/ui/tournamentsCouples/modal';
import useModal from '@/app/ui/tournamentsCouples/useModal';
import CreateForm from '@/app/ui/tournamentsCouples/createForm';

export default function CreationModal({
    tournamentID
}:{
    tournamentID: string;
}) {
    const { ref, onOpen, onClose } = useModal();

    return (
        <main className="flex flex-col items-center p-24">
            <div className="text-center">
                <button
                    onClick={onOpen}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Crear Pareja
                </button>
                <Modal ref={ref} onClose={onClose}>
                    <CreateForm tournamentID={tournamentID} onClose={onClose} />
                </Modal>
            </div>
        </main>
    )
}