import { formatDistance } from "date-fns";

export const RelativeTime = ({ date }: { date: Date }) => {
  const format = formatDistance(date, new Date(), { addSuffix: true });

  return <span>{format}</span>;
};
