import api from '@/services/api'
import { LoginRequest, LoginResponse } from '../types/MutationsTypes'

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post('/auth/login', data)
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}