export const renderStars = (rating: number) => {
    const totalStars = 5;
    const filledStars = Array.from({ length: rating }, (_, index) => index);
    const emptyStars = Array.from({ length: totalStars - rating }, (_, index) => index);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {filledStars.map((_, index) => (
                <span key={`filled-${index}`} style={{ color: 'gold' }}>★</span>
            ))}
            {emptyStars.map((_, index) => (
                <span key={`empty-${index}`} style={{ color: 'gray' }}>☆</span>
            ))}
        </div>
    );
};
