"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="noShadow"
                size="icon"
                className="border-2 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] bg-white dark:bg-zinc-800 h-12 w-12 rounded-md"
                disabled
            >
                <div className="h-5 w-5" />
            </Button>
        )
    }

    return (
        <Button
            variant="noShadow"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border-2 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-all bg-white dark:bg-zinc-800 h-12 w-12 rounded-md group"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500 group-hover:rotate-12" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400 group-hover:-rotate-12" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
