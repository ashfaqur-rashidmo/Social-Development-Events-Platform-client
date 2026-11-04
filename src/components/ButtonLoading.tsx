
"use client";

import { Spinner } from "@heroui/react";

type LoadingStateProps = {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
};

export function ButtonLoading({
  isLoading,
  loadingText,
  children,
}: LoadingStateProps) {
  return (
    <>
      {isLoading ? (
        <>
          <Spinner color="current" size="sm" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </>
  );
}
