import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/ui/navbar";
import { FormEvent, useState } from "react";

export function Checkout() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center mb-6 text-headerColor font-mono">Checkout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex space-x-4">
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="flex-1"
                                    required
                                />
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="flex-1"
                                    required
                                />
                            </div>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full"
                                required
                            />
                            <div className="flex items-center space-x-4">
                                <label>
                                    <label className="block text-lg font-semibold mb-2 text-headerColor">Payment Method:</label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bankTransfer"
                                        className="mr-2 text-textColor"
                                    />
                                    Transfer to the bank
                                </label>
                            </div>
                            <label className="block text-lg font-semibold mb-2 text-headerColor">Upload your receipt:</label>
                            <Input

                                type="file"
                                name="receipt"
                                className="w-full"
                                required
                            />
                            <Button type="submit" className="bg-customColor mt-4 text-button-foreground py-4 px-5 rounded-md cursor-pointer my-2">
                                Place Order
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                {isModalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-headerColor">Reservation Confirmed</h2>
                            <p className="text-textColor">Your reservation has been successfully confirmed.
                                We will send you the tickets in your Email
                            </p>
                            <button
                                className="bg-customColor text-button-foreground py-2 px-5 rounded-md cursor-pointer my-2 justify-center"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>

                )}

            </div>
            <Footer />
        </>
    );
}
export default Checkout;