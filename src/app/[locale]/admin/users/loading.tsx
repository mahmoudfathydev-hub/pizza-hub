export default function UsersLoading() {
    return (
        <main>
            <section className="section-gap">
                <div className="container">
                    <div className="flex flex-col gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center gap-4 p-4 rounded-md bg-gray-100 animate-pulse"
                            >
                                <div className="md:flex justify-between flex-1">
                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
