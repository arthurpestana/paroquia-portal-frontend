'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useUpdatePageInUrl = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())

        if (page <= 1) {
            params.delete('page')
        } else {
            params.set('page', page.toString())
        }

        const newUrl = `${pathname}?${params.toString()}`
        
        if (newUrl !== `${pathname}?${searchParams.toString()}`) {
            router.push(newUrl)
        }
    }

    return updatePage
}
