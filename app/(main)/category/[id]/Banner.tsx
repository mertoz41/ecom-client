import Image from "next/image";
export default function Banner({
  title,
  bgImg,
}: {
  title: string;
  bgImg: string;
}) {
  return (
    <div className="relative w-full mb-10 h-[250px]">
      <Image
        src={`http://localhost:3001/uploads/categories/${bgImg}`}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-[24px] font-semibold text-center z-10">
          {title}
        </h1>
      </div>
    </div>
  );
}
