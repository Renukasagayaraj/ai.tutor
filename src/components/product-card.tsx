import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "./producttype";
import placeholderImg from "../assets/images.png";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row gap-4 p-2">
      <div className="max-w-[300px] w-full flex-none">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {product?.thumbnails?.length > 0 ? (
              product?.thumbnails?.map((thumbnail, index) => (
                <CarouselItem key={index}>
                  <img
                    src={thumbnail}
                    alt={product.name}
                    className="w-full object-fill h-full"
                  />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <img
                  src={placeholderImg}
                  alt="Product Thumbnail"
                  className="w-full object-fill h-full"
                />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="w-full flex justify-between flex-col">
        <div className="bg-background ">
          <div className="grid gap-2">
            <h3 className="text-xl font-semibold"> {product.name} </h3>
            <div
              className="prose-sm text-foreground line-clamp-3"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="flex items-center gap-4">
              {product.numberOfServings && (
                <div className="flex items-center gap-1">
                  <PillIcon className="w-4 h-4 text-primary text-sm" />
                  <span>{product.numberOfServings} Servings</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <BoxIcon className="w-4 h-4 text-primary text-sm" />
                <span>{product.brand}</span>
              </div>
              <div className="flex items-center gap-1">
                <TagIcon className="w-4 h-4 text-primary text-sm" />
                <span>${product.price}</span>
              </div>
            </div>
            <div className="grid gap-1">
              <span className="font-medium">Ingredients:</span>
              <ul className="list-disc pl-4 text-foreground text-sm">
                {product?.ingredients?.map((ingredients, index) => (
                  <li key={index}>{ingredients}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Link
            to={product.url}
            target="_blank"
            className={cn(
              "w-full mt-2",
              buttonVariants({ variant: "default", size: "lg" })
            )}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </Card>
  );
}

function BoxIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PillIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function TagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}
