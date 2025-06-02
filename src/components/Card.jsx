export default function Card({ balance, date }) {


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
                                <p className="text-white text-3xl font-bold">${balance}</p>
                            </div>

                            <div className="mt-8 flex flex-col">
                                <p className="text-white/80 text-xs">VALID FROM</p>
                                <div className="flex justify-between items-center flex-wrap">
                                    <p className="text-white">{formatToShortDate(date)}</p>
                                    <p className="text-white">•••• •••• •••• 1234</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
