import { timeAgo } from "../utils/helpers";

export default function Author({
  author,
  authorImg,
  authorUrl,
  institution,
  date,
}: {
  author: string;
  authorImg: string;
  authorUrl: string;
  institution: string;
  date: string;
}) {
  return (
    <div className="relative">
      <a
        target="_blank"
        href={authorUrl}
        className="inline-flex gap-2 items-center group hover:text-gray-200">
        <div>
          <img
            className="w-10 aspect-square rounded-full"
            src={authorImg}
            alt=""
          />
        </div>
        <div>
          <p className="text-sm font-semibold">
            {author}{" "}
            <span>
              <svg
                className="stroke-2 -mt-1 inline w-4 h-4 stroke-white group-hover:stroke-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </p>
          <p className="text-xs font-light">{institution}</p>
        </div>
      </a>
      <span className="text-xs absolute -top-4 left-12">
        <small>{timeAgo(date)}</small>
      </span>
    </div>
  );
}
