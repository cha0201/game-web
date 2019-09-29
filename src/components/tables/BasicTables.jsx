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
import {getRuleList,updateRule,addRule} from '../../axios/index'
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
        data:[]      }
      };


      handleOk = (e) => {//点击对话框OK按钮触发的事件
        console.log();
//上面的代码可以忽略
        let demo=this.refs.getFormVlaue;//通过refs属性可以获得对话框内form对象
        demo.validateFields((err, values) => {
          if(!err){
            console.log('values====================')
            updateRule(values).then((res) => {
              if(res>0){
                this.loadRuleList('');
              }
            }
        )
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: false,
          updatevisible:false
        });
        }
      });
      }

      addHandleOk=() =>{
        console.log();

        let demo=this.refs.getFormVlaue1;//通过refs属性可以获得对话框内form对象
        demo.validateFields((err, values) => {
          if(!err){
            console.log('values====================')
            addRule(values).then((res) => {
              if(res>0){
                this.loadRuleList('');
                this.setState({
                  addvisible:false
                });//上面的代码可以忽略
              }
            }
        )
        }
      });
      }

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
        this.loadRuleList('');
     }
    
    loadRuleList=(ruleName)=>{
      getRuleList(ruleName).then(value=>{
        console.log("请求后台------------------------->>>>")
        console.log(value)
        this.setState({
          data: value
        });
});




    }

     
     

  render(){
  
    const { visible, confirmLoading, ModalText } = this.state;
    const columns = [{
        title: '规则编号',
        dataIndex: 'ruleId',
        key: 'ruleId',
        render: text => <span>{text}</span>,
    }, {
        title: '规则名称',
        dataIndex: 'ruleName',
        key: 'ruleName',
    }, {
        title: '名单库',
        dataIndex: 'listName',
        key: 'listName',
        render: (text, record)  => <span><a ><Link style={{ color: '#08c' }}  to={{ pathname: '/app/table/uploadPanel/'+record.ruleId+'/'+record.ruleName}}> {text}</Link></a> </span>,
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button onClick={(e)=>{this.handleUpdate(e,record)}}>修改</Button>
               <Link to={{ pathname: '/app/table/uploadRegionalPanel/'+record.ruleId+'/'+record.ruleName}} > <Button>筛选用户</Button> </Link>
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

                    <BasicTable  columns={columns} data={this.state.data}/>
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