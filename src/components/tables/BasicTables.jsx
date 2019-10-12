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
import {getGameList,getGameTaskList,addGameTask} from '../../axios/index'
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
        status:1,
        title:"",
        data:[],
        total:0,
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


      addHandleOk=() =>{
        console.log();

        let demo=this.refs.getFormVlaue1;//通过refs属性可以获得对话框内form对象
        demo.validateFields((err, values) => {
          if(!err){
            console.log('values====================')
            addGameTask(values).then((res) => {
              if(res>0){
                this.loadGameTaskList();
                this.setState({
                  addvisible:false
                });//上面的代码可以忽略
              }
            }
        )
        }
      });
      }

      

      handleAdd = () => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        this.setState({
          addvisible: true,
          title:"新增查询任务",
          record: {}
        });
      }


    
      componentDidMount(){
        this.loadGameTaskList();
     }

    
     loadGameTaskList=()=>{
      getGameTaskList(this.state.currentPage,this.state.pageSize).then(value=>{
        console.log("请求后台------------------------->>>>")
        this.setState({
          data: value.data,
          total: value.total,
        });
      });
    }

   
    changePage=(page,pageSize)=>{
      console.log(`page:${page},pageSize:${pageSize}`)
      getGameTaskList(page,pageSize).then(value=>{
        console.log("请求后台------------------------->>>>")
        this.setState({
          data: value.data,
          total: value.total,
          currentPage: value.pageNum
        });
      });

      
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
        title: '任务编号',
        dataIndex: 'taskId',
        key: 'taskId',
    }, {
        title: '查询条件',
        dataIndex: 'condition',
        key: 'condition',
    }, 
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
 },
 {
  title: '任务状态',
  dataIndex: 'status',
  key: 'status',
  render: (text, record) => (
    <span>
       {text=="4"?"处理失败":text=="2"? "入库中":text=="3"?"处理完毕":"待处理"}
    </span>
),
},{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
             <Link to={{ pathname: '/app/table/gameTaskDetail/'+record.taskId+'/'+record.name}} > <Button>任务详情</Button> </Link>
          </span>
      ),

    }];
    return(
        <div className="gutter-example">
        <BreadcrumbCustom first="表格" second="查询任务列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="任务列表" bordered={false}>
                    <Button  onClick={this.handleAdd}>新建任务</Button> 

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