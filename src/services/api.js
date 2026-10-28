import axios from "axios"

const client = axios.create({
    baseURL: "http://localhost:3000"
})

export async function getProducts() {
    const { data } = await client("/products")

    return data
}

export async function getProduct(id) {
    const { data } = await client(`/products/${id}`)

    return data
}

export async function updateProduct(id, product) {
    const { data } = await client.patch(`/products/${id}`, product)

    return data
}

export async function deleteProduct(id) {
    const { data } = await client.delete(`/products/${id}`)

    return data
}

export async function postProduct(product) {
    const { data } = await client.post("/products", product)

    return data
}