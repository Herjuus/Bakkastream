"use client";

import { useState } from "react";

export default function DashboardPage() {
    const tabs = [
        {id: "account", label: "Account details"},
        {id: "password", label: "Password"},
    ]

    const [activeTab, setActiveTab] = useState(tabs[0].id)

    return(
        <div className="flex justify-center">
            <div className="container text-gray-100">
                <div className="rounded bg-gray-100 shadow-md p-4 flex flex-col text-gray-900">
                    <span className="text-2xl">Account</span>
                    <hr />
                    <div className="flex flex-col md:flex-row py-4">
                        <div className="md:w-[30%] w-full space-y-1">
                            {tabs.map((tab) => (
                                <button key={tab.id} onClick={() => {
                                    setActiveTab(tab.id)
                                }} className={`${activeTab === tab.id ? "bg-green-500 text-gray-100" : "hover:bg-gray-200 text-gray-900"} w-full text-lg flex justify-start p-1 rounded `}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="w-[0.08rem] mx-1 bg-gray-200"></div>
                        <div className="w-[70%] md:w-full ml-4">
                            {activeTab === "account" && (
                                <div className="">
                                    Account Details
                                </div>
                            )}
                            {activeTab === "password" && (
                                <div className="">
                                    Password Details
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
