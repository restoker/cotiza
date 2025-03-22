export default function formatPrice(price) {
    return new Intl.NumberFormat("es-Pe", {
        style: "currency",
        currency: "PEN",
    }).format(price)
}