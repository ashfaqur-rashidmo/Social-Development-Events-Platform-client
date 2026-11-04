"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { Event } from "@/lib/type";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface DeletingUserEventsProps {
  event: Event;
}

const DeletingUserEvents = ({ event }: DeletingUserEventsProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    const backendUrl = process.env.NEXT_PUBLIC_URL;

    if (!backendUrl) {
      toast.error("Backend URL is not configured.");
      return;
    }

    setIsDeleting(true);

    const token = await getTokenFromClient();

    try {
      const response = await fetch(
        `${backendUrl}/events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event.");
      }

      toast.success("Event deleted successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting event:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete event."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog isOpen={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="danger"
        onPress={() => setOpen(true)}
      >
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete event permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                Are you sure you want to delete{" "}
                <strong>{event.title}</strong>? This action cannot
                be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                type="button"
                slot="close"
                variant="tertiary"
                isDisabled={isDeleting}
                onPress={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                isDisabled={isDeleting}
                onPress={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete Event"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeletingUserEvents;