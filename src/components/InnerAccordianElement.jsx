import React, { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Card,
} from "@nextui-org/react";
//  const BASE_URL = "https://generative-travel-itinerary.vercel.app";

const InnerAccordianElement = ({ data }) => {
  console.log("data", data);

  return (
    <div className="flex flex-col gap-3 w-full">
      {data?.ingredients ? (
        <>
          <Card className="p-4 flex flex-col gap-4 w-full">
            <Table
              isStriped
              removeWrapper
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>QUANTITY</TableColumn>
              </TableHeader>
              <TableBody>
                {data?.ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {ingredient.name ?? ingredient.ingredient}
                    </TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h2 className="text-white text-2xl font-semibold mt-4">
              Instructions:
            </h2>
            <ol className="flex flex-col gap-1">
              {data?.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">
                  {instruction}
                </li>
              ))}
            </ol>
          </Card>
        </>
      ) : (
        <div className="w-full h-20 flex justify-center items-center">
          <CircularProgress
            classNames={{
              svg: " drop-shadow-md",
              indicator: "stroke-white",
              track: "stroke-white/10",
              value: "text-white",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InnerAccordianElement;
