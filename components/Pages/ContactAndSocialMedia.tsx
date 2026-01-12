"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { 
  FaLinkedin, FaGithub, FaFacebook, FaInstagram, 
  FaGoogle, FaBriefcase, FaPaperPlane, FaHandshake 
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
  const formSchema = z.object({
    fullname: z.string().min(2, {
      message: 'Fullname must be at least 6 characters.',
    }),
    email: z.string().email(),
    message: z.string().min(10, {
      message: 'Message must be at least 10 characters.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/rico-eriansyah/", icon: <FaLinkedin />, color: "bg-blue-600 text-white" },
    { name: "GitHub", url: "https://github.com/RicoEriansyah", icon: <FaGithub />, color: "bg-zinc-900 text-white" },
    { name: "Facebook", url: "https://facebook.com/ricoeriansyah", icon: <FaFacebook />, color: "bg-blue-500 text-white" },
    { name: "Instagram", url: "https://instagram.com/ricoeriansyah", icon: <FaInstagram />, color: "bg-pink-600 text-white" },
    { name: "Email", url: "mailto:ricoeriansyahm@gmail.com", icon: <FaGoogle />, color: "bg-red-500 text-white" },
    { name: "Fiverr", url: "https://fiverr.com/ricoeriansyah", icon: <FaHandshake />, color: "bg-green-500 text-white" },
    { name: "FastWork", url: "https://fastwork.com/ricoeriansyah", icon: <FaBriefcase />, color: "bg-sky-500 text-white" },
  ];

  return (
    <div className="w-full mx-auto px-4 py-16">
      
      <div className="text-center mb-12">
        <h1 className="inline-block text-4xl md:text-6xl font-black uppercase text-black dark:text-white bg-pink-400 border-4 border-black px-6 py-4 shadow-[8px_8px_0_0_#000] rotate-1 hover:rotate-0 transition-all">
          Let&apos;s Connect 🤙
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] p-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-black dark:bg-white flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                </div>
                
                <div className="mt-6 mb-8 text-center border-b-4 border-black dark:border-white pb-4">
                    <h2 className="text-3xl font-black uppercase">Send a Message</h2>
                    <p className="font-mono text-sm mt-2 font-bold text-gray-600 dark:text-gray-400">
                        I usually reply within 24 hours
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-bold uppercase bg-yellow-300 dark:bg-yellow-600 px-2 border-2 border-black dark:border-white text-black dark:text-white inline-block shadow-[2px_2px_0_0_#000]">
                                        Full Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter your name..." 
                                            {...field} 
                                            className="h-12 border-2 border-black dark:border-white rounded-none bg-zinc-50 dark:bg-zinc-800 text-lg shadow-[4px_4px_0_0_#000] focus-visible:ring-0 focus-visible:bg-white focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-bold text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-bold uppercase bg-cyan-300 dark:bg-cyan-700 px-2 border-2 border-black dark:border-white text-black dark:text-white inline-block shadow-[2px_2px_0_0_#000]">
                                        Email Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="name@example.com" 
                                            {...field} 
                                            className="h-12 border-2 border-black dark:border-white rounded-none bg-zinc-50 dark:bg-zinc-800 text-lg shadow-[4px_4px_0_0_#000] focus-visible:ring-0 focus-visible:bg-white focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-bold text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-bold uppercase bg-green-300 dark:bg-green-700 px-2 border-2 border-black dark:border-white text-black dark:text-white inline-block shadow-[2px_2px_0_0_#000]">
                                        Your Message
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            rows={5} 
                                            placeholder="Tell me about your project..." 
                                            {...field} 
                                            className="border-2 border-black dark:border-white rounded-none bg-zinc-50 dark:bg-zinc-800 text-lg shadow-[4px_4px_0_0_#000] focus-visible:ring-0 focus-visible:bg-white focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] transition-all resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-bold text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit" 
                            className="w-full h-14 bg-black text-white text-xl font-black uppercase tracking-widest border-2 border-black shadow-[6px_6px_0_0_#888] hover:bg-zinc-800 hover:shadow-[2px_2px_0_0_#888] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none cursor-pointer"
                        >
                            <FaPaperPlane className="mr-3" /> Send Message
                        </Button>
                    </form>
                </Form>
            </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="bg-purple-200 dark:bg-purple-900 border-4 border-black dark:border-white p-8 shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] h-full flex flex-col justify-center">
                <h2 className="text-3xl font-black text-black dark:text-black uppercase text-center mb-8 bg-white border-2 border-black p-2 shadow-[4px_4px_0_0_#000] transform -rotate-1">
                    Find Me Online 🌐
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                        <Button
                            key={index}
                            asChild
                            className={`
                                h-16 w-full justify-start px-6 text-lg font-bold uppercase border-2 border-black dark:border-white rounded-none shadow-[4px_4px_0_0_#000] 
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

                <div className="mt-8 bg-black p-4 text-white text-center font-mono text-sm border-2 border-white shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                   <p className="font-bold">LOCATION: INDONESIA</p>
                   <p className="text-zinc-400">STATUS: OPEN FOR WORK</p>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
}