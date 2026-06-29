"use client";

import { useEffect, useState, useCallback } from "react";
import { useGraphStore } from "../store/graphStore";
import type { GraphValidationError } from "@sbc/shared";

export function useGraphValidation() {
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const validate = useGraphStore((s) => s.validate);
  const [errors, setErrors] = useState<GraphValidationError[]>([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    validate();
  }, [nodes, edges, validate]);

  useEffect(() => {
    const state = useGraphStore.getState();
    setErrors(state.validationErrors);
    setIsValid(state.isValid);
  }, [nodes, edges]);

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
