"use client"

import MainHeading from "@/src/components/main-heading"
import { Button } from "@/src/components/ui/button"
import { Clock, Send } from "lucide-react"

const ContactHero = () => {
    return (
        <section className="container mx-auto section-gap flex flex-col lg:flex-row gap-12 items-start">
            <div
                data-aos="fade-right"
                className="w-full lg:w-1/2 flex flex-col gap-6"
            >
                <div className="flex flex-col items-start justify-between gap-8">
                    <MainHeading title="Get in Touch with Our Team" subTitle="Contact Us" />
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                    Have a question about our menu, an upcoming event, or just want to tell us how much you loved your last slice? We&apos;re all ears. Send us a message and we&apos;ll get back to you faster than a pizza in our 450°C oven.
                </p>

                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm w-fit mt-4 border border-border/50">
                    <div className="bg-orange-100 p-3 rounded-full text-primary">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold text-foreground">Response Time</p>
                        <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                    </div>
                </div>
            </div>
            <div
                data-aos="fade-left"
                className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-border/50"
            >
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-bold text-sm">Your Name</label>
                            <input type="text" placeholder="John Doe" className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-bold text-sm">Email Address</label>
                            <input type="email" placeholder="john@example.com" className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-sm">Subject</label>
                        <input type="text" placeholder="How can we help?" className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-sm">Message</label>
                        <textarea rows={4} placeholder="Tell us more about your request..." className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"></textarea>
                    </div>

                    <Button className="w-full py-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                        Send Message <Send className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default ContactHero
