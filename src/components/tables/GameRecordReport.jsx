import React from 'react';

import {  Row, Col, Card,Upload, message, Button, Icon,Select } from 'antd';
import * as config from '../../axios/config';
import BasicTable from './BasicTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import {getRuleTaskList,exportTaskData,getGameRecordAccountList,getGameUserList,getGameStatisticsList} from '../../axios/index'
import { connect } from 'react-redux'
import moment from 'moment'
const { Option } = Select;


class GameRecordReport extends React.Component{

    constructor(props){
        super(props)
        this.state={
            accountValue: "",
            userValue: "",
            timeValue: "",
            taskList:[],
            fileList: [],
            currentPage: 1,
            accountList: [],
            userList:[],
            statisticsList:[]
        }
    };


    componentDidMount(){

        this.gameRecordAccountList();
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

    gameStatisticsList=()=>{
        getGameStatisticsList(this.state.timeValue,this.state.accountValue,this.state.userValue).then(value=>{
            this.setState({
                statisticsList: value
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
        this.setState({
            currentPage: page,
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

    getUrl=()=>{
        console.log("location")
        let ruleNo=this.props.match.params.ruleId;

        const city=this.state.areaValue;
        const cardType=this.state.carrierValue;


        const data = {
            name: 'txtFile',
            action: config.baseUrl+ '/regional/upload?ruleNo='+ruleNo+'&city='+city+"&cardType="+cardType,
            headers: {
                authorization: 'authorization-text',
            },
            multiple: true
        };
        return data
    }

    handleTimeChange=(value)=>{
        console.log(`selected ${value}`);
        this.setState({
            timeValue: value
        })
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

    exportData=(e,record)=>{
        const url="http://39.104.80.236/Data"+record.filePath;
        // config.baseUrl+`/task/export`
        // exportTaskData(record.taskId,url)

        // config.baseUrl+`/task/export?taskId=`+record.taskId+`&url=`+url
        window.location.href=config.baseUrl+`/task/export?taskId=`+record.taskId+`&url=`+url

    }



    render(){
        const pagination={
            current: this.state.currentPage,
            onChange: this.changePage,
        };


        const columns = [{
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },
            {
                title: '账号',
                dataIndex: 'account',
                key: 'account',
            }, {
                title: '下注笔数',
                dataIndex: 'pourNum',
                key: 'pourNum',
            },
            {
                title: '下注金额',
                dataIndex: 'pourAmount',
                key: 'pourAmount',
            }, {
                title: '有效金额',
                dataIndex: 'effectAmount',
                key: 'effectAmount',
            }, {
                title: '输赢',
                dataIndex: 'profitAmount',
                key: 'profitAmount',
            }, {
                title: '操作用户',
                dataIndex: 'operator',
                key: 'operator',
            }];


        return (
            <div>

                <div><h3>报表统计查询</h3></div>
                <div>     </div>
                <div>     </div>
                <div>
                    <Select  placeholder="按时间"  style={{ width: 138 }} onChange={this.handleTimeChange}>
                        <Option value="">全部</Option>
                        <Option value="1">本周</Option>
                        <Option value="2">上周</Option>
                        <Option value="3">本月</Option>
                    </Select>
                    <br/>
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
                <Button onClick={this.gameStatisticsList}>查询</Button>

                <br/>

                <div className="gutter-example">
                    <Row gutter={16}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card title="统计查询列表" bordered={false}>
                                    <BasicTable  columns={columns} data={this.state.statisticsList} pagination={pagination}/>
                                </Card>
                            </div>
                            <div className="gutter-box">

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );


    }


}

const mapStateToProps = store => {
    return {
        ruleId: store.ruleId
    }
}



export default connect(mapStateToProps)(GameRecordReport);