import ResponsiveImage from "./ResponsiveImage";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Author from "./Author";
import Title from "./Title";

export default function ArticleCard({
  data,
}: {
  data: {
    articleUrl: string;
    description: string;
    image: string;
    author: string;
    authorImg: string;
    authorUrl: string;
    title: string;
    institution: string;
    date: string;
  };
}) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!targetRef.current) return;

    const target = targetRef.current;

    ScrollTrigger.create({
      scroller: ".card-container",
      trigger: target,
      start: "center bottom",
      end: "center top",
      onEnter: () => target.classList.add("active"),
      onLeave: () => target.classList.remove("active"),
      onEnterBack: () => target.classList.add("active"),
      onLeaveBack: () => target.classList.remove("active"),
    });
  });

  return (
    <div
      ref={targetRef}
      className="snap-start h-dvh md:p-16 place-content-center">
      <div className="mx-auto bg-white h-auto max-h-full w-auto max-w-full overflow-hidden grid grid-cols-1 grid-rows-1 max-md:h-full max-md:w-full md:aspect-[3/4] xl:aspect-[4/3] md:rounded-lg shadow-2xl text-gray-50">
        <figure className="col-start-1 row-start-1">
          <ResponsiveImage
            src={data.image}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="col-start-1 row-start-1 h-full w-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

        <div className="col-start-1 row-start-1 p-4 pb-7 h-full flex flex-col justify-end">
          <Author
            author={data.author}
            authorImg={data.authorImg}
            authorUrl={data.authorUrl}
            institution={data.institution}
            date={data.date}
          />

          <Title
            title={data.title}
            description={data.description}
            articleUrl={data.articleUrl}
          />
        </div>
      </div>
    </div>
  );
}
