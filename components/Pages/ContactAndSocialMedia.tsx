"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    FaDiscord, FaGithub, FaFacebook, FaInstagram,
    FaGoogle, FaBriefcase, FaTelegram, FaTiktok,
    FaWhatsapp, FaWifi, FaPaperPlane
} from "react-icons/fa";

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea';

export function ContactAndSocialMedia() {
    // Validasi diperbaiki agar lebih profesional namun tetap teknis
    const formSchema = z.object({
        fullname: z.string().min(2, { message: 'Identity string is too short.' }),
        email: z.string().email({ message: 'Invalid address protocol (Email).' }),
        message: z.string().min(10, { message: 'Payload is too small (min. 10 chars).' }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { fullname: "", email: "", message: "" },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const recipient = "mdesta416@gmail.com";
        const subject = encodeURIComponent(`[INCOMING TRANSMISSION]: ${values.fullname}`);
        const body = encodeURIComponent(`SENDER_IDENTITY: ${values.fullname}\nRETURN_ADDRESS: ${values.email}\n\nDATA_PAYLOAD:\n${values.message}`);
        window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, '_blank');
    }

    const socialLinks = [
        { name: "TikTok", url: "https://www.tiktok.com/@Levianzy", icon: <FaTiktok />, color: "bg-black text-white" },
        { name: "GitHub", url: "https://github.com/Leviansze", icon: <FaGithub />, color: "bg-zinc-900 text-white" },
        { name: "Facebook", url: "https://www.facebook.com/leviannzy", icon: <FaFacebook />, color: "bg-blue-500 text-white" },
        { name: "Instagram", url: "https://www.instagram.com/mhmmddsta.__", icon: <FaInstagram />, color: "bg-pink-600 text-white" },
        { name: "Email", url: "mailto:mdesta416@gmail.com", icon: <FaGoogle />, color: "bg-red-500 text-white" },
        { name: "Whatsapp", url: "https://wa.me/6285885195439", icon: <FaWhatsapp />, color: "bg-green-500 text-white" },
        { name: "Telegram", url: "https://t.me/cLepiu", icon: <FaTelegram />, color: "bg-lime-500 text-white" },
        { name: "Discord", url: "https://discord.com/users/1457924168652689695", icon: <FaDiscord />, color: "bg-sky-500 text-white" },
    ];

    return (
        <div className="relative w-full mx-auto py-16 font-mono overflow-hidden">

            <div className="text-center mb-16 relative">
                <div className="absolute w-full h-1 bg-black dark:bg-white top-1/2 -z-10"></div>
                <h1 className="inline-flex items-center gap-3 text-3xl md:text-5xl font-black uppercase text-black bg-pink-400 border-4 border-black dark:border-white px-8 py-6 shadow-[8px_8px_0_0_#fff] dark:shadow-[8px_8px_0_0_#888] rotate-1 hover:rotate-0 transition-all hover:scale-105">
                    <FaWifi className="animate-ping text-2xl" /> CONNECTIVITY_HUB
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 max-w-7xl mx-auto">

                <div className="w-full lg:w-1/2">
                    <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] p-8 relative">
                        <div className="absolute top-0 left-0 w-full h-10 bg-black dark:bg-white flex items-center justify-between px-4 border-b-4 border-black dark:border-white">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                            </div>
                            <span className="text-white dark:text-black font-bold text-xs uppercase">Message_Protocol.exe</span>
                        </div>

                        <div className="mt-8 mb-8 text-center border-b-4 border-dashed border-black dark:border-white pb-6">
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white">Transmission Form</h2>
                            <p className="font-mono text-sm mt-2 font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 p-2 border-2 border-black dark:border-white inline-block">
                                STATUS: LISTENING ON PORT 443
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-black uppercase bg-yellow-300 dark:bg-yellow-600 px-2 border-2 border-black dark:border-white text-black dark:text-white inline-block shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]">
                                                SENDER_ID (NAME)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Muhammad Desta"
                                                    {...field}
                                                    className="h-12 border-2 border-black dark:border-white rounded-none bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white text-lg shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] focus-visible:ring-0 focus-visible:bg-white dark:focus-visible:bg-zinc-700 focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] transition-all"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-bold text-red-500 bg-red-100 px-1 border border-red-500 inline-block text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-black uppercase bg-cyan-300 dark:bg-cyan-700 px-2 border-2 border-black dark:border-white text-black dark:text-white inline-block shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]">
                                                RETURN_ADDRESS (EMAIL)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="sender@network.com"
                                                    {...field}
                                                    className="h-12 border-2 border-black dark:border-white rounded-none bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white text-lg shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] focus-visible:ring-0 focus-visible:bg-white dark:focus-visible:bg-zinc-700 focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] transition-all"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-bold text-red-500 bg-red-100 px-1 border border-red-500 inline-block text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-black uppercase bg-green-300 dark:bg-green-700 px-2 border-2 border-black dark:border-white text-black dark:text-white inline-block shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]">
                                                DATA_PAYLOAD (MESSAGE)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={5}
                                                    placeholder="Initialize transmission content..."
                                                    {...field}
                                                    className="border-2 border-black dark:border-white rounded-none bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white text-lg shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] focus-visible:ring-0 focus-visible:bg-white dark:focus-visible:bg-zinc-700 focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] transition-all resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-bold text-red-500 bg-red-100 px-1 border border-red-500 inline-block text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-black dark:bg-zinc-900 text-white dark:text-white text-xl font-black uppercase tracking-widest border-2 border-black dark:border-white shadow-[6px_6px_0_0_#888] dark:shadow-[6px_6px_0_0_#fff] hover:bg-green-600 dark:hover:bg-green-400 hover:shadow-[2px_2px_0_0_#000] dark:hover:shadow-[2px_2px_0_0_#fff] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-md cursor-pointer flex items-center justify-center gap-2 group"
                                >
                                    <FaPaperPlane className="group-hover:animate-ping" /> EXECUTE_SEND()
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                    <div className="bg-purple-200 dark:bg-purple-900 border-4 border-black dark:border-white p-8 shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] h-full flex flex-col">

                        <h2 className="text-2xl md:text-3xl font-black text-black uppercase text-center mb-8 bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000] transform rotate-1">
                            🌐 GLOBAL_NODES
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {socialLinks.map((social, index) => (
                                <Button
                                    key={index}
                                    asChild
                                    className={`
                                h-16 w-full justify-start px-6 text-sm font-bold uppercase border-2 border-black dark:border-white rounded-md shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]
                                ${social.color} hover:brightness-110 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all
                            `}
                                >
                                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                                        <span className="text-2xl border-r-2 border-black/20 pr-3">
                                            {social.icon}
                                        </span>
                                        {social.name}
                                    </a>
                                </Button>
                            ))}
                        </div>

                        <div className="mt-8 bg-black p-4 text-white text-center font-mono text-xs md:text-sm border-2 border-white shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                            <p className="font-bold text-green-400">&gt; CURRENT_COORDS: INDONESIA_REGION</p>
                            <p className="text-zinc-400 mt-1">&gt; STATUS: OPEN_FOR_WORK = TRUE</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}