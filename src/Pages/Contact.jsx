import React from 'react'

const Contact = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto mt-10">
                <h1 className="text-5xl font-bold mb-8 text-center text-red-600">Contact Us</h1>

                <div className="space-y-8 text-lg bg-neutral-900 p-8 rounded-xl border border-neutral-800">
                    <p className="border-b border-neutral-800 pb-4">
                        We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-red-500">Get in Touch</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-white">Email:</span> support@beatmusic.com
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-white">Phone:</span> +1 (555) 123-4567
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-white">Address:</span> 123 Music Lane, Audio City, AC 90210
                                </li>
                            </ul>
                        </div>

                        <div>
                            <form className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 focus:outline-none focus:border-red-600 transition" />
                                <input type="email" placeholder="Your Email" className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 focus:outline-none focus:border-red-600 transition" />
                                <textarea placeholder="Message" rows="4" className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 focus:outline-none focus:border-red-600 transition"></textarea>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition w-full">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
