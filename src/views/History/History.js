import React from "react";
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";


import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import moment from "moment";




const useStyles = makeStyles(styles);

export default function History() {
    const [checked, setChecked] = React.useState([24, 22]);
    const [selectedEnabled, setSelectedEnabled] = React.useState("b");
    const [selectedValue, setSelectedValue] = React.useState(null);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleChangeEnabled = (event) => {
        setSelectedEnabled(event.target.value);
    };
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" text>
                            <CardText color="primary">
                                <h4 className={classes.cardTitle}>歷史查詢</h4>
                            </CardText>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="rose" icon>

                                                <h4 className={classes.cardIconTitle}>起始時間</h4>
                                            </CardHeader>
                                            <CardBody>
                                                <InputLabel className={classes.label}>起始時間</InputLabel>
                                                <br />
                                                <FormControl fullWidth>
                                                    <Datetime
                                                        initialValue={moment(new Date()).subtract(1, 'hours').format("YYYY-MM-DD HH:mm:ss")}
                                                        inputProps={{ placeholder: "起始時間 Here" }}
                                                    />
                                                </FormControl>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="rose" icon>

                                                <h4 className={classes.cardIconTitle}>結束時間</h4>
                                            </CardHeader>
                                            <CardBody>
                                                <InputLabel className={classes.label}>結束時間</InputLabel>
                                                <br />
                                                <FormControl fullWidth>
                                                    <Datetime
                                                        initialValue={moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}
                                                        inputProps={{ placeholder: "結束時間 Here" }}
                                                    />
                                                </FormControl>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={2}>
                                        <FormLabel
                                            className={
                                                classes.labelHorizontal +
                                                " " +
                                                classes.labelHorizontalRadioCheckbox
                                            }
                                        >
                                            Check Sensor
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => handleToggle(1)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label,
                                                    root: classes.labelRoot,
                                                }}
                                                label="RPM1"
                                            />
                                        </div>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => handleToggle(2)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label,
                                                    root: classes.labelRoot,
                                                }}
                                                label="RPM2"
                                            />
                                        </div>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => handleToggle(3)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label,
                                                    root: classes.labelRoot,
                                                }}
                                                label="RPM3"
                                            />
                                        </div>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => handleToggle(4)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label,
                                                    root: classes.labelRoot,
                                                }}
                                                label="RPM4"
                                            />
                                        </div>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => handleToggle(5)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label,
                                                    root: classes.labelRoot,
                                                }}
                                                label="RPM5"
                                            />
                                        </div>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => handleToggle(6)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label,
                                                    root: classes.labelRoot,
                                                }}
                                                label="TENSION"
                                            />
                                        </div>


                                    </GridItem>

                                    
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="rose">Submit</Button>
                                    </GridItem>
                                </GridContainer>


                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

        </div>
    );
}




