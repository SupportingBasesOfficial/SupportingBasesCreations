import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  CanvasSkeleton,
  SidebarSkeleton,
  InspectorSkeleton,
} from "./Skeletons";

describe("Skeletons", () => {
  it("CanvasSkeleton renders without crash", () => {
    const { container } = render(<CanvasSkeleton />);
    expect(container.firstChild).not.toBeNull();
  });

  it("SidebarSkeleton renders without crash", () => {
    const { container } = render(<SidebarSkeleton />);
    expect(container.firstChild).not.toBeNull();
  });

  it("InspectorSkeleton renders without crash", () => {
    const { container } = render(<InspectorSkeleton />);
    expect(container.firstChild).not.toBeNull();
  });
});
