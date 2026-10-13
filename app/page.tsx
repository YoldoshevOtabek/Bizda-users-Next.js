import Banner from "@/features/banner/Banner";
import Brands from "@/features/brands/Brands";
import { getBrands } from "@/services/brandService";






export default async function Page() {
  const response = await getBrands();

  const brands = Array.isArray(response)
    ? response
    : response?.data ?? [];
  return (
    <div>
      <Banner/>
      <Brands brands={brands}/>
      
    </div>
  )
}
