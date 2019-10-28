import React from 'react';

import {  Row, Col, Card,Upload, message, Button, Icon,Select,Modal } from 'antd';
import * as config from '../../axios/config';
import BasicTable from './BasicTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import {getRuleTaskList,exportTaskData,getGameRecordAccountList,getGameUserList,gameRecordList,updateGameRecord} from '../../axios/index'
import { connect } from 'react-redux'
import moment from 'moment'
import UpdateRecordForms from './UpdateRecordForms';

const { Option } = Select;


class GameRecordList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            accountValue: "",
            userValue: "",
            timeValue: "",
            taskList:[],
            fileList: [],
            currentPage: 1,
            pageSize: 10,
            accountList: [],
            userList:[],
            gameRecordList:[],
            visible: false,
            title: "",
            record: {},
            total: 0
        }
    };


    componentDidMount(){

        this.gameRecordAccountList();
        this.gameRecordList();
        this.gameUserList();

        // this.loadRuleTaskList(ruleId);
    }

    gameRecordAccountList=()=>{
        getGameRecordAccountList().then(value=>{
            this.setState({
                accountList: value
            })
        });
    }

    gameUserList=()=>{
        getGameUserList().then(value=>{
            this.setState({
                userList: value
            })
        });
    }

//  getGameStatisticsList()

    gameRecordList=()=>{
        gameRecordList(this.state.currentPage,this.state.pageSize,this.state.accountValue,this.state.userValue).then(value=>{
            this.setState({
                total: value.total,
                currentPage: value.pageNum,
                gameRecordList: value.data,
               
            })
        });
    }


//  loadRuleTaskList=(ruleId)=>{
//   getRuleTaskList(ruleId,"2").then(value=>{
//     console.log("请求后台------------------------->>>>")
//     console.log(value)
//     this.setState({
//       taskList: value
//     })
//   });
//   }


    changePage=(page,pageSize)=>{
        console.log(`page:${page},pageSize:${pageSize}`)

        gameRecordList(page,pageSize,this.state.accountValue,this.state.userValue).then(value=>{
            this.setState({
                total: value.total,
                currentPage: value.pageNum,
                gameRecordList: value.data,
                pageSize: pageSize
            })
        });


        this.setState({
            currentPage: page,
            pageSize: pageSize
        })
        
    }

    handleChange=(info)=> {
        let fileList=info.fileList
        // fileList = fileList.slice(-3);
        this.setState({ fileList });
        console.log(`handle change upload file: ${info}`);

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log("done");
            let ruleId=this.props.match.params.ruleId;
            this.loadRuleTaskList(ruleId);
            message.success(`${info.file.name} file uploaded successfully`);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    handleAccountChange=(value)=>{
        console.log(`selected ${value}`);
        this.setState({
            accountValue: value
        })
    }

    handleUserChange=(value)=>{
        console.log(`selected ${value}`);
        this.setState({
            userValue: value
        })

    }

    
    handleUpdate = (e,record) => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        console.log(record.operator);
        const user=this.state.userList.filter(user=>user.userNickName==record.operator)[0]
        record.gameUserId=user?user.userId:'';
        console.log(record);
        
        this.setState({
          visible: true,
          title:record.gameUserId?"修改比赛记录" :"新增比赛记录",
          record: record
        });
    
      }

      addHandleCancel = () => {//点击取消按钮触发的事件
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      }
      
      addHandleOk=() =>{
        console.log();

        let demo=this.refs.getFormVlaue1;//通过refs属性可以获得对话框内form对象
        demo.validateFields((err, values) => {
          if(!err){
            console.log(`values====================${values}`)
            updateGameRecord(values).then(value=>{
                if(value>0){
                    this.setState({
                        visible:false
                      });
                      this.gameRecordList();
                }
            })
        }
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


        const columns = [{
            title: '日期',
            dataIndex: 'recordDate',
            key: 'recordDate',
            render: (text, record) => (
                <span>
                   {moment(record.recordDate).format('YYYY-MM-DD 00:00:00')} 
                </span>
            ),
           
        },
            {
                title: '账号',
                dataIndex: 'recordAccount',
                key: 'recordAccount',
            }, {
                title: '下注笔数',
                dataIndex: 'recordCount',
                key: 'recordCount',
            },
            {
                title: '下注金额',
                dataIndex: 'recordAmount',
                key: 'recordAmount',
            }, {
                title: '有效金额',
                dataIndex: 'recordValidAmount',
                key: 'recordValidAmount',
            }, {
                title: '输赢',
                dataIndex: 'recordGain',
                key: 'recordGain',
            }, {
                title: '操作用户',
                dataIndex: 'operator',
                key: 'operator',
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button onClick={(e)=>{this.handleUpdate(e,record)}}>修改</Button>
                    </span>
                ),
              }];


        return (
            <div>

                <div><h3>比赛记录查询</h3></div>
                <div>     </div>
                <div>     </div>
                <div>
                    <br/>

                    <Select    placeholder="按账号" style={{ width: 138 }} onChange={this.handleAccountChange}>
                    <Option value="">全部</Option>
                        {this.state.accountList.map(account => <Option key={account.key}>{account.value}</Option>)}
                        {/* <Option value="1">666</Option> */}
                    </Select>
                    <br/>
                    <br/>
                    <Select     placeholder="按操作用户" style={{ width: 138 }} onChange={this.handleUserChange}>
                    <Option value="">全部</Option>
                        {this.state.userList.map(user => <Option key={user.userId}>{user.userNickName}</Option>)}
                    </Select>
                </div>
                <br/>
                {/* <div>
            <Upload {...this.getUrl()} onChange={this.handleChange} fileList={this.state.fileList}>
            <Button>
              <Icon type="upload" /> 点击上传数据
            </Button>
          </Upload>
          </div> */}
                <br/>
                <Button onClick={this.gameRecordList}>查询</Button>

                <br/>

                <div className="gutter-example">
                    <Row gutter={16}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card title="比赛记录列表" bordered={false}>
                                <Button onClick={(e)=>{this.handleUpdate(e,{})}}>新增</Button> 
                                    <BasicTable  columns={columns} data={this.state.gameRecordList} pagination={pagination}/>
                                </Card>
                            </div>
                            <div className="gutter-box">

                            </div>
                        </Col>
                    </Row>
                    <Modal title={this.state.title} visible={this.state.visible} onOk={this.addHandleOk} onCancel={this.addHandleCancel} >
                     <UpdateRecordForms ref="getFormVlaue1" record={this.state.record} userList={this.state.userList}/>
                    </Modal>
                </div>
            </div>
        );


    }


}

// const mapStateToProps = store => {
//     return {
//         ruleId: store.ruleId
//     }
// }



export default GameRecordList;