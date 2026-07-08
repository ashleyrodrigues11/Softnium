export default function DeleteClientModal({

    client,
    onClose,
    onConfirm,

}) {

    if (!client) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4">

                    Delete Client

                </h2>

                <p className="text-gray-600">

                    Are you sure you want to delete

                </p>

                <p className="font-bold text-lg mt-2">

                    {client.full_name}

                </p>

                <p className="text-red-500 mt-4">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm(client.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}