import { Picture, Source } from "react-imgix";

export default function ResponsiveImage({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <Picture>
      {/* Crop for large screens */}
      <Source
        src={src}
        width={1600}
        height={900}
        imgixParams={{ crop: "entropy,faces", fit: "crop", ar: "4:3" }}
        htmlAttributes={{ media: "(min-width: 1024px)" }}
      />
      {/* Crop for tablets */}
      <Source
        src={src}
        width={800}
        height={800}
        imgixParams={{ fit: "entropy,faces", ar: "1:1" }}
        htmlAttributes={{ media: "(min-width: 768px)" }}
      />
      {/* Crop for mobile */}
      <Source
        src={src}
        width={600}
        height={1067}
        imgixParams={{ crop: "entropy,faces", fit: "crop", ar: "9:16" }}
        htmlAttributes={{ media: "(max-width: 767px)" }}
      />
      {/* Fallback image */}
      <img src={src} alt="Responsive" className={className} />
    </Picture>
  );
}
