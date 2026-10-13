import { api } from "@/lib/http"

export const getBanners = async () => {
    const {data} = await api.get("/banners")
    return data
}