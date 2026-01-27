import { Mail, MapPin, Phone } from "lucide-react"

const ContactInfo = () => {
    return (
        <section className="container mx-auto section-gap">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Call Us */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="0"
                    className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border/50"
                >
                    <div className="bg-orange-100 p-4 rounded-full text-primary mb-2">
                        <Phone className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Call Us</h3>
                    <p className="text-muted-foreground">Direct line to our restaurant floor.</p>
                    <p className="text-xl font-bold text-primary">(555) 123-4567</p>
                </div>

                {/* Visit Us */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border/50"
                >
                    <div className="bg-orange-100 p-4 rounded-full text-primary mb-2">
                        <MapPin className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Visit Us</h3>
                    <p className="text-muted-foreground">Come grab a seat by the oven.</p>
                    <p className="text-xl font-bold text-primary max-w-[200px]">123 Pizza Street, NY 10001</p>
                </div>

                {/* Email Us */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border/50"
                >
                    <div className="bg-orange-100 p-4 rounded-full text-primary mb-2">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Email Us</h3>
                    <p className="text-muted-foreground">For events and catering inquiries.</p>
                    <p className="text-xl font-bold text-primary">hello@pizzahub.com</p>
                </div>
            </div>
        </section>
    )
}

export default ContactInfo
