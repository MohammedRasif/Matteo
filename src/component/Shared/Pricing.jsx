"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoCheckmarkCircleSharp, IoCheckmarkDoneSharp } from "react-icons/io5"
import img from "../image/Vector 63.png"
import { IoMdArrowBack } from "react-icons/io"
import { NavLink } from "react-router-dom"
import Faq from "./Faq"
import Footer from "../Footer/Footer"

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState("monthly")

    const monthlyPlans = [
        {
            name: "Free User",
            limit: "3",
            limitUnit: "Query/Day",
            features: [
                "Includes general source databases",
                "Limited free queries per bot day",
                "No access to specific, company, or private databases",
            ],
        },
        {
            name: "Standard User",
            limit: "No limit,",
            limitUnit: "Query/Day",
            features: [
                "Full access to general source databases",
                "Unlimited queries per bot daily",
                "Potential limitations on account sharing",
            ],
        },
        {
            name: "Premium User",
            limit: "No limit,",
            limitUnit: "Query/Day",
            features: [
                "Includes general source databases",
                "Unlimited queries per bot daily",
                "Company-Specific Personal Database",
            ],
        },
    ]

    const yearlyPlans = [
        {
            name: "Free User",
            limit: "3",
            limitUnit: "Query/Day",
            features: [
                "Includes general source databases",
                "Limited free queries per bot day",
                "No access to specific, company, or private databases",
            ],
        },
        {
            name: "Standard User",
            limit: "No limit,",
            limitUnit: "Query/Day",
            features: [
                "Full access to general source databases",
                "Unlimited queries per bot daily",
                "Potential limitations on account sharing",
                "20% discount compared to monthly",
            ],
        },
        {
            name: "Premium User",
            limit: "No limit,",
            limitUnit: "Query/Day",
            features: [
                "Includes general source databases",
                "Unlimited queries per bot daily",
                "Company-Specific Personal Database",
                "25% discount compared to monthly",
            ],
        },
    ]

    const plans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans

    return (
        <section className="pt-10 roboto">
            <div className="container mx-auto px-4">
                <div >

                    <NavLink to="/">
                        <button className="flex items-center space-x-1 bg-[#309ED7] text-white px-7 py-2 rounded-md cursor-pointer">
                            <IoMdArrowBack size={22} />

                            <h1 className="text-[20px]">Back</h1>
                        </button>
                    </NavLink>
                </div>
                <h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5  tracking-wider">PRICING</h1>

                {/* Toggle */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                    <div className="flex bg-white rounded-md shadow-sm ">
                        <button
                            className={`px-6 py-2 rounded-l-md text-base font-medium transition-colors cursor-pointer ${billingCycle === "monthly" ? "bg-[#0077B6] text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                                }`}
                            onClick={() => setBillingCycle("monthly")}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-6 py-2 rounded-r-md text-base font-medium transition-colors cursor-pointer ${billingCycle === "yearly" ? "bg-[#0077B6] text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                                }`}
                            onClick={() => setBillingCycle("yearly")}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={`${billingCycle}-${plan.name}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full border border-gray-300 roboto"
                            >
                                <div className="relative">
                                    <div className="w-3/4 rounded-r-lg my-10 relative">
                                        <img src={img} alt="Plan background" className="w-full h-auto" />
                                        <h3 className="absolute top-4 left-4 text-slate-700 font-bold text-xl z-10">{plan.name}</h3>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-6">
                                        <div className="flex items-end">
                                            <span className="text-4xl font-bold text-slate-700">{plan.limit}</span>
                                            <span className="text-base text-slate-500 ml-2 mb-1">{plan.limitUnit}</span>
                                        </div>
                                        <p className="text-slate-500 text-base mt-1">Measurable results</p>
                                    </div>

                                    <button className="w-full bg-[#309ED7] text-white py-3 rounded-md mb-4 hover:bg-[#00669e] transition-colors cursor-pointer text-lg font-semibold">
                                        Select
                                    </button>

                                    <p className="text-slate-500 text-base mb-6">Contact us for more Details</p>

                                    <div className="mb-4 flex-grow">
                                        <div className="flex items-center mb-3">
                                            <span className="text-slate-700 font-semibold text-lg">Features</span>
                                            <div className="ml-2 text-[#0077B6]">
                                                <IoCheckmarkCircleSharp size={20} />
                                            </div>
                                        </div>

                                        <ul className="space-y-3 text-base text-slate-600">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start">
                                                    <IoCheckmarkDoneSharp className="text-[#0077B6] mt-1 mr-2 flex-shrink-0" size={20} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <Faq />
            <Footer/>
        </section>
    )
}

export default Pricing