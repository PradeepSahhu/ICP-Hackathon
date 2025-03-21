import React from "react";

import { cn } from "../../lib/utils";

const Table = ({ className, ...props }) => (
  <div data-slot="table-container" className="relative w-full overflow-x-auto">
    <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }) => (
  <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }) => (
  <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

const TableFooter = ({ className, ...props }) => (
  <tfoot
    data-slot="table-footer"
    className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
);

const TableRow = ({ className, ...props }) => (
  <tr
    data-slot="table-row"
    className={cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)}
    {...props}
  />
);

const TableHead = ({ className, ...props }) => (
  <th
    data-slot="table-head"
    className={cn(
      "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }) => (
  <td
    data-slot="table-cell"
    className={cn(
      "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
);

const TableCaption = ({ className, ...props }) => (
  <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
);

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
