export default function formatPrice(price) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(price)
}