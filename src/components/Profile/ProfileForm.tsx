
"use client";

import { useState } from "react";
import Image from "next/image";
import { updateUser } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

type ProfileFormProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(user.image ?? "");

  // Upload profile picture
  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.danger("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.danger("Image size must be less than 5MB.");
      return;
    }

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      toast.danger("Cloudinary is not configured.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.secure_url) {
        throw new Error(data.error?.message || "Image upload failed.");
      }

      setImageUrl(data.secure_url);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);

      toast.danger(
        error instanceof Error ? error.message : "Image upload failed."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Update profile
  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";

    if (name.length < 3) {
      toast.danger("Name must be at least 3 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateUser({
        name,
        image: imageUrl.trim() || null,
      });

      if (result.error) {
        throw new Error(result.error.message || "Profile update failed.");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.danger(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form className="w-full" onSubmit={handleUpdateUser}>
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>

        <Description>
          Update your personal profile information.
        </Description>

        <FieldGroup>

          {/* Profile Picture */}
          <div>
            <Label>Profile Picture</Label>

            <div className="mt-3 flex flex-col gap-4 rounded-xl border border-gray-200 bg-slate-50 p-4 sm:flex-row sm:items-center">

              {/* Image Preview */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    height={80}
                    width={80}
                    alt="Profile preview"
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-emerald-600">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-800">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />

                  {isUploading ? "Uploading..." : "Choose from device"}
                </label>

                <p className="text-xs text-gray-500">
                  JPG, PNG or WebP. Maximum size: 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Image URL */}
          <TextField
            name="image"
            value={imageUrl}
            onChange={setImageUrl}
          >
            <Label>Image URL</Label>
            <Input placeholder="https://res.cloudinary.com/..." />
            <FieldError />
            <Description>
              You can also paste an image URL directly.
            </Description>
          </TextField>

          {/* Full Name */}
          <TextField
            name="name"
            isRequired
            defaultValue={user.name}
            validate={(value) =>
              value.trim().length < 3
                ? "Name must be at least 3 characters."
                : null
            }
          >
            <Label>Full Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Email */}
          <div>
            <Label>Email Address</Label>
            <Input value={user.email} readOnly />
            <Description>
              Your email address cannot be changed.
            </Description>
          </div>

        </FieldGroup>

        {/* Form Actions */}
        <Fieldset.Actions>
          <Button
            type="submit"
            isDisabled={isLoading || isUploading}
          >
            <FloppyDisk />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="reset"
            variant="secondary"
            isDisabled={isLoading || isUploading}
            onPress={() => setImageUrl(user.image ?? "")}
          >
            Cancel
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
}
