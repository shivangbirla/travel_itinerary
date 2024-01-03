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
} from "@nextui-org/react";
//  const BASE_URL = "https://generative-travel-itinerary.vercel.app";

const InnerAccordianElement = ({ data }) => {
  console.log("data", data);

  return (
    <div className="flex flex-col gap-3">
      {data?.ingredients ? (
        <>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.ingredients.map((ingredient, index) => (
                <TableRow key={index}>
                  <TableCell>{ingredient.name ?? ingredient.ingredient}</TableCell>
                  <TableCell>{ingredient.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <h2 className="text-white text-xl font-semibold">Instructions:</h2>
          <ol>
            {data?.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
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
