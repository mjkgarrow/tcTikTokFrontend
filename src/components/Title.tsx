export default function Title({
  title,
  description,
  articleUrl,
}: {
  title: string;
  description: string;
  articleUrl: string;
}) {
  return (
    <a
      href={articleUrl}
      target="_blank"
      className="hover:text-gray-200 text-gray-50 group">
      <p className="text-base font-bold line-clamp-2 w-fit">
        {title}
        <span>
          <svg
            className="stroke-2 ml-2 -mt-1 inline w-6 h-6 stroke-white group-hover:stroke-gray-300"
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
      <p className=" mt-2 text-xs line-clamp-3">{description}</p>
    </a>
  );
}
