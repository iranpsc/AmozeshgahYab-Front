import React from "react";

type FormGridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
};

export default function FormGrid({
  children,
  cols = 2,
}: FormGridProps) {
  const grid = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  };

  return (
    <div className={`grid gap-5 ${grid[cols]}`}>
      {children}
    </div>
  );
}