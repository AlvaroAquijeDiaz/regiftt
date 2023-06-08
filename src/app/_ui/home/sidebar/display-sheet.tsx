import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "~/app/_ui/shared/sheet";
import { Sidebar } from ".";

export const DisplaySheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="mt-0.5 rounded-md p-1 transition-all duration-100 hover:bg-neutral-200">
        <Menu size={20} />
      </SheetTrigger>

      <SheetContent position="left" size="default" className="">
        <SheetHeader>
          <Sidebar isSheet />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
