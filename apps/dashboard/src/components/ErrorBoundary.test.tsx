import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

function ThrowComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("Test error");
  return <div>OK</div>;
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should render children when no error", () => {
    render(
      <ErrorBoundary>
        <ThrowComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("OK")).toBeDefined();
  });

  it("should show error UI when child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeDefined();
    expect(screen.getByText("Test error")).toBeDefined();
  });

  it("should reset on Try Again click", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeDefined();

    rerender(
      <ErrorBoundary>
        <ThrowComponent shouldThrow={false} />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByText("Try Again"));
    expect(screen.getByText("OK")).toBeDefined();
  });
});
