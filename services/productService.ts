import { api } from "@/lib/http"

export const getProducts = async () => {
    const {data} = await api.get("/products")
    return data
}

export const getProductById = async (id:string) => {
    const {data} = await api.get(`/products/${id}`)
    return data
}