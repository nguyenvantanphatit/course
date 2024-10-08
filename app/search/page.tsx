"use client"
import FilterPage from '@/components/FilterPage';
import React, { useState } from 'react'

export default function page() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index: any) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqs = [
        {
            question: "How this theme is different from others in market?",
            answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
        {
            question: "What is your policy on distribution of Devjoy assets?",
            answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
        {
            question: "How can I contribute to Devjoy?",
            answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
        {
            question: "What other themes do you have?",
            answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
    ];
    return (
        <div>
            <FilterPage />
            <section>
                {/* Container */}
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
                    {/* Title */}
                    <h2 className="text-3xl font-bold md:text-5xl">Portfolio</h2>
                    <p className="msm:text-base mb-8 mt-4 text-sm text-gray-500 md:mb-12 lg:mb-16">
                        Lorem ipsum dolor sit amet elit ut aliquam
                    </p>
                    {/* Content */}
                    <div className="mx-auto grid justify-items-stretch gap-4 md:grid-cols-2 lg:gap-10">
                        {/* Item */}
                        <a
                            href="#"
                            className="relative flex h-[300px] items-end [grid-area:1/1/3/2] md:h-auto"
                        >
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                                alt=""
                                className="inline-block h-full w-full rounded-lg object-cover"
                            />
                            <div className="absolute bottom-5 left-5 flex flex-col justify-center rounded-lg bg-white px-8 py-4">
                                <p className="text-sm font-medium sm:text-xl">Project Name</p>
                                <p className="text-sm sm:text-base">Microsoft</p>
                            </div>
                        </a>
                        {/* Item */}
                        <a href="#" className="relative flex h-[300px] items-end">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                                alt=""
                                className="inline-block h-full w-full rounded-lg object-cover"
                            />
                            <div className="absolute bottom-5 left-5 flex flex-col justify-center rounded-lg bg-white px-8 py-4">
                                <p className="text-sm font-medium sm:text-xl">Project Name</p>
                                <p className="text-sm sm:text-base">Paypal</p>
                            </div>
                        </a>
                        {/* Item */}
                        <a href="#" className="relative flex h-[300px] items-end">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                                alt=""
                                className="inline-block h-full w-full rounded-lg object-cover"
                            />
                            <div className="absolute bottom-5 left-5 flex flex-col justify-center rounded-lg bg-white px-8 py-4">
                                <p className="text-sm font-medium sm:text-xl">Project Name</p>
                                <p className="text-sm sm:text-base">Airbnb</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
            <section>
                {/* Container */}
                <div className="mx-auto w-full px-5 py-12 md:px-10 md:py-16 lg:py-20 max-w-7xl">
                    {/* Heading */}
                    <h2 className="mx-auto mb-12 text-center text-3xl max-w-sm md:max-w-xl font-bold md:mb-28 md:text-5xl">
                        Webflow Development made easy for you
                    </h2>
                    {/* How it Works */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        {/* Item */}
                        <div className="bg-gray-100 w-full p-6 rounded-lg  flex items-center lg:-mt-30 relative">
                            <div className="flex-shrink-0 bg-gray-300 p-4 rounded-full">
                                <svg
                                    width="32"
                                    height="33"
                                    viewBox="0 0 32 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.2"
                                        d="M29 21.1836L16.4875 28.2836C16.3374 28.3635 16.17 28.4053 16 28.4053C15.83 28.4053 15.6626 28.3635 15.5125 28.2836L3 21.1836L16 13.8086L29 21.1836Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M29 13.1846L16 20.5596L3 13.1846L15.5125 6.08455C15.6626 6.00467 15.83 5.96289 16 5.96289C16.17 5.96289 16.3374 6.00467 16.4875 6.08455L29 13.1846Z"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M29 21.1836L16.4875 28.2836C16.3374 28.3635 16.17 28.4053 16 28.4053C15.83 28.4053 15.6626 28.3635 15.5125 28.2836L3 21.1836L16 13.8086L29 21.1836Z"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M29 13.1836V21.1836"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M3 13.1836V21.1836"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16 20.5586V28.4086"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16 5.95898V13.809"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-semibold">
                                    Sign up effortlessly in just 2 minutes
                                </p>
                            </div>
                            <div className="absolute top-0 right-10 bg-white border-2 border-gray-100 rounded-full h-8 w-8 flex items-center justify-center -mt-4 -mr-4">
                                <span className="text-gray-700 font-bold">1</span>
                            </div>
                        </div>
                        {/* Item */}
                        <div className="bg-gray-100 w-full p-6 rounded-lg  flex items-center md:transform md:translate-y-14 relative">
                            <div className="flex-shrink-0 bg-gray-300 p-4 rounded-full">
                                <svg
                                    width="32"
                                    height="33"
                                    viewBox="0 0 32 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.2"
                                        d="M29 21.1836L16.4875 28.2836C16.3374 28.3635 16.17 28.4053 16 28.4053C15.83 28.4053 15.6626 28.3635 15.5125 28.2836L3 21.1836L16 13.8086L29 21.1836Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M29 13.1846L16 20.5596L3 13.1846L15.5125 6.08455C15.6626 6.00467 15.83 5.96289 16 5.96289C16.17 5.96289 16.3374 6.00467 16.4875 6.08455L29 13.1846Z"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M29 21.1836L16.4875 28.2836C16.3374 28.3635 16.17 28.4053 16 28.4053C15.83 28.4053 15.6626 28.3635 15.5125 28.2836L3 21.1836L16 13.8086L29 21.1836Z"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M29 13.1836V21.1836"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M3 13.1836V21.1836"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16 20.5586V28.4086"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16 5.95898V13.809"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-semibold">
                                    Submit as many tasks as you like
                                </p>
                            </div>
                            <div className="absolute top-0 right-10 bg-white border-2 border-gray-100 rounded-full h-8 w-8 flex items-center justify-center -mt-4 -mr-4">
                                <span className="text-gray-700 font-bold">2</span>
                            </div>
                        </div>
                        {/* Item */}
                        <div className="bg-gray-100 w-full p-6 rounded-lg  flex items-center md:transform md:translate-y-28 relative">
                            <div className="flex-shrink-0 bg-gray-300 p-4 rounded-full">
                                <svg
                                    width="32"
                                    height="33"
                                    viewBox="0 0 32 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.2"
                                        d="M29 21.1836L16.4875 28.2836C16.3374 28.3635 16.17 28.4053 16 28.4053C15.83 28.4053 15.6626 28.3635 15.5125 28.2836L3 21.1836L16 13.8086L29 21.1836Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M29 13.1846L16 20.5596L3 13.1846L15.5125 6.08455C15.6626 6.00467 15.83 5.96289 16 5.96289C16.17 5.96289 16.3374 6.00467 16.4875 6.08455L29 13.1846Z"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M29 21.1836L16.4875 28.2836C16.3374 28.3635 16.17 28.4053 16 28.4053C15.83 28.4053 15.6626 28.3635 15.5125 28.2836L3 21.1836L16 13.8086L29 21.1836Z"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M29 13.1836V21.1836"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M3 13.1836V21.1836"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16 20.5586V28.4086"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16 5.95898V13.809"
                                        stroke="black"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-semibold">
                                    Receive your first task done in 24 hours
                                </p>
                            </div>
                            <div className="absolute top-0 right-10 bg-white border-2 border-gray-100 rounded-full h-8 w-8 flex items-center justify-center -mt-4 -mr-4">
                                <span className="text-gray-700 font-bold">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <header>
                {/* Hero top */}
                <div className="bg-gray-300">
                    {/* Container */}
                    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
                        {/* Title */}
                        <h1 className="mb-6 max-w-3xl text-4xl font-bold md:mb-10 md:text-6xl lg:mb-12">
                            The Website You Want Without The Dev Time.
                        </h1>
                        {/* Buttons */}
                        <div className="flex items-stretch">
                            <a
                                href="#"
                                className="mr-6 rounded-md bg-black px-8 py-4 text-center font-semibold text-white lg:mr-8"
                            >
                                Get Started
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-md border border-solid border-black bg-white px-6 py-3 font-bold"
                            >
                                <img
                                    src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94d411e6cf99_Vector%20(6).svg"
                                    alt=""
                                    className="mr-2 max-h-4 w-5"
                                />
                                <p>Download App</p>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Hero bottom */}
                <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
                    {/* Component */}
                    <div className="relative flex max-w-7xl flex-col gap-4 lg:flex-row lg:justify-end">
                        {/* Arrow down */}
                        <a href="#" className="absolute bottom-0 left-0">
                            <img
                                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946f0be6cfa0_Frame%2048040.svg"
                                alt=""
                                className="hidden lg:inline-block"
                            />
                        </a>
                        <div className="max-w-xl lg:mr-[520px] lg:max-w-xs">
                            {/* Title */}
                            <h3 className="text-2xl font-bold md:text-3xl">Introduction</h3>
                            {/* Divider */}
                            <div className="my-6 w-16 border-t border-black"></div>
                            <p className="text-sm text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse varius enim in eros elementum tristique. Duis cursus,
                                mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
                                libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
                                lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                            </p>
                        </div>
                        {/* Image */}
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                            alt=""
                            className="relative bottom-0 right-0 mt-12 w-[480px] object-cover lg:absolute lg:mt-0 lg:h-[480px]"
                        />
                    </div>
                </div>
            </header>


            <section>
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 md:px-10 md:py-20">
                    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
                        <p className="font-inter mb-2 text-center text-sm font-medium">
                            FAQs
                        </p>
                        <h2 className="text-3xl lg:text-5xl font-bold text-black">
                            Frequently Asked Questions
                        </h2>
                        <p className="font-inter mt-4 max-w-xl px-5 text-base font-light text-gray-500 lg:max-w-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                            purus sit amet luctus venenatis, lectus magna fringilla urna
                        </p>
                    </div>
                    <div className="mt-10 flex w-full flex-col">
                        {faqs.map((faq, index) => (
                            <>
                                <div
                                    key={index}
                                    className="relative my-3 w-full rounded-md px-12 py-8"
                                >
                                    <div className="max-w-2xl">
                                        <h2
                                            className="text-xl font-bold text-black"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            {faq.question}
                                        </h2>
                                        {openFAQ === index && (
                                            <p className="font-inter mt-4 text-base font-light text-gray-500">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        className="absolute right-5 top-9 focus:outline-none"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="12" cy="12" r="12" fill="white"></circle>
                                            <path
                                                d="M7.04688 11.9999H16.9469"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>
                                            {openFAQ !== index && (
                                                <path
                                                    d="M12 7.05005V16.95"
                                                    stroke="black"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                <div className="mr-4 ml-8 border border-gray-200"></div>
                            </>
                        ))}
                    </div>
                    <p className="font-inter mx-auto mt-12 text-center text-base text-gray-500">
                        Can’t find the answer you’re looking for? Reach out to our
                        <a href="#" className="text-black font-bold">
                            {" "}
                            customer support team.
                        </a>
                    </p>
                </div>
            </section>
            <section>
                {/* Container */}
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
                    {/* Title */}
                    <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-4xl lg:mb-16 lg:text-5xl">
                        Make every step user-centric
                    </h2>
                    {/* Content */}
                    <div className="flex flex-col gap-8 lg:flex-row lg:gap-15">
                        {/* Image */}
                        <img
                            alt=""
                            src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                            className="inline-block h-[350px] max-h-lg w-full max-w-md object-cover"
                        />
                        {/* List */}
                        <div className="flex flex-col gap-8 lg:justify-between">
                            <a
                                className="flex max-w-md rounded-md p-4 text-gray-500 [box-shadow:rgba(0,_0,_0,_0.05)_0px_0px_10px]"
                                href="#w-tabs-1-data-w-pane-0"
                            >
                                <img
                                    alt=""
                                    src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                                    className="inline-block h-16 w-16 rounded-full object-cover"
                                />
                                <div className="ml-4 flex flex-col">
                                    <p className="font-semibold">Flexibility</p>
                                    <p className="text-sm text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                                        aliquam, purus sit.
                                    </p>
                                </div>
                            </a>
                            <a
                                className="flex max-w-md rounded-md border-l-4 border-black p-4 text-gray-500 [box-shadow:rgba(0,_0,_0,_0.05)_0px_0px_10px]"
                                href="#w-tabs-1-data-w-pane-1"
                            >
                                <img
                                    alt=""
                                    src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                                    className="inline-block h-16 w-16 rounded-full object-cover"
                                />
                                <div className="ml-4 flex flex-col">
                                    <p className="font-semibold">Scale</p>
                                    <p className="text-sm text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                                        aliquam, purus sit.
                                    </p>
                                </div>
                            </a>
                            <a
                                className="flex max-w-md rounded-md p-4 text-gray-500 [box-shadow:rgba(0,_0,_0,_0.05)_0px_0px_10px]"
                                href="#w-tabs-1-data-w-pane-2"
                            >
                                <img
                                    alt=""
                                    src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                                    className="inline-block h-16 w-16 rounded-full object-cover"
                                />
                                <div className="ml-4 flex flex-col">
                                    <p className="font-semibold">Support</p>
                                    <p className="text-sm text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                                        aliquam, purus sit.
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {/* Container */}
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:py-20">
                    {/* Component */}
                    <div className="grid gap-16 md:grid-cols-2 md:gap-4 lg:grid-cols-[1fr_340px_1fr]">
                        {/* Item */}
                        <div className="flex flex-col items-start gap-16 [grid-area:1/1/2/3] md:gap-24 md:[grid-area:1/1/2/2] lg:[grid-area:1/1/2/2]">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-gray-100 p-2.5">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M23.5625 12.5938H18.9922C19.8544 11.4151 20.317 9.99158 20.3125 8.53125C20.3098 6.70042 19.5813 4.94535 18.2867 3.65076C16.9921 2.35617 15.2371 1.62769 13.4062 1.625C13.1908 1.625 12.9841 1.7106 12.8317 1.86298C12.6794 2.01535 12.5938 2.22201 12.5938 2.4375V7.00781C11.4151 6.14564 9.99158 5.683 8.53125 5.6875C6.70042 5.69019 4.94535 6.41867 3.65076 7.71326C2.35617 9.00785 1.62769 10.7629 1.625 12.5938C1.625 12.8092 1.7106 13.0159 1.86298 13.1683C2.01535 13.3206 2.22201 13.4062 2.4375 13.4062H7.00781C6.14564 14.5849 5.683 16.0084 5.6875 17.4688C5.69019 19.2996 6.41867 21.0546 7.71326 22.3492C9.00785 23.6438 10.7629 24.3723 12.5938 24.375C12.8092 24.375 13.0159 24.2894 13.1683 24.137C13.3206 23.9847 13.4062 23.778 13.4062 23.5625V18.9922C14.5849 19.8544 16.0084 20.317 17.4688 20.3125C19.2996 20.3098 21.0546 19.5813 22.3492 18.2867C23.6438 16.9921 24.3723 15.2371 24.375 13.4062C24.375 13.1908 24.2894 12.9841 24.137 12.8317C23.9847 12.6794 23.778 12.5938 23.5625 12.5938ZM8.53125 7.3125C9.30767 7.30929 10.0751 7.47897 10.7777 7.80923C11.4804 8.13949 12.1008 8.62204 12.5938 9.22188V11.7812H3.31094C3.50677 10.5369 4.14007 9.4033 5.09698 8.58416C6.05389 7.76502 7.27162 7.31411 8.53125 7.3125ZM17.4688 18.6875C16.6923 18.6907 15.9249 18.521 15.2223 18.1908C14.5196 17.8605 13.8992 17.378 13.4062 16.7781V14.2188H22.6891C22.4932 15.4631 21.8599 16.5967 20.903 17.4158C19.9461 18.235 18.7284 18.6859 17.4688 18.6875Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <p className="max-w-xs text-gray-500 md:max-w-[256px]">
                                        Say goodbye to payment headaches with SecurePay!
                                    </p>
                                </div>
                                <h3 className="text-2xl font-bold md:text-3xl">
                                    Maximize Productivity. Organize Your Time.
                                </h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-gray-100 p-2.5">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M23.5625 12.5938H18.9922C19.8544 11.4151 20.317 9.99158 20.3125 8.53125C20.3098 6.70042 19.5813 4.94535 18.2867 3.65076C16.9921 2.35617 15.2371 1.62769 13.4062 1.625C13.1908 1.625 12.9841 1.7106 12.8317 1.86298C12.6794 2.01535 12.5938 2.22201 12.5938 2.4375V7.00781C11.4151 6.14564 9.99158 5.683 8.53125 5.6875C6.70042 5.69019 4.94535 6.41867 3.65076 7.71326C2.35617 9.00785 1.62769 10.7629 1.625 12.5938C1.625 12.8092 1.7106 13.0159 1.86298 13.1683C2.01535 13.3206 2.22201 13.4062 2.4375 13.4062H7.00781C6.14564 14.5849 5.683 16.0084 5.6875 17.4688C5.69019 19.2996 6.41867 21.0546 7.71326 22.3492C9.00785 23.6438 10.7629 24.3723 12.5938 24.375C12.8092 24.375 13.0159 24.2894 13.1683 24.137C13.3206 23.9847 13.4062 23.778 13.4062 23.5625V18.9922C14.5849 19.8544 16.0084 20.317 17.4688 20.3125C19.2996 20.3098 21.0546 19.5813 22.3492 18.2867C23.6438 16.9921 24.3723 15.2371 24.375 13.4062C24.375 13.1908 24.2894 12.9841 24.137 12.8317C23.9847 12.6794 23.778 12.5938 23.5625 12.5938ZM8.53125 7.3125C9.30767 7.30929 10.0751 7.47897 10.7777 7.80923C11.4804 8.13949 12.1008 8.62204 12.5938 9.22188V11.7812H3.31094C3.50677 10.5369 4.14007 9.4033 5.09698 8.58416C6.05389 7.76502 7.27162 7.31411 8.53125 7.3125ZM17.4688 18.6875C16.6923 18.6907 15.9249 18.521 15.2223 18.1908C14.5196 17.8605 13.8992 17.378 13.4062 16.7781V14.2188H22.6891C22.4932 15.4631 21.8599 16.5967 20.903 17.4158C19.9461 18.235 18.7284 18.6859 17.4688 18.6875Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <p className="max-w-xs text-gray-500 md:max-w-[256px]">
                                        Say goodbye to payment headaches with SecurePay!
                                    </p>
                                </div>
                                <h3 className="text-2xl font-bold md:text-3xl">
                                    Maximize Productivity. Organize Your Time.
                                </h3>
                            </div>
                        </div>
                        {/* Item */}
                        <div
                            className="w-86 mt-4 h-88 bg-contain bg-[50%_100%] bg-no-repeat [grid-area:3/1/4/3] sm:mt-12 sm:h-[560px] sm:w-full md:mt-0 lg:[grid-area:1/2/1/3]"
                            style={{
                                backgroundImage:
                                    'url("https://assets.website-files.com/6458c625291a94a195e6cf3a/647b2f0c0e6afb25726156ec_Column.svg")',
                            }}
                        ></div>
                        {/* Item */}
                        <div className="flex flex-col items-start gap-16 [grid-area:2/1/3/3] md:gap-24 md:[grid-area:1/2/2/3] lg:[grid-area:1/3/4/4]">
                            <div className="flex flex-col gap-4 md:items-end">
                                <div className="flex items-center gap-4 md:flex-row-reverse">
                                    <div className="rounded-full bg-gray-100 p-2.5">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M23.5625 12.5938H18.9922C19.8544 11.4151 20.317 9.99158 20.3125 8.53125C20.3098 6.70042 19.5813 4.94535 18.2867 3.65076C16.9921 2.35617 15.2371 1.62769 13.4062 1.625C13.1908 1.625 12.9841 1.7106 12.8317 1.86298C12.6794 2.01535 12.5938 2.22201 12.5938 2.4375V7.00781C11.4151 6.14564 9.99158 5.683 8.53125 5.6875C6.70042 5.69019 4.94535 6.41867 3.65076 7.71326C2.35617 9.00785 1.62769 10.7629 1.625 12.5938C1.625 12.8092 1.7106 13.0159 1.86298 13.1683C2.01535 13.3206 2.22201 13.4062 2.4375 13.4062H7.00781C6.14564 14.5849 5.683 16.0084 5.6875 17.4688C5.69019 19.2996 6.41867 21.0546 7.71326 22.3492C9.00785 23.6438 10.7629 24.3723 12.5938 24.375C12.8092 24.375 13.0159 24.2894 13.1683 24.137C13.3206 23.9847 13.4062 23.778 13.4062 23.5625V18.9922C14.5849 19.8544 16.0084 20.317 17.4688 20.3125C19.2996 20.3098 21.0546 19.5813 22.3492 18.2867C23.6438 16.9921 24.3723 15.2371 24.375 13.4062C24.375 13.1908 24.2894 12.9841 24.137 12.8317C23.9847 12.6794 23.778 12.5938 23.5625 12.5938ZM8.53125 7.3125C9.30767 7.30929 10.0751 7.47897 10.7777 7.80923C11.4804 8.13949 12.1008 8.62204 12.5938 9.22188V11.7812H3.31094C3.50677 10.5369 4.14007 9.4033 5.09698 8.58416C6.05389 7.76502 7.27162 7.31411 8.53125 7.3125ZM17.4688 18.6875C16.6923 18.6907 15.9249 18.521 15.2223 18.1908C14.5196 17.8605 13.8992 17.378 13.4062 16.7781V14.2188H22.6891C22.4932 15.4631 21.8599 16.5967 20.903 17.4158C19.9461 18.235 18.7284 18.6859 17.4688 18.6875Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <p className="max-w-xs text-gray-500 md:max-w-[256px] md:text-right">
                                        Say goodbye to payment headaches with SecurePay!
                                    </p>
                                </div>
                                <h3 className="text-2xl font-bold md:text-right md:text-3xl">
                                    Maximize Productivity. Organize Your Time.
                                </h3>
                            </div>
                            <div className="flex flex-col gap-4 md:items-end">
                                <div className="flex items-center gap-4 md:flex-row-reverse">
                                    <div className="rounded-full bg-gray-100 p-2.5">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M23.5625 12.5938H18.9922C19.8544 11.4151 20.317 9.99158 20.3125 8.53125C20.3098 6.70042 19.5813 4.94535 18.2867 3.65076C16.9921 2.35617 15.2371 1.62769 13.4062 1.625C13.1908 1.625 12.9841 1.7106 12.8317 1.86298C12.6794 2.01535 12.5938 2.22201 12.5938 2.4375V7.00781C11.4151 6.14564 9.99158 5.683 8.53125 5.6875C6.70042 5.69019 4.94535 6.41867 3.65076 7.71326C2.35617 9.00785 1.62769 10.7629 1.625 12.5938C1.625 12.8092 1.7106 13.0159 1.86298 13.1683C2.01535 13.3206 2.22201 13.4062 2.4375 13.4062H7.00781C6.14564 14.5849 5.683 16.0084 5.6875 17.4688C5.69019 19.2996 6.41867 21.0546 7.71326 22.3492C9.00785 23.6438 10.7629 24.3723 12.5938 24.375C12.8092 24.375 13.0159 24.2894 13.1683 24.137C13.3206 23.9847 13.4062 23.778 13.4062 23.5625V18.9922C14.5849 19.8544 16.0084 20.317 17.4688 20.3125C19.2996 20.3098 21.0546 19.5813 22.3492 18.2867C23.6438 16.9921 24.3723 15.2371 24.375 13.4062C24.375 13.1908 24.2894 12.9841 24.137 12.8317C23.9847 12.6794 23.778 12.5938 23.5625 12.5938ZM8.53125 7.3125C9.30767 7.30929 10.0751 7.47897 10.7777 7.80923C11.4804 8.13949 12.1008 8.62204 12.5938 9.22188V11.7812H3.31094C3.50677 10.5369 4.14007 9.4033 5.09698 8.58416C6.05389 7.76502 7.27162 7.31411 8.53125 7.3125ZM17.4688 18.6875C16.6923 18.6907 15.9249 18.521 15.2223 18.1908C14.5196 17.8605 13.8992 17.378 13.4062 16.7781V14.2188H22.6891C22.4932 15.4631 21.8599 16.5967 20.903 17.4158C19.9461 18.235 18.7284 18.6859 17.4688 18.6875Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <p className="max-w-xs text-gray-500 md:max-w-[256px] md:text-right">
                                        Say goodbye to payment headaches with SecurePay!
                                    </p>
                                </div>
                                <h3 className="text-2xl font-bold md:text-right md:text-3xl">
                                    Maximize Productivity. Organize Your Time.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {/* Container */}
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
                    {/* Title */}
                    <h2 className="mx-auto mb-8 max-w-3xl text-center text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
                        Smooth Process. Transformative Outcomes.
                    </h2>
                    {/* Content */}
                    <div className="flex flex-col items-center justify-center bg-contain bg-center pt-10 bg-[url('https://assets.website-files.com/6458c625291a94a195e6cf3a/648825fca218588cb636c341_Group%2048114.png')]">
                        <div className="flex flex-col justify-around gap-4 sm:flex-row">
                            <a
                                className="rounded-md border border-solid border-gray-300 bg-gray-100 p-6 text-black"
                                href="#w-tabs-2-data-w-pane-0"
                            >
                                <h5 className="mb-2 text-xl font-bold">
                                    Personalized Consultation
                                </h5>
                                <p className="text-sm">
                                    We start by understanding your unique goals and challenges,
                                    laying the foundation for a tailored strategy.
                                </p>
                            </a>
                            <a
                                className="rounded-md border border-solid border-gray-300 bg-white p-6 text-black"
                                tabIndex={-1}
                                href="#w-tabs-2-data-w-pane-1"
                            >
                                <h5 className="mb-2 text-xl font-bold">Strategy Development</h5>
                                <p className="text-sm">
                                    We start by understanding your unique goals and challenges,
                                    laying the foundation for a tailored strategy.
                                </p>
                            </a>
                            <a className="rounded-md border border-solid border-gray-300 bg-white p-6 text-black">
                                <h5 className="mb-2 text-xl font-bold">Analysis and Reporting</h5>
                                <p className="text-sm">
                                    We start by understanding your unique goals and challenges,
                                    laying the foundation for a tailored strategy.
                                </p>
                            </a>
                        </div>
                        <div className="max-w-5xl">
                            <img
                                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6488257b75d6a7b950248536_Group%2048113.svg"
                                alt=""
                                className="mt-16 inline-block"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
