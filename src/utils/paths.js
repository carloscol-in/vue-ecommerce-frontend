import { API_URL } from '@/utils/constants';

export const appendEndpointToHost = (endpoint) => `${API_URL}${endpoint}`;
