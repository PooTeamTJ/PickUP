import { MESSAGE } from './types';

export const clearMessages = () => {
    return {
        type: MESSAGE,
        payload: {
            type: '',
            message: ''
        }
    }
}