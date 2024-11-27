import { format } from 'date-fns'

export function formatDateTime(dateString: string) {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd/MM/yyyy')
    const formattedTime = format(date, 'HH\'h\'mm')
    
    return `${formattedDate} - ${formattedTime}`
}
