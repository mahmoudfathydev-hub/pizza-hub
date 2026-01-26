"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
    return (
        <footer className="bg-white pt-16 pb-8">
            <div className="container">
                <div className="container mx-auto px-4 mb-16">
                    <div className="bg-[#111] rounded-3xl p-8 md:p-16 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-white max-w-lg">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
                                <p className="text-gray-400">
                                    Join our newsletter to get exclusive deals, new secret menu alerts, and pizza-making tips.
                                </p>
                            </div>
                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-[#222] text-white px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-80"
                                />
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg">
                                    Subscribe Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <span className="text-orange-500 font-bold text-xl">PizzaHub</span>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Authentic wood-fired pizzas delivered straight to your door. Taste the tradition in every slice.
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
                            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                            <ul className="space-y-4">
                                {['Our Menu', 'Special Offers', 'About Us', 'Gift Cards'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <MapPin className="text-orange-500 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-500">123 Pizza Street, Crusty Valley, NY 10001</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="text-orange-500 shrink-0" size={20} />
                                    <span className="text-gray-500">(555) 123-4567</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="text-orange-500 shrink-0" size={20} />
                                    <span className="text-gray-500">hello@pizzahub.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-6">Opening Hours</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between text-gray-500">
                                    <span>Mon - Thu:</span>
                                    <span>11:00 - 22:00</span>
                                </li>
                                <li className="flex justify-between text-gray-500">
                                    <span className="text-orange-500 font-medium">Fri - Sat:</span>
                                    <span className="text-orange-500 font-medium">11:00 - 23:30</span>
                                </li>
                                <li className="flex justify-between text-gray-500">
                                    <span>Sunday:</span>
                                    <span>12:00 - 21:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} PizzaHub Inc. All rights reserved.
                        </p>
                        <span className="text-black">
                            <a href="https://mahmoudfathy.vercel.app" target="_blank" rel="noopener noreferrer">
                                Made with 🍕 <span className="text-primary font-bold">ENG Mahmoud Fathy</span>
                            </a>
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
