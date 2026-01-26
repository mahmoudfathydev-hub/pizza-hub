import { Button } from "@/src/components/ui/button"

const ContactNewsletter = () => {
    return (
        <section className="container mx-auto section-gap">
            <div
                data-aos="zoom-in"
                className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative"
            >
                {/* Background Pattern Hint */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="w-full md:w-1/2 z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Stay in the <br /> Loop
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        Join our newsletter to get exclusive deals, new secret menu alerts, and pizza-making tips.
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex items-center gap-4 z-10">
                    <div className="flex w-full max-w-md bg-neutral-800 rounded-full p-2 pl-6">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-neutral-500"
                        />
                        <Button
                            className="rounded-full px-8 py-6 font-bold text-base hover:bg-primary/90"
                        >
                            Subscribe Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactNewsletter
