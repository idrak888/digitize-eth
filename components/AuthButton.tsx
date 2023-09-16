import { ConnectWallet, useWallet } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function AuthButton() {
  const walletInstance = useWallet();

  const hiddenDialogButtonRef = useRef<HTMLButtonElement>(null);

  // States
  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getWalletInfo() {
      if (walletInstance) {
        const address = await walletInstance.getAddress();
        setWalletAddress(address);
        // Make API call to get user info if it exists
        const user = await axios.post("/api/getUser", {
          walletAddress,
        });

        if (user) {
          setName(user.data.name);
          setPhysicalAddress(user.data.physicalAddress);
          setEmail(user.data.email);
        } else {
          // Open onboarding dialog
          hiddenDialogButtonRef.current?.click();
        }
      }
    }

    getWalletInfo();
  }, [walletInstance]);

  return (
    <div>
      <Dialog>
        {
          <DialogTrigger asChild>
            <Button hidden variant="outline" ref={hiddenDialogButtonRef}>
              Update Profile
            </Button>
          </DialogTrigger>
        }
        <DialogContent className="sm:max-w-[425px]" asChild>
          <DialogHeader>
            <DialogTitle className="font-semibold">Setup Profile</DialogTitle>
            <DialogDescription>
              <DialogHeader>
                Fill in the form below to setup your profile!
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                  <Label>Name 👴🏼</Label>
                  <Input
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-row space-x-4">
                  <Label>Email 💌</Label>
                  <Input
                    placeholder="john@doe.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-row space-x-4">
                  <Label>Physical Address 📍</Label>
                  <Input
                    placeholder="123 Main St, New York, NY 10001"
                    onChange={(e) => setPhysicalAddress(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={
                      name === "" || email === "" || physicalAddress === ""
                    }
                    onClick={() => {
                      axios.post("/api/signin", {
                        walletAddress,
                        name,
                        email,
                        physicalAddress,
                      });
                    }}
                  >
                    Done!
                  </Button>
                </DialogFooter>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConnectWallet />
    </div>
  );
}
