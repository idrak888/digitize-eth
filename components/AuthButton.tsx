import { ConnectWallet, useWallet } from "@thirdweb-dev/react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function AuthButton() {
  const walletInstance = useWallet();

  // States
  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Modal functions
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    async function getWalletInfo() {
      if (walletInstance) {
        const address = await walletInstance.getAddress();
        setWalletAddress(address);

        // Make API call to get user info if it exists
        const res = await axios.post<User | null>("/api/auth/getUser", {
          walletAddress,
        });
        const user = res.data;
        if (user) {
          setName(user.name);
          setPhysicalAddress(user.physicalAddress);
          setEmail(user.email);
        } else {
          setIsOpen(true);
        }
      }
    }

    getWalletInfo();
  }, [walletInstance]);

  return (
    <div>
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <button
            hidden
            type="button"
            onClick={openModal}
            className="hidden rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Open dialog
          </button>
        </div>

        {/* <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Setup Profile
                    </Dialog.Title>
                    <div className="mt-2">
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
                        <button
                          type="submit"
                          disabled={
                            name === "" ||
                            email === "" ||
                            physicalAddress === ""
                          }
                          onClick={async () => {
                            await axios.post("/api/auth/signin", {
                              walletAddress,
                              name,
                              email,
                              physicalAddress,
                            });
                            closeModal();
                          }}
                        >
                          Done!
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition> */}
      </>

      <ConnectWallet />
    </div>
  );
}
