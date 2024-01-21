"use client";
import { updateCookie, updatePayee } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NetworkProvider,
  Transaction,
  TransactionHistory,
  TransactionType,
  UserType,
} from "@/models";
import { BankTransaction, UserService } from "@/services/user";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Sliders = ({ sliderData = [], parsedData = {} }: any) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [current, setCurrent] = useState<
    Pick<Transaction, "accountNumber" | "amount" | "name">
  >({
    accountNumber: "",
    amount: 0,
    name: "",
  });
  const [discount, setDiscount] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const [state, formAction] = useFormState(updatePayee, null);

  function fillData(data: any) {
    setCurrent(data);
  }

  const payload: Transaction = {
    accountNumber: current.accountNumber,
    type: TransactionType.Transfer,
    date: new Date(Date.now()),
    amount: current.amount,
    name: current.name,
  };

  const customerSinceDate = new Date(parsedData.customerSince);
  const transactionHistory = new TransactionHistory();

  const currentUser: UserService = new UserService(
    parsedData.username,
    parsedData.userType as UserType,
    customerSinceDate,
    new TransactionHistory(parsedData.transactionHistory.transactions),
    parsedData.accountBalance
  );

  function maskCreditCard(creditCardNumber: string) {
    if (creditCardNumber) {
      const visibleDigits = 4;
      const maskedNumber =
        "*".repeat(creditCardNumber.length - visibleDigits) +
        creditCardNumber.slice(-visibleDigits);
      return maskedNumber;
    }
  }

  const calculateDiscount = () => {
    const discount = currentUser.calculateDiscount(payload);
    setDiscount(discount);
  };

  const trigger = async () => {
    const transferredAmount = BankTransaction.doTransfer(payload, currentUser);

    if (transferredAmount > 0) {
      const userObjectCopy = JSON.stringify(currentUser);
      await updateCookie(userObjectCopy);
      toast.success("Transaction completed successfully");
    } else {
      toast.error("Insufficient funds or issue with the service");
    }

    setOpenTwo(false);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("scroll", () => {
      const scrollNext = api.canScrollNext();
      const scrollPrev = api.canScrollPrev();
      setCanScrollNext(scrollNext);
      setCanScrollPrev(scrollPrev);
    });
  }, [api]);

  useEffect(() => {
    if (state) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Carousel setApi={setApi} className="w-full mt-4 ">
      <CarouselContent className="-ml-1">
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="p-1 shadow ring-2 ring-[#74b9ff] w-32 h-32 flex flex-col items-center justify-center rounded-full ml-4 my-4">
                <PlusIcon className="h-8 w-8" />

                <span className="text-xs mt-2 font-semibold">Add user</span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Customer</DialogTitle>
                <DialogDescription>
                  Create New Customer profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <form action={formAction}>
                <div className="grid gap-6 py-4">
                  <div className="flex flex-col  gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Customer name"
                      className="py-6"
                    />
                  </div>
                  <div className="flex flex-col  gap-3">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="Customer Account Number"
                      className="py-6"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)} type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CarouselItem>
        {sliderData.map((user: any, index: any) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-1/2 lg:basis-[20%]"
          >
            <Dialog open={openTwo} onOpenChange={setOpenTwo}>
              <DialogTrigger asChild>
                <div
                  onClick={() => fillData(user)}
                  className=" flex flex-col items-center -ml-14"
                >
                  <div className="p-1 shadow ring-2 ring-[#74b9ff] w-32 h-32 rounded-full my-4">
                    <Image
                      src={`https://source.unsplash.com/random/${
                        Math.floor(Math.random() * 1000) + 1
                      }`}
                      alt={`Random ${Math.floor(Math.random() * 1000) + 1}`}
                      width={40}
                      height={40}
                      className=" object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <span className="text-xs  mt-5 text-center font-semibold">
                    {user.name}
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <Tabs defaultValue="transfer" className="mt-6 ">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger className=" py-3" value="transfer">
                      Transfer
                    </TabsTrigger>
                    <TabsTrigger className=" py-3" value="airtime">
                      Airtime
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="transfer">
                    <Card>
                      <CardHeader>
                        <CardTitle>Transfer</CardTitle>
                        <CardDescription>
                          Make swift transfer payment to the following customer
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            name="name"
                            className="py-6"
                            value={current?.name}
                            disabled
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="name">Account Number</Label>
                          <Input
                            id="name"
                            className="py-6"
                            value={maskCreditCard(current?.accountNumber)}
                            disabled
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Amount</Label>
                          <Input
                            onBlur={calculateDiscount}
                            id="username"
                            placeholder="Enter Amount"
                            className="py-6"
                            onChange={(event) =>
                              setCurrent((prevCurrent) => ({
                                ...prevCurrent,
                                amount: +event.target.value,
                              }))
                            }
                          />
                        </div>
                        {discount !== null && (
                          <div className=" flex items-center justify-end">
                            <Label htmlFor="username">Discount</Label>:{" "}
                            {discount * 100}%
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button disabled={discount === null} onClick={trigger}>
                          Save changes
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="airtime">
                    <Card>
                      <CardHeader>
                        <CardTitle>Airtime</CardTitle>
                        <CardDescription>
                          Buy airtime and send it to your customer
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            name="name"
                            className="py-6"
                            value={current?.name}
                            disabled
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="name">Account Number</Label>
                          <Input
                            id="name"
                            className="py-6"
                            value={maskCreditCard(current?.accountNumber)}
                            disabled
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5 mt-8">
                          <Label className=" ">Providers</Label>
                          <Select name="userType">
                            <SelectTrigger className="w-full py-6 mt-2">
                              <SelectValue placeholder="Select Network Provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={NetworkProvider.Airtel}>
                                Airtel
                              </SelectItem>
                              <SelectItem value={NetworkProvider.Etisalat}>
                                Etisalat
                              </SelectItem>
                              <SelectItem value={NetworkProvider.Glo}>
                                Glo
                              </SelectItem>
                              <SelectItem value={NetworkProvider.MTN}>
                                Mtn
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="name">Phone Number</Label>
                          <Input
                            className="py-6"
                            placeholder="Enter Phone Number"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save password</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className=" flex items-center justify-center gap-6"></div>

      <div className="flex items-center justify-center mt-6 gap-5">
        <Button
          variant="outline"
          size="icon"
          className=" rounded-full"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className=" rounded-full"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </Carousel>
  );
};

export default Sliders;
