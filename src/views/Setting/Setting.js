import React, { forwardRef } from 'react';


import MaterialTable from 'material-table';
import * as request from '../../request/index'
import moment from 'moment'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export default class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: "名稱", field: "name" },
                { title: "上限", field: "upperlimit",type: 'numeric' },
                { title: "下限", field: "lowerlimit",type: 'numeric' },
                { title: "參考值", field: "args", editable: "never", },
            ],
            data: []
        }
    }



    do_something = async () => {
        let data = await request.get_setting()
        this.setState({ data: data })

    }

    async componentDidMount() {
        // await this.get_user()
        await this.do_something()
    }

    render() {
        let { columns, data } = this.state
        return (
            <>
                <MaterialTable
                    icons={tableIcons}
                    title="警戒值設定"
                    columns={columns}
                    data={data}
                    localization={{

                        header: {
                            actions: '操作'
                        },

                    }}
                    editable={{


                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(async () => {
                                    console.log(newData)
                                    await request.modify_setting(newData)
                                    await this.do_something()
                                    resolve();
                                }, 600);
                            }),



                    }}
                    options={{
                        sorting: true,
                        pageSize: 6,
                        pageSizeOptions: [5, 10, { value: data.length, label: 'All' }],
                    }}


                />

            </>

        );
    }
}


