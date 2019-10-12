/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card,Button,Icon,Input } from 'antd';
import BasicTable from './BasicTable';
import SelectTable from './SelectTable';
import SortTable from './SortTable';
import SearchTable from './SearchTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link } from 'react-router-dom'; 
import {getGameList} from '../../axios/index'
import { Modal } from 'antd';
import UpdateRuleForms from './UpdateRuleForm';

const { Search } = Input;

let color ='green';




// const data = [
//     {
//       "ruleId": 1,
//       "ruleName": "A1",
//       "listName": "M1",
//       "remark": "66",
//       "totalNum": null,
//       "createTime": "2019-09-23T20:45:37.000+0000",
//       "creator": null,
//       "filePath": null,
//       "status": true
//     },
//     {
//       "ruleId": 2,
//       "ruleName": "A2",
//       "listName": "M2",
//       "remark": "666",
//       "totalNum": null,
//       "createTime": "2019-09-23T20:45:40.000+0000",
//       "creator": null,
//       "filePath": null,
//       "status": true
//     }
//   ]


class BasicTables extends React.Component{

    constructor(props){
        super(props)
        this.state = {
        ModalText: 'Content of the modal',
        updatevisible: false,
        addvisible:false,
        confirmLoading: false,
        title:"",
        data:[],
        total:50,
        currentPage: 1,
        pageSize: 10

        }
      };


 


      handleCancel = () => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        this.setState({
          updatevisible: false,
        });
      }

      handleUpdate = (e,record) => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        console.log(record);
        this.setState({
          updatevisible: true,
          title:"修改规则",
          record:record
        });
    
      }

      addHandleCancel = () => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        this.setState({
          addvisible: false,
        });
      }

      

      handleAdd = () => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        this.setState({
          addvisible: true,
          title:"新增规则",
          record: {}
        });
      }


    
      componentDidMount(){
        this.loadGameList('');
     }

    
     loadGameList=(name)=>{
      getGameList(name,this.state.currentPage,this.state.pageSize).then(value=>{
        console.log("请求后台------------------------->>>>")
        this.setState({
          data: value,
          // total: page.total,
        });
      });
    }

   
    changePage=(page,pageSize)=>{
      console.log(`page:${page},pageSize:${pageSize}`)
      this.setState({
        currentPage: page,
      })

      
    }
     
     

  render(){

    const pagination={
      showSizeChanger: true,
      total: this.state.total,
      showTotal: detailTotal => `总共 ${detailTotal} 条记录`,
      current: this.state.currentPage,
      onChange: this.changePage,
    };

  
    const { visible, confirmLoading, ModalText } = this.state;
    const columns = [ {
        title: '联赛名称',
        dataIndex: 'gameUnionName',
        key: 'gameUnionName',
    }, {
        title: '开赛日',
        dataIndex: 'gameDayTime',
        key: 'gameDayTime',
    }, 
    {
      title: 'A队',
      dataIndex: 'gameTeamA',
      key: 'gameTeamA',
  },
  {
    title: 'B队',
    dataIndex: 'gameTeamB',
    key: 'gameTeamB',
 },
 {
  title: '半场比分',
  dataIndex: 'gameHalfTimeSocre',
  key: 'gameHalfTimeSocre',
 },
 {
  title: '全场比分',
  dataIndex: 'gameScore',
  key: 'gameScore',
 },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button onClick={(e)=>{this.handleUpdate(e,record)}}>修改</Button>
            </span>
        ),
    }];
    return(
        <div className="gutter-example">
        <BreadcrumbCustom first="表格" second="规则列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="规则列表" bordered={false}>
                    <Button  onClick={this.handleAdd}>新增</Button> 

                    <BasicTable  columns={columns} data={this.state.data} pagination={pagination}/>
                    </Card>
                </div>
                <div className="gutter-box">

                </div>
            </Col>
        </Row>
        <Modal title={this.state.title}
          destroyOnClose
          visible={this.state.updatevisible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <UpdateRuleForms ref="getFormVlaue" record={this.state.record}/>
        </Modal>
 
         <Modal title={this.state.title}
         
          visible={this.state.addvisible}
          onOk={this.addHandleOk}
          // confirmLoading={confirmLoading}
          onCancel={this.addHandleCancel}
        >
          <UpdateRuleForms ref="getFormVlaue1" record={this.state.record}/>
        </Modal>

    </div>
    );
  }

}

export default BasicTables;