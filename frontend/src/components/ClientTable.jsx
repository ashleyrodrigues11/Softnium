import { useNavigate } from "react-router-dom";

export default function ClientTable({ clients, onEdit, onDelete, }) {
    const navigate = useNavigate();

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="border-b border-gray-200 text-left">

                        <th className="py-3">Name</th>
                        <th>Phone</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {clients.map((client) => (

                        <tr
                            key={client.id}
                            onClick={() => navigate(`/clients/${client.id}`)}
                            className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >

                            <td className="py-4 font-medium">
                                {client.full_name}
                            </td>

                            <td>{client.phone}</td>

                            <td>{client.membership_plan}</td>

                            <td>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${client.status
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {client.status ? "Active" : "Inactive"}
                                </span>

                            </td>

                            <td className="space-x-2">

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(client);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(client);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}