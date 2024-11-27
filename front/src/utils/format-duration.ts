export function formatDuration(duration: string) {
    const totalSeconds = parseInt(duration.replace('s', ''), 10)
    const minutes = Math.round(totalSeconds / 60)
    return `${minutes} min`
}
