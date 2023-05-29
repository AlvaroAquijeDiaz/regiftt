import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "~/ui/shared/sheet";
import { Sidebar } from ".";

export const DisplaySheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={20} className="mt-1" />
      </SheetTrigger>

      <SheetContent position="left" size="default" className="">
        <SheetHeader>
          <Sidebar isSheet />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
