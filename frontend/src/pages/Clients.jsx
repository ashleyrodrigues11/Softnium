import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import ClientTable from "../components/ClientTable";
import AddClientModal from "../components/AddClientModal";
import DeleteClientModal from "../components/DeleteClientModal";

export default function Clients() {

    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [deleteClient, setDeleteClient] = useState(null);

    const fetchClients = async () => {
        try {
            const response = await api.get("clients/", {
                params: { search: search }
            });
            setClients(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [search]);

    const handleDelete = async (id) => {

        try {

            await api.delete(`clients/${id}/`);

            fetchClients();

            setDeleteClient(null);

            alert("Client deleted successfully!");

        } catch (error) {

            console.log(error);

            alert("Failed to delete client.");

        }

    };

    return (
        <div className="flex bg-[#F8F9FA]">

            <Sidebar />

            <div className="flex-1">

                <Navbar title="Clients" />

                <div className="p-8">

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Clients
                                </h2>

                                <p className="text-gray-500">
                                    {clients.length} Clients
                                </p>
                            </div>

                            <div className="flex gap-3">

                                <input
                                    type="text"
                                    placeholder="Search by name or phone..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border border-gray-300 rounded-xl px-4 py-2 w-72 focus:ring-2 focus:ring-lime-400 outline-none"
                                />

                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-lime-400 hover:bg-lime-500 text-white px-5 py-2 rounded-xl transition"
                                >
                                    + Add Client
                                </button>

                            </div>

                        </div>

                        <ClientTable
                            clients={clients}
                            onEdit={(client) => {

                                setSelectedClient(client);
                                setShowModal(true);

                            }}
                            onDelete={(client) => {

                                setDeleteClient(client);

                            }}
                        />

                    </div>

                </div>

            </div>
            <AddClientModal
                isOpen={showModal}
                onClose={() => {

                    setShowModal(false);
                    setSelectedClient(null);

                }}
                onClientAdded={fetchClients}
                client={selectedClient}
            />

            <DeleteClientModal
                client={deleteClient}
                onClose={() => setDeleteClient(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}