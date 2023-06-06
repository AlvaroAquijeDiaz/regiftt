import { Suspense } from "react";
import { DetailsForm } from "~/app/_ui/profile/details";

export default function Profile() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Profile</h1>

      <Suspense>
        <DetailsForm />
      </Suspense>
    </section>
  );
}
