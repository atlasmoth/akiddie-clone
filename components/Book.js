import { useRouter } from "next/router";
import Link from "next/link";

export default function Book({ data }) {
  return (
    <div className="message">
      <div className="message-heading">
        <img src={`/${data.image}`} alt="poster" />
        <h4>{data.title}</h4>
      </div>
      <p>Price {data.price || "N/A"}</p>
      <p>{data.description}</p>
      <Link href="/monograph/[monograph]" as={`/monograph/${data._id}`}>
        <a className="read">See More</a>
      </Link>
    </div>
  );
}
