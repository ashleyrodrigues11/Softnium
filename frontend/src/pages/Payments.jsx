import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import PaymentTable from "../components/PaymentTable";
import AddPaymentModal from "../components/AddPaymentModal";

export default function Payments() {

    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const fetchPayments = async () => {

        try {

            const response = await api.get("payments/");

            setPayments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchPayments();

    }, []);

    console.log(payments);

    return (

        <div className="flex bg-[#F8F9FA]">

            <Sidebar />

            <div className="flex-1">

                <Navbar title="Payments" />

                <div className="p-8">

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                        <div className="flex justify-between items-center mb-6">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Payments
                                </h2>

                                <p className="text-gray-500">
                                    {payments.length} Payments
                                </p>

                            </div>

                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-lime-400 hover:bg-lime-500 text-white px-5 py-2 rounded-xl"
                            >
                                + Add Payment
                            </button>

                        </div>

                        <PaymentTable payments={payments} />

                    </div>

                </div>

            </div>

            <AddPaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={fetchPayments}
            />

        </div>

    );

}