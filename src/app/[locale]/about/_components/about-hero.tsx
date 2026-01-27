import Image from "next/image"

const AboutHero = () => {
    return (
        <section className="container mx-auto section-gap flex flex-col md:flex-row items-center gap-12">
            <div
                data-aos="fade-right"
                className="w-full md:w-1/2 relative h-125 bg-gray-200 rounded-3xl overflow-hidden flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400 font-bold text-xl">
                    <Image src="/heroabout.png" alt="hero" fill className="object-contain"/>
                </div>
            </div>

            <div
                data-aos="fade-left"
                className="w-full md:w-1/2 flex flex-col gap-6"
            >
                <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold w-fit">
                    EST. 1998
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground">
                    Crafting the <br />
                    Perfect <span className="text-primary">Wood-Fired</span> Legacy
                </h1>

                <div className="flex flex-col gap-4 text-muted-foreground text-lg leading-relaxed">
                    <p>
                        Our journey began in a small corner of the city with nothing but a hand-built stone oven and a family recipe passed down through three generations. We believed that pizza was not just fast food — it was an art form.
                    </p>
                    <p>
                        Every morning, our master chefs arrive before dawn to start the fire using premium seasoned oak. This commitment to traditional methods ensures that every crust we serve has that signature smoky char and perfect airy texture that only a 450°C stone oven can produce.
                    </p>
                    <p>
                        Today, PizzaHub remains committed to those same humble beginnings: fresh dough, handmade sauce, and the warmth of a community gathered around a hearth.
                    </p>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="font-bold text-foreground">50k+</span>
                        <span className="text-sm text-neutral-500">Happy Customers</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHero
