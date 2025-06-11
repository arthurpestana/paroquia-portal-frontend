import api from '@/services/api'
import { BannerRequest, ImageRequest, LoginRequest } from '../types/MutationsTypes'
import { BannerResponse, ImageResponse, LoginResponse } from '../types/QueriesTypes'

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

export const updateImage = async (id: string, file: File, data: ImageRequest): Promise<ImageResponse> => {
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