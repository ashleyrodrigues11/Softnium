import { useState, useEffect } from "react";
import api from "../services/api";
export default function AddClientModal({ isOpen, onClose, onClientAdded, client }) {
    const [formData, setFormData] = useState({
        full_name: client ? client.full_name : "",
        phone: client ? client.phone : "",
        gender: client ? client.gender : "",
        date_of_birth: client ? client.date_of_birth : "",
        joining_date: client ? client.joining_date : "",
        address: client ? client.address : "",
        emergency_contact: "",
        membership_plan: "",
        membership_start: "",
        membership_end: "",
        height: "",
        weight: "",
        status: true,
        notes: "",
        photo: null,
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {

        const { name, value, files, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === "file"
                ? files[0]
                : value,
        });

    };
    useEffect(() => {

        if (client) {

            setFormData({
                full_name: client.full_name || "",
                phone: client.phone || "",
                gender: client.gender || "Male",
                date_of_birth: client.date_of_birth || "",
                joining_date: client.joining_date || "",
                membership_plan: client.membership_plan || "Monthly",
                membership_start: client.membership_start || "",
                membership_end: client.membership_end || "",
                height: client.height || "",
                weight: client.weight || "",
                address: client.address || "",
                emergency_contact: client.emergency_contact || "",
                status: client.status,
                notes: client.notes || "",
                photo: null,
            });

        } else {

            setFormData({
                full_name: "",
                phone: "",
                gender: "Male",
                date_of_birth: "",
                joining_date: "",
                membership_plan: "Monthly",
                membership_start: "",
                membership_end: "",
                height: "",
                weight: "",
                address: "",
                emergency_contact: "",
                status: true,
                notes: "",
                photo: null,
            });

        }

    }, [client]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null && formData[key] !== "") {
                    data.append(key, formData[key]);
                }
            });

            if (client) {
                await api.put(`clients/${client.id}/`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("clients/", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setErrorMsg("");
            setShowSuccess(true);
            if (onClientAdded) onClientAdded();
            setTimeout(() => {
                setShowSuccess(false);
                setIsSubmitting(false);
                onClose();
            }, 2000);

        } catch (error) {
            const data = error.response?.data;
            if (data && typeof data === "object") {
                const messages = Object.entries(data)
                    .map(([field, errs]) => `${field}: ${Array.isArray(errs) ? errs.join(", ") : errs}`)
                    .join(" | ");
                setErrorMsg(messages);
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative">

                {/* Success Toast */}
                {showSuccess && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-bounce">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="font-semibold">{client ? "Client updated successfully!" : "Client added successfully!"}</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white z-10 shrink-0">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {client ? "Edit Client" : "Add Client"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-6 bg-gray-50/50">
                    <form id="add-client-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Personal Information */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                        placeholder="e.g. +91 9876543210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all bg-white"
                                    >
                                        <option value="">Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Address */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Contact & Address
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                                    <textarea
                                        name="address"
                                        rows="2"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all resize-none"
                                        placeholder="Full address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Emergency Contact</label>
                                    <input
                                        type="text"
                                        name="emergency_contact"
                                        value={formData.emergency_contact}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                        placeholder="Name and Phone"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Membership & Physical */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Membership */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Membership
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Plan</label>
                                        <select
                                            name="membership_plan"
                                            value={formData.membership_plan}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all bg-white"
                                        >
                                            <option value="">Select Plan</option>
                                            <option>Monthly</option>
                                            <option>Quarterly</option>
                                            <option>Half-Yearly</option>
                                            <option>Yearly</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Joining Date</label>
                                        <input
                                            type="date"
                                            name="joining_date"
                                            value={formData.joining_date}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                                            <input
                                                type="date"
                                                name="membership_start"
                                                value={formData.membership_start}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                                            <input
                                                type="date"
                                                name="membership_end"
                                                value={formData.membership_end}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Physical Details */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Physical Details
                                </h3>
                                <div className="space-y-5 flex-1">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Height (cm)</label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                            placeholder="e.g. 175"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (kg)</label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                                            placeholder="e.g. 70"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                                <textarea
                                    name="notes"
                                    rows="2"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all resize-none"
                                    placeholder="Any additional information..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Photo</label>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleChange}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100 transition-all cursor-pointer border border-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="inline-flex items-center gap-3 cursor-pointer">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.status}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.checked,
                                                })
                                            }
                                            className="w-5 h-5 border-gray-300 rounded text-lime-600 focus:ring-lime-500 transition-all cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Active Client Status</span>
                                </label>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-white shrink-0 z-10">
                    {errorMsg && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{errorMsg}</span>
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className={`px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="add-client-form"
                            disabled={isSubmitting}
                            className={`px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all flex items-center gap-2 ${isSubmitting ? 'bg-lime-400 opacity-70 cursor-wait' : 'bg-lime-500 hover:bg-lime-600 shadow-sm hover:shadow active:scale-95'}`}
                        >
                            {client ? "Update Client" : "Save Client"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}