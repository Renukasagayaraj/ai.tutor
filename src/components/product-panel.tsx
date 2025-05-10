import ProductCard from "./product-card";
import { ResponseData } from "./producttype";

export default function ProductAnswerPanel(data: ResponseData) {
  //check if no answer has string value else display the data
  return (
    <div className="p-4 space-y-10 w-full">
      <div>
        <p className="text-foreground text-base">{data.message}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data.products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div>
        <p className="text-foreground text-base">{data.summary}</p>
      </div>
    </div>
  );
}
