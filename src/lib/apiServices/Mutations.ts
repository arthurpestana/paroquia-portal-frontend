import api from '@/services/api'
import { BannerRequest, ContactRequest, ImageRequest, LoginRequest, PriestRequest, MassTimeRequest, PastoralRequest, EventRequest } from '../types/MutationsTypes'
import { BannerResponse, ContactResponse, ImageResponse, LoginResponse, PriestResponse, MassTimeResponse, PastoralResponse, EventResponse } from '../types/QueriesTypes'

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post('/users/auth/login', data)
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}

export const createBanner = async (data: BannerRequest): Promise<BannerResponse> => {
    try {
        const response = await api.post('/banners', data)
        return response.data
    } catch (error) {
        console.error('Failed to create banner:', error)
        throw error
    }
}

export const updateBanner = async (id: string, data: BannerRequest): Promise<BannerResponse> => {
    try {
        const response = await api.put(`/banners/${id}`, data)
        return response.data
    } catch (error) {
        console.error('Failed to update banner:', error)
        throw error
    }
}

export const deleteBanner = async (id: string): Promise<void> => {
    try {
        await api.delete(`/banners/${id}`)
    } catch (error) {
        console.error('Failed to delete banner:', error)
        throw error
    }
}

export const setActiveBanner = async (id: string, newActive: boolean): Promise<BannerResponse> => {
    try {
        const response = await api.put(`/banners/${id}/active`, { isActive: newActive })
        return response.data
    } catch (error) {
        console.error('Failed to set banner active status:', error)
        throw error
    }
}

export const createImage = async (file: File, data: ImageRequest): Promise<ImageResponse> => {
    try {
        const formData = new FormData()
        formData.append('file', file)

        // Adiciona as propriedades de data no formData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString())
            }
        })

        const response = await api.post('/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data
    } catch (error) {
        console.error('Failed to upload image:', error)
        throw error
    }
}

export const updateImage = async (id: string, file: File | null, data: ImageRequest): Promise<ImageResponse> => {
    try {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            // Adiciona as propriedades de data no formData
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString())
                }
            })

            const response = await api.put(`/images/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            return response.data
        }

        const response = await api.put(`/images/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.data
    } catch (error) {
        console.error('Failed to update image:', error)
        throw error
    }
}

export const deleteImage = async (id: string): Promise<void> => {
    try {
        await api.delete(`/images/${id}`)
    } catch (error) {
        console.error('Failed to delete image:', error)
        throw error
    }
}

export const setActiveContact = async (id: string, newActive: boolean): Promise<ContactResponse> => {
    try {
        const response = await api.put(`/contacts/${id}/active`, { isActive: newActive })
        return response.data
    } catch (error) {
        console.error('Failed to set contact active status:', error)
        throw error
    }
}

export const createContact = async (data: ContactRequest): Promise<ContactResponse> => {
    try {
        const response = await api.post('/contacts', data)
        return response.data
    } catch (error) {
        console.error('Failed to create contact:', error)
        throw error
    }
}

export const updateContact = async (id: string, data: ContactRequest): Promise<ContactResponse> => {
    try {
        const response = await api.put(`/contacts/${id}`, data)
        return response.data
    } catch (error) {
        console.error('Failed to update contact:', error)
        throw error
    }
}

export const deleteContact = async (id: string): Promise<void> => {
    try {
        await api.delete(`/contacts/${id}`)
    } catch (error) {
        console.error('Failed to delete contact:', error)
        throw error
    }
}

export const createMassTime = async (data: MassTimeRequest): Promise<MassTimeResponse> => {
    try {
        const response = await api.post('/massTimes', data)
        return response.data
    } catch (error) {
        console.error('Failed to create mass time:', error)
        throw error
    }
}

export const updateMassTime = async (id: string, data: MassTimeRequest): Promise<MassTimeResponse> => {
    try {
        const response = await api.put(`/massTimes/${id}`, data)
        return response.data
    } catch (error) {
        console.error('Failed to update mass time:', error)
        throw error
    }
}

export const deleteMassTime = async (id: string): Promise<void> => {
    try {
        await api.delete(`/massTimes/${id}`)
    } catch (error) {
        console.error('Failed to delete mass time:', error)
        throw error
    }
}

export const setActiveMassTime = async (id: string, newActive: boolean): Promise<MassTimeResponse> => {
    try {
        const response = await api.put(`/massTimes/${id}/active`, { isActive: newActive })
        return response.data
    } catch (error) {
        console.error('Failed to set mass time active status:', error)
        throw error
    }
}

export const createPastoral = async (data: PastoralRequest): Promise<PastoralResponse> => {
    try {
        const response = await api.post('/pastorals', data)
        return response.data
    } catch (error) {
        console.error('Failed to create pastoral:', error)
        throw error
    }
}

export const updatePastoral = async (id: string, data: PastoralRequest): Promise<PastoralResponse> => {
    try {
        const response = await api.put(`/pastorals/${id}`, data)
        return response.data
    } catch (error) {
        console.error('Failed to update pastoral:', error)
        throw error
    }
}

export const deletePastoral = async (id: string): Promise<void> => {
    try {
        await api.delete(`/pastorals/${id}`)
    } catch (error) {
        console.error('Failed to delete pastoral:', error)
        throw error
    }
}

export const setActivePastoral = async (id: string, newActive: boolean): Promise<PastoralResponse> => {
    try {
        const response = await api.put(`/pastorals/${id}/active`, { isActive: newActive })
        return response.data
    } catch (error) {
        console.error('Failed to set pastoral active status:', error)
        throw error
    }
}

export const createEvent = async (data: EventRequest): Promise<EventResponse> => {
    try {
        const response = await api.post('/events', data)
        return response.data
    } catch (error) {
        console.error('Failed to create event:', error)
        throw error
    }
}

export const updateEvent = async (id: string, data: EventRequest): Promise<EventResponse> => {
    try {
        const response = await api.put(`/events/${id}`, data)
        return response.data
    } catch (error) {
        console.error('Failed to update event:', error)
        throw error
    }
}

export const deleteEvent = async (id: string): Promise<void> => {
    try {
        await api.delete(`/events/${id}`)
    } catch (error) {
        console.error('Failed to delete event:', error)
        throw error
    }
}

export const setActiveEvent = async (id: string, newActive: boolean): Promise<EventResponse> => {
    try {
        const response = await api.put(`/events/${id}/active`, { isActive: newActive })
        return response.data
    } catch (error) {
        console.error('Failed to set event active status:', error)
        throw error
    }
}

export const createPriest = async (data: PriestRequest): Promise<PriestResponse> => {
    try {
        const response = await api.post('/priests', data)
        return response.data
    } catch (error) {
        console.error('Failed to create priest:', error)
        throw error
    }
}

export const updatePriest = async (id: string, data: PriestRequest): Promise<PriestResponse> => {
    try {
        const response = await api.put(`/priests/${id}`, data)
        return response.data
    } catch (error) {
        console.error('Failed to update priest:', error)
        throw error
    }
}

export const deletePriest = async (id: string): Promise<void> => {
    try {
        await api.delete(`/priests/${id}`)
    } catch (error) {
        console.error('Failed to delete priest:', error)
        throw error
    }
}

export const setActivePriest = async (id: string, newActive: boolean): Promise<PriestResponse> => {
    try {
        const response = await api.put(`/priests/${id}/active`, { isActive: newActive })
        return response.data
    } catch (error) {
        console.error('Failed to set priest active status:', error)
        throw error
    }
}
