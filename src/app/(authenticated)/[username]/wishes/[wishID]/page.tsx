import { getWishBySlug } from "~/server/routes/getWishBySlug";
import { WishProductCard } from "~/ui/home/wish-product-card";

export default async function WishIDByUsername({
  params,
}: {
  params: {
    wishID: string;
    username: string;
  };
}) {
  const wish = await getWishBySlug(params.wishID);

  return (
    <div>
      <WishProductCard wish={wish} />
    </div>
  );
}
