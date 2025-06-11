import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Card({ userid, date }) {
    const [CardData, setCardData] = useState([]);



    const getCarddetails = async () => {
        try {

            const token = Cookies.get('token')
            const response = await GlobalApi.getCardDetails(token, userid?.id);

            if (response?.success === true) {
                setCardData(response?.data?.wallets[0]);


            }
            else {
                toast(response?.error || "Error fetching card details")
                setCardData([]);

            }
        } catch (error) {

            console.log('error while fetching card', error);
            toast("Network error while fetching card details")
            setCardData([]);




        }
    }

    useEffect(() => {
        if (userid) { getCarddetails() }
    }, [userid])

    function formatToShortDate(isoDate) {
        const date = new Date(isoDate);

        const month = date.getUTCMonth() + 1; // Months are 0-indexed
        const day = date.getUTCDate();
        const year = date.getUTCFullYear() % 100; // Get last two digits

        return `${month}/${day}/${year}`;
    }



    return (
        <>

            <div className="relative w-full max-w-md xl:w-[94%] lg:w-[74%]    mt-5">
                {/* Left peach/orange accent */}

                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[85%] w-8 bg-[#FFCBA4] rounded-l-3xl" />

                {/* Right light blue accent */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[85%] w-8 bg-[#B3E5FC] rounded-r-3xl" />

                {/* Main card */}
                <div className="relative mx-4 bg-[#1a56ff] rounded-3xl p-6 shadow-lg overflow-hidden">
                    {/* Curved shape in top right */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#4169E1] rounded-bl-[100px]" />

                    {/* Content */}
                    <div className="relative z-10">
                        <h1 className="text-white text-2xl font-bold mb-6">Mowa</h1>

                        <div className="space-y-4">
                            <div>
                                <p className="text-white/80 text-sm">Balance</p>
                                <p className="text-white text-3xl font-bold">${CardData?.amount || 0}</p>
                            </div>

                            <div className="mt-8 flex flex-col">
                                <p className="text-white/80 text-xs">VALID FROM</p>
                                <div className="flex justify-between items-center flex-wrap">
                                    <p className="text-white">{date ? formatToShortDate(date) : "Date"}</p>
                                    <p className="text-white">{CardData?.Account_Number} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
