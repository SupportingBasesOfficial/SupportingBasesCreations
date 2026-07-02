import type { Meta, StoryObj } from "@storybook/react";
import { ToastContainer, useToast } from "./Toast";
import { useEffect } from "react";

function ToastDemo() {
  const { success, error, info, loading } = useToast();

  useEffect(() => {
    success("Project deployed successfully!");
    error("Failed to connect to GitHub");
    info("Graph saved to cloud");
    loading("Deploying to Vercel...");
  }, [success, error, info, loading]);

  return <ToastContainer />;
}

const meta: Meta = {
  title: "Components/Toast",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const AllTypes: Story = {
  render: () => <ToastDemo />,
};
