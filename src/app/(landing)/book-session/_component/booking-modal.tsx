import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BookingDialog({
  price,
  email,
  formid,
  setEmail,
}: {
  price: number;
  email: string;
  formid: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{`Book for ${price}$`}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking Email</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="email" className="text-right">
              Zoom email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full"
              containerClasses="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                const form = document.getElementById(formid) as HTMLFormElement;
                if (form) {
                  form.submit(); // Programmatically trigger form submission
                }
              }}
            >
              Book
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
