import { useEffect, useState } from "react";
import api from "../services/api";

export default function AddPaymentModal({
    isOpen,
    onClose,
    onSuccess,
}) {

    const [clients, setClients] = useState([]);

    const [formData, setFormData] = useState({
        client: "",
        amount: "",
        payment_date: "",
        payment_method: "Cash",
        months_paid: 1,
        remarks: "",
    });

    useEffect(() => {

        if (isOpen) {

            fetchClients();

        }

    }, [isOpen]);

    const fetchClients = async () => {

        try {

            const response = await api.get("clients/");

            setClients(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("payments/", formData);

            alert("Payment added successfully!");

            onSuccess();

            onClose();

        } catch (error) {

            console.log(error);

            console.log("Validation Errors:", error.response?.data);

            alert("Failed to add payment.");

        }

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6">
                    Add Payment
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Client */}

                    <div>

                        <label className="block mb-2">
                            Client
                        </label>

                        <select
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        >

                            <option value="">
                                Select Client
                            </option>

                            {clients.map((client) => (

                                <option
                                    key={client.id}
                                    value={client.id}
                                >

                                    {client.full_name}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Amount */}

                    <div>

                        <label className="block mb-2">
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        />

                    </div>

                    {/* Date */}

                    <div>

                        <label className="block mb-2">
                            Payment Date
                        </label>

                        <input
                            type="date"
                            name="payment_date"
                            value={formData.payment_date}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        />

                    </div>

                    {/* Method */}

                    <div>

                        <label className="block mb-2">
                            Payment Method
                        </label>

                        <select
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        >

                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Card</option>
                            <option>Net Banking</option>

                        </select>

                    </div>

                    {/* Months */}

                    <div>

                        <label className="block mb-2">
                            Months Paid
                        </label>

                        <input
                            type="number"
                            name="months_paid"
                            value={formData.months_paid}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        />

                    </div>

                    {/* Remarks */}

                    <div>

                        <label className="block mb-2">
                            Remarks
                        </label>

                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-lime-400 hover:bg-lime-500 text-white px-5 py-2 rounded-xl"
                        >
                            Save Payment
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}