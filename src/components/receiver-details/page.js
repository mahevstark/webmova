import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import Pin from "../../pop-ups/pin";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
export default function receiverdetails({
  selectedUser,
  amount,
  handleBackToAmount,
}) {
  const [details, setdetails] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    if (selectedUser) {
      setdetails([
        { label: "Sender Name", value: selectedUser.firstName },
        {
          label: "Receiver Name",
          value: selectedUser.firstName + " " + selectedUser.lastName,
        },
        { label: "Receiver Account Type", value: "Stripe" },
        { label: "Amount sent", value: amount },
        { label: "Service Fee", value: "$15" },
      ]);
    }
  }, [selectedUser, amount]);
  console.log("selectedUser", selectedUser);

  return (
    <Card className="w-full max-w-sm mx-auto border-0 shadow-none ">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Receiver Details
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          The receiver's information is provided below. Please review the
          details for accuracy before proceeding.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-sm ">{detail.label}</span>
              <span className="text-sm font-medium ">{detail.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-4">
        <Button
          onClick={handleBackToAmount}
          className="text-blue-500 bg-transparent border border-blue-500 hover:bg-blue-50"
        >
          ← Back to Amount
        </Button>
        <Pin
          value="Confirm"
          style="button-background text-white font-semibold border rounded-lg w-full   no-hover "
          selectedUser={selectedUser}
          amount={amount}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      </CardFooter>
    </Card>
  );
}
