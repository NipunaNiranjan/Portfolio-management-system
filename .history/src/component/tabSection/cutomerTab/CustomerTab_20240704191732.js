import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CustomerDetailsCard from "./CustomerDetailsCard";
import MapBox from "./CustomerDetailsMap";
import { useQuery } from "@tanstack/react-query";
import { getAllMembers } from "../../../API";
import ReactSearchBox from "react-search-box";

export default function CustomerTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["members"],
    queryFn: getAllMembers,
    refetchInterval: 60000,
  });
  console.log(data);

  const MAX_CARDS_WITHOUT_SCROLL = 2;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const customerData = Array.isArray(data) ? data : [];
  console.log(customerData);

  const filteredCustomers = customerData.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerHeight =
    filteredCustomers.length > MAX_CARDS_WITHOUT_SCROLL ? "75vh" : "auto";

  return (
    <CustomerDataWrapper>
      {customerData.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            width: "100%",
            height: containerHeight,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "30%",
              height: containerHeight,
              overflowY:
                customerData.length > MAX_CARDS_WITHOUT_SCROLL
                  ? "auto"
                  : "visible",
              padding: "0.5rem",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "background.paper",
                padding: "0.1rem",
              }}
            >
              <ReactSearchBox
                placeholder="Search customer"
                value={searchTerm}
                data={customerData.map((customer) => ({
                  key: customer._id,
                  value: customer.customerName,
                }))}
                onChange={(value) => setSearchTerm(value)}
                onSelect={(record) => setSearchTerm(record.item.value)}
                fuseConfigs={{
                  threshold: 0.05,
                }}
                inputFontSize="14px"
                inputHeight="40px"
              />
            </Box>
            {filteredCustomers.map((customer, index) => (
              <CustomerDetailsCard
                sx={{
                  padding: "1rem",
                  flexShrink: 0,
                }}
                key={customer._id || index}
                _id={customer._id}
                customerName={customer.customerName}
                latitude={customer.latitude}
                longitude={customer.longitude}
              />
            ))}
          </Box>
          <Box sx={{ width: "70%", height: containerHeight }}>
            <MapBox customers={filteredCustomers} />
          </Box>
        </Box>
      ) : (
        <Typography>No customer data available</Typography>
      )}
    </CustomerDataWrapper>
  );
}

const CustomerDataWrapper = styled.div``;
