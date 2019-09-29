import React from 'react';

import {  Row, Col, Card,Upload, message, Button, Icon,Select } from 'antd';
import * as config from '../../axios/config';
import BasicTable from './BasicTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link } from 'react-router-dom'; 
import {getRuleTaskList} from '../../axios/index'
import { connect } from 'react-redux'

const { Option } = Select;


class UploadRegionalPanel extends React.Component{

  constructor(props){
    super(props)
    this.state={
      areaValue:"",
      carrierValue:"",
      taskList:[]
    }
  };


  componentDidMount(){
    let ruleId=this.props.match.params.ruleId;

    this.loadRuleTaskList(ruleId);
 }

 loadRuleTaskList=(ruleId)=>{
  getRuleTaskList(ruleId).then(value=>{
    console.log("请求后台------------------------->>>>")
    console.log(value)
    this.setState({
      taskList: value
    })
  });
  }

 handleChange=(value)=> {
    console.log(`selected ${value}`);
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
      onChange(info) {

        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return data
  }
  
  handleAreaChange=(value)=>{
    console.log(`selected ${value}`);
    this.setState({
      areaValue:value
    })
  }　

  handleCarrierChange=(value)=>{
    console.log(`selected ${value}`);
    this.setState({
      carrierValue:value
    })
  }　

  exportData=(e,path)=>{
    window.location.href="http://39.104.80.236/Data"+path;
  }


   
    render(){
      const columns = [{
        title: '任务编号',
        dataIndex: 'ruleId',
        key: 'taskId',
        render: text => <span>{text}</span>,
    }, {
        title: '规则名称',
        dataIndex: 'ruleName',
        key: 'ruleName',
        render: (text, record)  => (
          <span> {this.props.match.params.ruleName} </span>
        )
    },
    {
      title: '上传条数',
      dataIndex: 'commitNum',
      key: 'commitNum',
  }, {
      title: '处理结果条数',
      dataIndex: 'resultNum',
      key: 'resultNum',
  }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record)  => (
        <span> {record.status=="2"? "入库中":record.status=="3"?"处理完毕":"待处理"} </span>
      )
  }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button onClick={(e)=>{this.exportData(e,record.filePath)}} disabled={record.status=="3"?false:true}>下载</Button>
               {/* <Link to={{ pathname: '/app/table/uploadRegionalPanel', query:{ruleNo: record.ruleId,ruleName:record.ruleName}}} > <Button>筛选用户</Button> </Link> */}
            </span>
        ),
    }];


        return (
          <div>

           <div><h3>规则{this.props.match.params.ruleName}用户数据导入</h3></div>
            <div>     </div>
            <div>     </div>
            <div>
          <Select  defaultValue="" placeholder="选择地域" style={{ width: 138 }} onChange={this.handleAreaChange}>
            <Option value="">全部</Option>
            <Option value="1">兴业银行</Option>
            <Option value="2">中信银行</Option>
          </Select>
          <br/>
          <br/>
          
          <Select   defaultValue="" placeholder="选择运营商" style={{ width: 138 }} onChange={this.handleCarrierChange}>
            <Option value="">全部</Option>
            <Option value="1">中国联通</Option>
            <Option value="2">中国移动</Option>
            <Option value="3" >中国电信</Option>
          </Select>
          </div>
          <br/>
          <div>            
            <Upload {...this.getUrl()}>
            <Button>
              <Icon type="upload" /> 点击上传数据
            </Button>
          </Upload>
          </div>
          <br/>
          <br/>

          <div className="gutter-example">
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="任务列表" bordered={false}>
                    <BasicTable  columns={columns} data={this.state.taskList}/>
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



export default connect(mapStateToProps)(UploadRegionalPanel);