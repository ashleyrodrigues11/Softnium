export default function PaymentTable({ payments }) {

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="border-b border-gray-200 text-left">

                        <th className="py-3">Client</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Months</th>
                        <th>Remarks</th>

                    </tr>

                </thead>

                <tbody>

                    {payments.map((payment) => (

                        <tr
                            key={payment.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >

                            <td className="py-4 font-medium">
                                {payment.client_name}
                            </td>

                            <td>
                                ₹{payment.amount}
                            </td>

                            <td>
                                {new Date(payment.payment_date).toLocaleDateString("en-IN")}
                            </td>

                            <td>
                                {payment.payment_method}
                            </td>

                            <td>
                                {payment.months_paid}
                            </td>

                            <td>
                                {payment.remarks || "-"}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}