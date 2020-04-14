import { EDIT_USER } from './types'

export const editUser = (property, value) => {

    console.log(property, value)
    switch (property) {
        case 'email':
            return {
                type: EDIT_USER,
                payload: {
                    field: 'email',
                    value
                }
            }
        case 'name':  
            return {
                type: EDIT_USER,
                payload: {
                    field: 'name',
                    value
                }
            }
        default:
            return {
                type: EDIT_USER,
                payload: {

                }
            }
    }
   
}