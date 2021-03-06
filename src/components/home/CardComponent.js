import React from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider, LinearProgress } from "@material-ui/core";
import { Link } from "@material-ui/core";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const CardComponent = ({ campaign }) => {
  const classes = useStyles();
  return (
    <Grid item key={campaign.id} xs={12} sm={6} md={4}>
      <Link
        href={"/campaigns/" + campaign.id}
        style={{ textDecoration: "none" }}
      >
        <Card className={classes.card} elevation={4}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Cover Photo"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              align="center"
              color="primary"
            >
              {"Rs. " + numberWithCommas(campaign.amount)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={20}
              style={{ height: 12, borderRadius: 2 }}
            />
            <Typography
              className="mt-4"
              gutterBottom
              variant="subtitle1"
              component="h2"
              align="center"
            >
              {campaign.campaignTitle}
            </Typography>
            <Divider className="mt-3" />
            <Typography
              className="mt-2"
              variant="subtitle1"
              component="h2"
              align="center"
              color="textSecondary"
            >
              {"by " + campaign.campaignOrganiserName}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default CardComponent;
