import Link from "@/src/components/link"
import MainHeading from "@/src/components/main-heading"
import { Routes } from "@/src/constants/enums"
import Image from "next/image"

const Deals = () => {
    return (
        <section className="container mx-auto section-gap">
            <div
                data-aos="fade-down"
                data-aos-delay="200"
                className="flex flex-col items-center gap-2 mb-8">
                <MainHeading
                    title="Hot Deals 🔥"
                    subTitle=""
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                    data-aos="fade-right"
                    className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[oklch(0.65_0.25_35)] to-gray-700 p-8 md:p-12 shadow-md transition-all hover:shadow-lg"
                >
                    <div className="relative z-10 flex flex-col items-start gap-4 h-full justify-center">
                        <span className="font-bold tracking-widest text-primary-foreground/90 uppercase text-sm">
                            Weekly Special
                        </span>
                        <h3 className="font-extrabold text-4xl text-primary-foreground sm:text-5xl leading-none">
                            Buy 1 Get 1 Free
                        </h3>
                        <p className="max-w-[85%] text-lg font-medium text-primary-foreground/90 leading-relaxed">
                            Order any large pizza every Tuesday and <br className="hidden lg:block" />
                            get a second one of equal value for free!
                        </p>
                        <Link
                            href={`/${Routes.MENU}`}
                            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-bold text-primary transition-colors hover:bg-neutral-100"
                        >
                            Claim Offer
                        </Link>
                    </div>
                    <div className="absolute right-5 bottom-15 h-48 w-48 opacity-20 pointer-events-none">
                        <Image src="/fork.png" alt="Decoration" fill className="object-contain" />
                    </div>
                </div>
                <div
                    data-aos="fade-left"
                    data-aos-delay="200"
                    className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 md:p-12 shadow-md transition-all hover:shadow-lg"
                >
                    <div className="relative z-10 flex flex-col items-start gap-4 h-full justify-center">
                        <span className="font-bold tracking-widest text-primary uppercase text-sm">
                            Limited Time
                        </span>
                        <h3 className="font-extrabold text-4xl text-white sm:text-5xl leading-none">
                            Family Bundle
                        </h3>
                        <p className="max-w-[85%] text-lg font-medium text-gray-300 leading-relaxed">
                            2 Large Pizzas + 4 Garlic Knots + 2L Soda <br className="hidden lg:block" />
                            for only $34.99. Perfect for nights in!
                        </p>
                        <Link
                            href={`/${Routes.MENU}`}
                            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90"
                        >
                            Order Now
                        </Link>
                    </div>
                    <div className="absolute right-0 bottom-0 h-48 w-48 opacity-20 pointer-events-none">
                        <Image src="/Vector.png" alt="Decoration" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Deals