import { api } from "@/lib/http"

export const getBrands = async () => {
    const {data} = await api.get("/brands")
    return data
}

