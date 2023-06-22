import { formatDistance } from "date-fns";

export const RelativeTime = ({ date }: { date: Date }) => {
  const format = formatDistance(new Date(date).getTime(), new Date(), {
    addSuffix: true,
  });

  return <span>{format}</span>;
};
