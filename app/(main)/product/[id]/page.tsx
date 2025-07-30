import CartFavoriteButtons from "../components/CartFavoriteButtons";
import ColorOptions from "../components/ColorOptions";
import Detail from "../components/Detail";
import ImageGallery from "../components/ImageGallery";
import PriceStockInfo from "../components/PriceStockInfo";
import Rating from "../components/Rating";
import apiClient from "@/utils/apiClient";
import SizeSelection from "../components/SizeSelection";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await apiClient.get(`/api/products/${id}`);
  // need to populate colors from response.data.product.variants
  const filteredColors = response.data.product.variants
    .filter((vari: any) => vari._id !== id)
    .map(({ _id, options }) => ({
      _id,
      color: options.color,
    }));
  const sameVariantSizes = response.data.product.variants
    .filter((v) => {
      return v.options?.color === response.data.options.color;
    })
    .map((variant) => ({ size: variant.options.size }));
  return (
    <div className="w-full h-screen mx-auto text-black bg-white">
      <div className="w-4/5  mx-auto p-6 flex flex-col md:flex-row gap-10">
        <ImageGallery images={response.data.images} />

        {/* Right: Product Details */}
        <div className="flex-1 ">
          <h1 className="text-2xl font-semibold mb-2">
            {response.data.product.name}
          </h1>

          <Rating />
          <PriceStockInfo
            price={response.data.price}
            stock={response.data.stock}
          />
          <ColorOptions colors={filteredColors} />
          <SizeSelection sizes={sameVariantSizes} />
          <CartFavoriteButtons variantId={response.data._id} />
          <Detail description={response.data.product.description} />
        </div>
      </div>
    </div>
  );
}
