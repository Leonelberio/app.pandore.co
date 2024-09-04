"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DataComparator } from "@/app/(protected)/_components/data-comparator";
import Loader from "../web/comparators/loading";

const ComparatorView = () => {
  const { comparatorId } = useParams();

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (comparatorId) {
        try {
          setIsLoading(true);
          // Fetch data from the API
          const response = await fetch(`/api/comparators/${comparatorId}/data-source`);
          if (!response.ok) throw new Error("Failed to fetch comparator data");

          const data = await response.json();
          console.log(data);
          

          // Extract selectedColumns and selectedRows from the data sources
          const columns: string[] = [];
          const rows: string[] = [];

          data.forEach((dataSource: any) => {
            dataSource.selectedColumns.forEach((col: any) => {
              if (!columns.includes(col.columnName)) {
                columns.push(col.columnName);
              }
            });

            dataSource.selectedRows.forEach((row: any) => {
              if (!rows.includes(row.rowName)) {
                rows.push(row.rowName);
              }
            });
          });

          setSelectedColumns(columns);
          setSelectedRows(rows);
        } catch (error) {
          console.error("Error loading data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [comparatorId]);

  if (isLoading || !comparatorId ) {
    return <Loader />;
  }

  return (
    <div>
      <DataComparator
        selectedColumns={selectedColumns} // Pass the retrieved columns to the DataComparator
        selectedRows={selectedRows} // Pass the retrieved rows to the DataComparator
        title="Comparez les données"
        placeholder="Sélectionnez les champs"
      />
    </div>
  );
};

export default ComparatorView;
