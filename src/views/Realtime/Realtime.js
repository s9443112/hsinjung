import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import * as request from '../../request/index'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment'
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
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
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Legend, ResponsiveContainer, Brush,CartesianGrid} from 'recharts';
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

var setting_data = []

const useStyles = makeStyles(styles);

export default function Realtime() {
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <App />



            </GridContainer>

        </div>
    );
}


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
let realtime_list = [{ Timestamp: moment(new Date()).format('HH:mm:ss') }]
for (let i = 0; i <= 2000; i++) {
    realtime_list.push({ Timestamp: moment(new Date()).format('HH:mm:ss'), RPM1: 0, RPM2: 0, RPM3: 0, RPM4: 0, RPM5: 0, TENSION: 0 })
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
    let data = []

    if (x[0] !== undefined) {

        data = x[0]
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

            Promise.all(data.map((ele, d) => {
                ele.Timestamp = moment(new Date()).format("HH:mm:ss")
            }))
            realtime_list.push.apply(realtime_list, data)

        }

        if (realtime_list.length >= 2000) {
            realtime_list.splice(0, realtime_list.length - 2000)
        }
        console.log(realtime_list)
    }
    const classes = useStyles();

    return (
        <>

            {/* Score Now */}
            <GridItem xs={6} >
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <LineChart

                        data={realtime_list}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Timestamp" height={50} angle={-15}
                            textAnchor="end" />
                        <YAxis domain={[1400, 1800]} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="RPM1" stroke="blue" dot={false} />
<CartesianGrid strokeDasharray="3 3" />
                        {setting_data.length !== 0 &&
                            <>
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM1')).upperlimit} label={{ value: 'Max ', fill: 'red', position: "top" }} stroke="red" />
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM1')).lowerlimit} label={{ value: 'Min ', fill: 'red', position: "top" }} stroke="red" />
                            </>
                        }
                        <Brush
                            dataKey="Timestamp"
                            height={30}
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>

            </GridItem>
            <GridItem xs={6} >
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <LineChart

                        data={realtime_list}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Timestamp" height={50} angle={-15}
                            textAnchor="end" />
                        <YAxis domain={[1400, 1800]} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="RPM2" stroke="blue" dot={false} />
<CartesianGrid strokeDasharray="3 3" />
                        {setting_data.length !== 0 &&
                            <>
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM2')).upperlimit} label={{ value: 'Max ', fill: 'red', position: "top" }} stroke="red" />
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM2')).lowerlimit} label={{ value: 'Min ', fill: 'red', position: "top" }} stroke="red" />
                            </>
                        }
                        <Brush
                            dataKey="Timestamp"
                            height={30}
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </GridItem>
            <GridItem xs={6} >
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <LineChart

                        data={realtime_list}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Timestamp" height={50} angle={-15}
                            textAnchor="end" />
                        <YAxis domain={[1400, 1800]} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="RPM3" stroke="blue" dot={false} />
<CartesianGrid strokeDasharray="3 3" />
                        {setting_data.length !== 0 &&
                            <>
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM3')).upperlimit} label={{ value: 'Max ', fill: 'red', position: "top" }} stroke="red" />
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM3')).lowerlimit} label={{ value: 'Min ', fill: 'red', position: "top" }} stroke="red" />
                            </>
                        }
                        <Brush
                            dataKey="Timestamp"
                            height={30}
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </GridItem>
            <GridItem xs={6} >
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <LineChart

                        data={realtime_list}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Timestamp" height={50} angle={-15}
                            textAnchor="end" />
                        <YAxis domain={[500, 1000]} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="RPM4" stroke="blue" dot={false} />
<CartesianGrid strokeDasharray="3 3" />
                        {setting_data.length !== 0 &&
                            <>
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM4')).upperlimit} label={{ value: 'Max ', fill: 'red', position: "top" }} stroke="red" />
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM4')).lowerlimit} label={{ value: 'Min ', fill: 'red', position: "top" }} stroke="red" />
                            </>
                        }
                        <Brush
                            dataKey="Timestamp"
                            height={30}
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </GridItem>
            <GridItem xs={6}>
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <LineChart

                        data={realtime_list}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Timestamp" height={50} angle={-15}
                            textAnchor="end" />
                        <YAxis domain={[5000, 5500]} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="RPM5" stroke="blue" dot={false} />
<CartesianGrid strokeDasharray="3 3" />
                        {setting_data.length !== 0 &&
                            <>
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM5')).upperlimit} label={{ value: 'Max ', fill: 'red', position: "top" }} stroke="red" />
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'RPM5')).lowerlimit} label={{ value: 'Min ', fill: 'red', position: "top" }} stroke="red" />
                            </>
                        }
                        <Brush
                            dataKey="Timestamp"
                            height={30}
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </GridItem>
            <GridItem xs={6} >
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <LineChart

                        data={realtime_list}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Timestamp" height={50} angle={-15}
                            textAnchor="end" />
                        <YAxis domain={[0.5, 1]} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="TENSION" stroke="blue" dot={false} />
<CartesianGrid strokeDasharray="3 3" />
                        {setting_data.length !== 0 &&
                            <>
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'TENSION')).upperlimit} label={{ value: 'Max ', fill: 'red', position: "top" }} stroke="red" />
                                <ReferenceLine y={(setting_data.find(ele => ele.args === 'TENSION')).lowerlimit} label={{ value: 'Min ', fill: 'red', position: "top" }} stroke="red" />
                            </>
                        }
                        <Brush
                            dataKey="Timestamp"
                            height={30}
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
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