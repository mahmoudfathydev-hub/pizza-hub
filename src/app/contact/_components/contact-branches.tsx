import { MapPin } from "lucide-react"
import MainHeading from "@/src/components/main-heading"

const branches = [
    {
        name: "Alexandria , Smouha",
        address: "12 Nahsr St, Crusty Valley, Alex",
        hours: "8:00 AM - 11:00 PM",
        delay: 0
    },
    {
        name: "El Hatabaa , Cairo",
        address: "45 Hatabaa St, Melting Point, Ca",
        hours: "11:00 AM - 1:00 PM",
        delay: 100
    },
    {
        name: "Kafr-ELDawar , EL Beheria",
        address: "Madkel Kafr ElDawar, EL Beheria, Br",
        hours: "11:00 AM - 2:00 AM",
        delay: 200
    }
]

const ContactBranches = () => {
    return (
        <section className="container mx-auto section-gap bg-neutral-50 rounded-[3rem] p-8 md:p-16">
            <div className="text-center mb-12" data-aos="fade-down">
                <MainHeading title="Find Us Nearby" subTitle="Our Branches" />
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                    We are expanding! Visit one of our convenient locations across the city.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {branches.map((branch, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={branch.delay}
                        className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-gray-100 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors text-gray-500">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">OPEN</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{branch.address}</p>
                        <hr className="border-dashed border-gray-200 mb-4" />
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-gray-400">Hours:</span>
                            <span className="font-bold">{branch.hours}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ContactBranches
