import CartFavoriteButtons from "../components/CartFavoriteButtons";
import ColorOptions from "../components/ColorOptions";
import Detail from "../components/Detail";
import ImageGallery from "../components/ImageGallery";
import PriceStockInfo from "../components/PriceStockInfo";
import Rating from "../components/Rating";
import SizeSelection from "../components/SizeSelection";
export default function Page() {
  return (
    <div className="w-4/5 mx-auto">
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <ImageGallery />

        {/* Right: Product Details */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-2xl font-semibold mb-2">
            Nike Initiator Class 2.2
          </h1>

          <Rating />
          <PriceStockInfo />
          <ColorOptions />
          <SizeSelection />
          <CartFavoriteButtons />
          <Detail />
        </div>
      </div>
    </div>
  );
}
