import type { Meta, StoryObj } from "@storybook/react";
import {
  CanvasSkeleton,
  SidebarSkeleton,
  InspectorSkeleton,
} from "./Skeletons";

const meta: Meta = {
  title: "Components/Skeletons",
  tags: ["autodocs"],
};

export default meta;

export const Canvas: StoryObj = {
  render: () => (
    <div className="h-96 w-full">
      <CanvasSkeleton />
    </div>
  ),
};

export const Sidebar: StoryObj = {
  render: () => (
    <div className="h-96">
      <SidebarSkeleton />
    </div>
  ),
};

export const Inspector: StoryObj = {
  render: () => (
    <div className="h-96">
      <InspectorSkeleton />
    </div>
  ),
};
