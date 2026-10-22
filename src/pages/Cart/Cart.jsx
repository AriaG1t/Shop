import CartItem from "../../components/CartItem/CartItem";
import Container from "../../components/Container/Container";
import { useAppContext } from "../../context/AppContext";

function Cart() {

    const { cartItems } = useAppContext()

    const totalPrice = cartItems.reduce((total, item) => {
        const fullPrice = item.product.price * item.qty

        return total + fullPrice
    }, 0)

    const discountPrice = cartItems.reduce((total, item) => {
        const fullPrice = item.product.price * (item.product.discount / 100) * item.qty

        return total + fullPrice
    }, 0)

    const finalPrice = cartItems.reduce((total, item) => {
        if (item.product.discount === 0) {
            const fullPrice = item.product.price * item.qty
            return total + fullPrice
        } else {
            const fullPrice = (item.product.price * (1 - item.product.discount / 100)) * item.qty
            return total + fullPrice
        }
    }, 0)

    return (
        <Container>
            <h2 className="font-mono text-xl mt-3">Cart</h2>
            <div className="grid justify-center gap-x-5 gap-y-8 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {
                    cartItems.length > 0 ?
                        cartItems.map(item => (
                            <CartItem item={item} />
                        ))
                        : <p className="mt-5 text-xl font-mono">No Products</p>
                }
            </div>
            <div className="mt-20 font-mono">
                <h2 className="text-xl mb-3">Receipt</h2>
                <div className="max-w-100 text-lg text-mist-800 p-5 rounded shadow-md border-5 border-mist-500 bg-mist-400 m-auto">
                    <p>Total Price: {totalPrice.toFixed(2)}$</p>
                    <p className="text-red-700">Total DisCount: {discountPrice.toFixed(2)}$</p>
                    <p className="text-green-800">Final Price: {finalPrice.toFixed(2)}$</p>
                </div>
            </div>
        </Container>
    )
}

export default Cart;