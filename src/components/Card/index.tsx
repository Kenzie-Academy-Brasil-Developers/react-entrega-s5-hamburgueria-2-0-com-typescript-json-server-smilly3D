import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useAuth } from "../../Provider/Auth";
import { useCart } from "../../Provider/Cart";

import { Product } from "../../types/products";

interface CardProps {
  item: Product;
}

export const CardItem = ({ item }: CardProps) => {
  const { authToken, userid } = useAuth();
  const { addCart } = useCart();
  const sendItemCart = { ...item, userId: Number(userid) };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={3}
      sx={{ display: "flex", justifyContent: "center", width: "300px" }}
    >
      <Card
        sx={{
          width: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={item.img}
          alt="green iguana"
          height="200px"
          sx={{ width: "200px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.product}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.type}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ color: "green" }}
          >
            R$ {item.price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          {authToken ? (
            <Button
              size="small"
              variant="contained"
              onClick={() => addCart(sendItemCart)}
            >
              Adcionar
            </Button>
          ) : (
            <Button disabled={true} size="small" variant="contained">
              Adcionar
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
