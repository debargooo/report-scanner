import React from 'react'
import  { useState, useRef, useEffect } from "react";

  import { format } from "date-fns";
  import { DayPicker } from "react-day-picker";
  

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        age: '',
        gender: '',
        contact: '',
        password: '',
        confirmPassword: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "dob") {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setFormData(prevState => ({ ...prevState, age: age }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
    };

    const handleDateSelect = (date) => {
        if (date) {
            setSelectedDate(date);
            setIsOpen(false);
            const formattedDate = format(date, "yyyy-MM-dd");
            setFormData({ ...formData, dob: formattedDate });
            
            const today = new Date();
            let age = today.getFullYear() - date.getFullYear();
            const monthDiff = today.getMonth() - date.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
                age--;
            }
            setFormData(prevState => ({ ...prevState, age: age }));
        }
    };

   

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div class=" bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
                <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                    class="w-32 mx-auto" />
            </div>
            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div class="w-full flex-1 mt-8">

                    <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} class="mx-auto max-w-xs">
                    <input onChange={handleChange}
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text" placeholder="Name" />
                        <input onChange={handleChange}
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                       
            {/* Input Field */}
            <div className="relative" ref={pickerRef}>
                <input
                    type="text"
                    placeholder="Select a date"
                    value={selectedDate ? format(selectedDate, "PPP") : ""}
                    readOnly
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"

                    onFocus={() => setIsOpen(true)}
                />

                {/* Show DatePicker when isOpen is true */}
                {isOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md z-50">
                        <DayPicker 
                           mode="single"
                           selected={selectedDate}
                           onSelect={handleDateSelect}
                           showOutsideDays
                           className="border-0"
                           classNames={{
                             caption: "flex justify-center py-2 mb-4 relative items-center",
                             caption_label: "text-sm font-medium text-gray-900",
                             nav: "flex justify-evenly",
                             nav_button:
                               "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                             nav_button_previous: "absolute left-1.5",
                             nav_button_next: "absolute right-1.5",
                             table: "w-full border-collapse",
                             head_row: "flex font-medium text-gray-900",
                             head_cell: "m-0.5 w-9 font-normal text-sm",
                             row: "flex w-full mt-2",
                             cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                             day: "h-9 w-9 p-0 font-normal",
                             day_range_end: "day-range-end",
                             day_selected:
                               "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                             day_today: "rounded-md bg-gray-200 text-gray-900",
                             day_outside:
                               "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                             day_disabled: "text-gray-500 opacity-50",
                             day_hidden: "invisible",
                           }}
                        />
                    </div>
                )}

        </div>
                       
                        <input 
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="radio" placeholder="Gender" />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text" placeholder="Phone Number" />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Confirm Password" />
                        <button
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign Up
                            </span>
                        </button>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by templatana's
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                <img src='https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg'/>
            </div>
        </div>
    </div>
</div>
  )
}

export default Register