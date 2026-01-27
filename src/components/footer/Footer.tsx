"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "@/src/hooks/use-translations";

const Footer = () => {
    const { t } = useTranslations('footer')
    
    return (
        <footer className="bg-white pt-16 pb-8">
            <div className="container">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <span className="text-orange-500 font-bold text-xl">{t.brand.name}</span>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                {t.brand.description}
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-6">{t.links.title}</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                                        {t.links.menu}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                                        {t.links.offers}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                                        {t.links.about}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                                        {t.links.gifts}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-6">{t.contact.title}</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <MapPin className="text-orange-500 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-500">{t.contact.address}</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="text-orange-500 shrink-0" size={20} />
                                    <span className="text-gray-500">{t.contact.phone}</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="text-orange-500 shrink-0" size={20} />
                                    <span className="text-gray-500">{t.contact.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-6">{t.hours.title}</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between text-gray-500">
                                    <span>{t.hours.monThu}:</span>
                                    <span>{t.hours.monThuTime}</span>
                                </li>
                                <li className="flex justify-between text-orange-500 font-medium">
                                    <span>{t.hours.friSat}:</span>
                                    <span>{t.hours.friSatTime}</span>
                                </li>
                                <li className="flex justify-between text-gray-500">
                                    <span>{t.hours.sunday}:</span>
                                    <span>{t.hours.sundayTime}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} PizzaHub Inc. {t.copyright}
                        </p>
                        <span className="text-black">
                            <a href="https://mahmoudfathy.vercel.app" target="_blank" rel="noopener noreferrer">
                                {t.madeBy} <span className="text-primary font-bold">ENG Mahmoud Fathy</span>
                            </a>
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
