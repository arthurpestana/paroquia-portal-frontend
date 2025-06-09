import api from '@/services/api'
import { LoginRequest } from '../types/MutationsTypes'
import { LoginResponse } from '../types/QueriesTypes'

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post('/auth/login', data)
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}