"use client";

import { useEffect, useCallback } from "react";
import { useGraphStore } from "../store/graphStore";
import type { GraphValidationError } from "@sbc/shared";

export function useGraphValidation() {
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const validate = useGraphStore((s) => s.validate);
  const errors = useGraphStore((s) => s.validationErrors);
  const isValid = useGraphStore((s) => s.isValid);

  useEffect(() => {
    validate();
  }, [nodes, edges, validate]);

  const getErrorForNode = useCallback(
    (nodeId: string): GraphValidationError | undefined => {
      return errors.find((e) => e.nodeId === nodeId);
    },
    [errors],
  );

  const getErrorForEdge = useCallback(
    (edgeId: string): GraphValidationError | undefined => {
      return errors.find((e) => e.edgeId === edgeId);
    },
    [errors],
  );

  return { errors, isValid, getErrorForNode, getErrorForEdge };
}
