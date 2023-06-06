import { WishProductCard } from "~/app/_ui/home/wish-product-card";
import { getWishBySlug } from "~/server/routes/getWishBySlug";

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
