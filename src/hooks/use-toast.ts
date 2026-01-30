"use client"

import toast from "react-hot-toast"

type Toast = {
    title?: React.ReactNode
    description?: React.ReactNode
    variant?: "default" | "destructive"
    className?: string
}

const toastFn = ({ title, description, variant, className }: Toast) => {
    const message = title as string
    
    if (variant === "destructive") {
        return toast.error(message, {
            className,
        })
    } else {
        return toast.success(message, {
            className,
        })
    }
}

function useToast() {
    return {
        toast: toastFn,
        dismiss: toast.dismiss,
    }
}

export { useToast, toastFn as toast }