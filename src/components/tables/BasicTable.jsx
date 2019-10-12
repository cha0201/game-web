/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table, Icon, Button } from 'antd';

class BasicTable extends React.Component{

    render(){
        return (
           
            <Table 
              columns={this.props.columns}
              dataSource={this.props.data}
              pagination={this.props.pagination}

            />
        )
    }

}



export default BasicTable;