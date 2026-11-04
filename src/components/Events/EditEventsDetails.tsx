
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  TextArea,
  Select,
  ListBox,
} from "@heroui/react";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Event } from "@/lib/type";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Clothing Drive",
  "Fundraising",
  "Community Service",
  "Other",
];

interface EditEventsDetailsProps {
  event: Event;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const getLocalDateTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function EditEventsDetails({
  event,
}: EditEventsDetailsProps) {
  const router = useRouter();

  const [form, setForm] = useState<Event>({ ...event });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const setField = (field: keyof Event, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const selectedDate = new Date(form.eventDate);

    if (
      !form.eventDate ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate <= new Date()
    ) {
      toast.error("Please select a future event date.");
      return;
    }

    setIsSubmitting(true);

    const { _id, ...updatedData } = form;

    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...updatedData,
            eventDate: selectedDate.toISOString(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating event:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update event."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="bordered"
        onPress={() => setOpen(true)}
      >
        <Pencil size={16} />
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon>
                <Pencil size={20} />
              </Modal.Icon>
              <Modal.Heading>Edit Event</Modal.Heading>
              <p className="text-sm text-default-500">
                Update the information for this community event.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  id="edit-event-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <Field label="Event Title">
                    <TextField name="title" variant="secondary">
                      <Input
                        value={form.title}
                        onChange={(e) =>
                          setField("title", e.target.value)
                        }
                        placeholder="Community Tree Plantation"
                        required
                      />
                    </TextField>
                  </Field>

                  <Field label="Event Type">
                    <Select
                      selectedKey={form.eventType}
                      onSelectionChange={(value) => {
                        if (value !== null) {
                          setField("eventType", String(value));
                        }
                      }}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Select event type" />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {EVENT_TYPES.map((type) => (
                            <ListBox.Item key={type} id={type}>
                              {type}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Field>

                  <Field label="Location">
                    <TextField name="location" variant="secondary">
                      <Input
                        value={form.location}
                        onChange={(e) =>
                          setField("location", e.target.value)
                        }
                        placeholder="Patenga Beach, Chittagong"
                        required
                      />
                    </TextField>
                  </Field>

                  <Field label="Thumbnail Image URL">
                    <TextField name="thumbnailUrl" variant="secondary">
                      <Input
                        type="url"
                        value={form.thumbnailUrl}
                        onChange={(e) =>
                          setField("thumbnailUrl", e.target.value)
                        }
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </TextField>
                  </Field>

                  <Field label="Event Date">
                    <TextField name="eventDate" variant="secondary">
                      <Input
                        type="datetime-local"
                        min={getLocalDateTime(new Date().toISOString())}
                        value={getLocalDateTime(form.eventDate)}
                        onChange={(e) =>
                          setField("eventDate", e.target.value)
                        }
                        required
                      />
                    </TextField>
                  </Field>

                  <Field label="Description">
                    <TextField name="description" variant="secondary">
                      <TextArea
                        value={form.description}
                        onChange={(e) =>
                          setField("description", e.target.value)
                        }
                        placeholder="Describe the community event..."
                        rows={5}
                        required
                      />
                    </TextField>
                  </Field>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                isDisabled={isSubmitting}
                onPress={() => setOpen(false)}
              >
                <X size={16} />
                Cancel
              </Button>

              <Button
                type="submit"
                form="edit-event-form"
                isDisabled={isSubmitting}
              >
                <Save size={16} />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
