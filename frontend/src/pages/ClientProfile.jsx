import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function ClientProfile() {

    const { id } = useParams();

    const [client, setClient] = useState(null);
    const [payments, setPayments] = useState([]);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const response = await api.get(`clients/${id}/profile/`);

            setClient(response.data.client);

            setPayments(response.data.payments);

        } catch (error) {

            console.log(error);

        }

    };

    if (!client) {

        return <h2 className="p-10">Loading...</h2>;

    }

    return (

        <div className="flex bg-[#F8F9FA]">

            <Sidebar />

            <div className="flex-1">

                <Navbar title="Client Profile" />

                <div className="p-8">

                    <div className="bg-white rounded-2xl shadow-sm border p-8">

                        <h1 className="text-3xl font-bold">
                            {client.full_name}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {client.phone}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">

                            <div>

                                <p><strong>Gender:</strong> {client.gender}</p>

                                <p><strong>DOB:</strong> {client.date_of_birth}</p>

                                <p><strong>Height:</strong> {client.height} cm</p>

                                <p><strong>Weight:</strong> {client.weight} kg</p>

                            </div>

                            <div>

                                <p><strong>Plan:</strong> {client.membership_plan}</p>

                                <p><strong>Joining:</strong> {client.joining_date}</p>

                                <p><strong>Start:</strong> {client.membership_start}</p>

                                <p><strong>End:</strong> {client.membership_end}</p>

                            </div>

                        </div>

                        <h2 className="text-2xl font-bold mt-10 mb-5">

                            Payment History

                        </h2>

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="py-3 text-left">Date</th>

                                    <th className="text-left">Amount</th>

                                    <th className="text-left">Method</th>

                                </tr>

                            </thead>

                            <tbody>

                                {payments.map((payment) => (

                                    <tr
                                        key={payment.id}
                                        className="border-b"
                                    >

                                        <td className="py-3">
                                            {payment.payment_date}
                                        </td>

                                        <td>
                                            ₹{payment.amount}
                                        </td>

                                        <td>
                                            {payment.payment_method}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}