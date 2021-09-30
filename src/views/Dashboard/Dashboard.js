import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import moment from 'moment'
import * as request from '../../request/index'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import AddAlert from "@material-ui/icons/AddAlert";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

import { Connector, subscribe } from 'react-mqtt-client'

const us_flag = require("assets/img/flags/US.png").default;
const de_flag = require("assets/img/flags/DE.png").default;
const au_flag = require("assets/img/flags/AU.png").default;
const gb_flag = require("assets/img/flags/GB.png").default;
const ro_flag = require("assets/img/flags/RO.png").default;
const br_flag = require("assets/img/flags/BR.png").default;

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <App />

        <Detail />

      </GridContainer>

    </div>
  );
}


var setting_data = []


class App extends React.Component {
  async componentDidMount() {
    setting_data = await request.get_setting()
  }
  render() {
    return (
      <React.Fragment>
        <Connector
          mqttProps={{
            url: `ws://${process.env.REACT_APP_MQTT_SERVER}`,
            options: { protocol: 'ws', port: process.env.REACT_APP_MQTT_PORT, username: process.env.REACT_APP_MQTT_ACC, password: process.env.REACT_APP_MQTT_PWD },
          }}
        >
          <Connected />
          {/* <ConnectedError /> */}
        </Connector>
      </React.Fragment>
    )
  }
}

const MessageList = props => {

  let x = JSON.parse(JSON.stringify(props.data))
  props.data.splice(0, 1)

  let RPM1 = 0
  let RPM2 = 0
  let RPM3 = 0
  let RPM4 = 0
  let RPM5 = 0
  let TENSION = 0
  let status = 'primary'
  
  let datetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

  if (x[0] !== undefined) {

    let data = x[0]
    let new_data = JSON.parse(JSON.stringify(data))
    if (data.length === undefined) {
      RPM1 = 0
      RPM2 = 0
      RPM3 = 0
      RPM4 = 0
      RPM5 = 0
      TENSION = 0
    } else {
      var avg = Array.from(new_data.reduce(
        (acc, obj) => Object.keys(obj).reduce(
          (acc, key) => typeof obj[key] == "number"
            ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
            : acc,
          acc),
        new Map()),
        ([name, values]) =>
          ({ name, average: values.reduce((a, b) => a + b) / values.length })
      );

      RPM1 = parseFloat(avg.find(ele => ele.name === 'RPM1').average).toFixed(2)
      RPM2 = parseFloat(avg.find(ele => ele.name === 'RPM2').average).toFixed(2)
      RPM3 = parseFloat(avg.find(ele => ele.name === 'RPM3').average).toFixed(2)
      RPM4 = parseFloat(avg.find(ele => ele.name === 'RPM4').average).toFixed(2)
      RPM5 = parseFloat(avg.find(ele => ele.name === 'RPM5').average).toFixed(2)
      TENSION = parseFloat(avg.find(ele => ele.name === 'TENSION').average).toFixed(2)
      let buffer = data[0].state
      status = buffer === 0 ? 'danger' : 'success'



    }
  }
  const classes = useStyles();
  // console.log(setting_data.length)
  // setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM1')).lowerlimit) >= parseFloat(RPM1) && console.log(1)
  // setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM1')).upperlimit) <= parseFloat(RPM1) && console.log(0)



  return (
    <>

      {/* Score Now */}
      <GridItem xs={12} sm={6} md={6} lg={4}>

        <Card>
          <CardHeader color={`${status}`} stats icon>
            <CardIcon color={`${status}`}>
              {setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM1')).lowerlimit) >= parseFloat(RPM1) ? <ArrowDownwardIcon /> :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM1')).upperlimit) <= parseFloat(RPM1) ? <ArrowUpwardIcon /> : <CheckCircleIcon />}
            </CardIcon>
            <p className={classes.cardCategory}>RPM1</p>
            <h3 className={classes.cardTitle} style={{
              color: setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM1')).lowerlimit) >= parseFloat(RPM1) ? 'orange' :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM1')).upperlimit) <= parseFloat(RPM1) ? 'orange' : 'black'
            }}>
              {RPM1}
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {datetime}
            </div>
          </CardFooter>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={4}>
        <Card>
          <CardHeader color={`${status}`} stats icon>
            <CardIcon color={`${status}`}>
              {setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM2')).lowerlimit) >= parseFloat(RPM2) ? <ArrowDownwardIcon /> :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM2')).upperlimit) <= parseFloat(RPM2) ? <ArrowUpwardIcon /> : <CheckCircleIcon />}
            </CardIcon>
            <p className={classes.cardCategory}>RPM2</p>
            <h3 className={classes.cardTitle} style={{
              color: setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM2')).lowerlimit) >= parseFloat(RPM2) ? 'orange' :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM2')).upperlimit) <= parseFloat(RPM2) ? 'orange' : 'black'
            }}>{RPM2}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {datetime}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={4}>
        <Card>
          <CardHeader color={`${status}`} stats icon>
            <CardIcon color={`${status}`}>
              {setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM3')).lowerlimit) >= parseFloat(RPM3) ? <ArrowDownwardIcon /> :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM3')).upperlimit) <= parseFloat(RPM3) ? <ArrowUpwardIcon /> : <CheckCircleIcon />}
            </CardIcon>
            <p className={classes.cardCategory}>RPM3</p>
            <h3 className={classes.cardTitle} style={{
              color: setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM3')).lowerlimit) >= parseFloat(RPM3) ? 'orange' :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM3')).upperlimit) <= parseFloat(RPM3) ? 'orange' : 'black'
            }}>{RPM3}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {datetime}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={4}>
        <Card>
          <CardHeader color={`${status}`} stats icon>
            <CardIcon color={`${status}`}>
              {setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM4')).lowerlimit) >= parseFloat(RPM4) ? <ArrowDownwardIcon /> :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM4')).upperlimit) <= parseFloat(RPM4) ? <ArrowUpwardIcon /> : <CheckCircleIcon />}
            </CardIcon>
            <p className={classes.cardCategory}>RPM4</p>
            <h3 className={classes.cardTitle} style={{
              color: setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM4')).lowerlimit) >= parseFloat(RPM4) ? 'orange' :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM4')).upperlimit) <= parseFloat(RPM4) ? 'orange' : 'black'
            }}>{RPM4}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {datetime}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={4}>
        <Card>
          <CardHeader color={`${status}`} stats icon>
            <CardIcon color={`${status}`}>
              {setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM5')).lowerlimit) >= parseFloat(RPM5) ? <ArrowDownwardIcon /> :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM5')).upperlimit) <= parseFloat(RPM5) ? <ArrowUpwardIcon /> : <CheckCircleIcon />}
            </CardIcon>
            <p className={classes.cardCategory}>RPM5</p>
            <h3 className={classes.cardTitle} style={{
              color: setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM5')).lowerlimit) >= parseFloat(RPM5) ? 'orange' :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'RPM5')).upperlimit) <= parseFloat(RPM5) ? 'orange' : 'black'
            }}>{RPM5}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {datetime}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={4}>
        <Card>
          <CardHeader color={`${status}`} stats icon>
            <CardIcon color={`${status}`}>
              {setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'TENSION')).lowerlimit) >= parseFloat(TENSION) ? <ArrowDownwardIcon /> :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'TENSION')).upperlimit) <= parseFloat(TENSION) ? <ArrowUpwardIcon /> : <CheckCircleIcon />}
            </CardIcon>
            <p className={classes.cardCategory}>TENSION</p>
            <h3 className={classes.cardTitle} style={{
              color: setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'TENSION')).lowerlimit) >= parseFloat(TENSION) ? 'orange' :
                setting_data.length !== 0 && parseFloat((setting_data.find(ele => ele.args === 'TENSION')).upperlimit) <= parseFloat(TENSION) ? 'orange' : 'black'
            }}>{TENSION}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {datetime}
            </div>
          </CardFooter>
        </Card>
      </GridItem>






    </>
  )

}


const Connected = subscribe({ topic: 'fucker' })(MessageList)

const Detail = props => {
  const classes = useStyles();
  return (
    <>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart className={classes.cardHover}>
          <CardHeader color="warning" className={classes.cardHeaderHover}>
            <ChartistGraph
              className="ct-chart-white-colors"
              data={dailySalesChart.data}
              type="Line"
              options={dailySalesChart.options}
              listener={dailySalesChart.animation}
            />
          </CardHeader>
          <CardBody>
            <div className={classes.cardHoverUnder}>
              <Tooltip
                id="tooltip-top"
                title="Refresh"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button simple color="info" justIcon>
                  <Refresh className={classes.underChartIcons} />
                </Button>
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Change Date"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button color="transparent" simple justIcon>
                  <Edit className={classes.underChartIcons} />
                </Button>
              </Tooltip>
            </div>
            <h4 className={classes.cardTitle}>查看即時詳細波形</h4>

          </CardBody>

        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <SnackbarContent
          message={
            "轉速正常"
          }
          style={{ fontSize: '28px' }}
          close
          icon={AddAlert}
          color="info"
        />
      </GridItem>
    </>
  )
}