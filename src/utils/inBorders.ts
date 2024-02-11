export default function InBorders(a: string, borders: { min: string, max: string }) {
    return (a <= borders.max) && (a >= borders.min);
}