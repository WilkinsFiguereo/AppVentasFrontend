// app/src/features/product-detail/hooks/useHelpfulVote.ts
"use client";

import { useState } from "react";

export function useHelpfulVote(initial: number) {
  const [helpful, setHelpful] = useState(initial);
  const [voted, setVoted] = useState(false);

  const vote = () => {
    if (voted) return;
    setHelpful((h) => h + 1);
    setVoted(true);
  };

  return { helpful, voted, vote };
}
