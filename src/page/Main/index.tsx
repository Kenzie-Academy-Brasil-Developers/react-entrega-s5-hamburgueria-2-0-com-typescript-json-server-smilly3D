import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import SearchAppBar from "../../components/AppBar";
import { CardItem } from "../../components/Card";

import { useCart } from "../../Provider/Cart";
import { useProductList } from "../../Provider/ProductList";

function Main() {
  const { ProductList, getProductList } = useProductList();

  const { getCart } = useCart();

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SearchAppBar />
      <Button onClick={() => getCart()}>Teste</Button>

      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: "20px",
          paddingLeft: "50px",
          paddingRight: "50px",
          justifyContent: "center",
        }}
      >
        {ProductList.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </Grid>
    </>
  );
}

export default Main;
