import React from 'react';
import * as config from '../../axios/config';
import { Upload, message, Button, Icon  ,Row, Col, Card,Input,Modal} from 'antd';
import BasicTable from './BasicTable';
import moment from 'moment'
import {getGameList} from '../../axios/index'

const { TextArea } = Input;

let len=0;

class GameTaskDetail extends React.Component{

  constructor(props){
    super(props)
    this.state={
      gameList:[],
      remark: '',
      status: 1,
      visible:false,
      taskId:"",
      fileList: [],
      currentPage: 1,
      pageSize: 10
    }
  };


  componentDidMount(){
    let taskId=this.props.match.params.taskId;

    this.loadGameList(taskId);
 }

 loadGameList=(taskId)=>{
  getGameList(taskId).then(task=>{
    console.log("请求后台------------------------->>>>")
    console.log(task)
    this.setState({
      gameList:  JSON.parse(task.result),
      status: task.status
    })
  });
  }


  beforeUpload=(file)=> {
    len=len+1;
    console.log(`length:${len}`)
    console.log(`file.type:${file.type}`)
    const isTxt = file.type === 'text/plain'
    if (!isTxt) {
      message.error('只能上传txt文件!');
    }

    const isLength=len<=4;

    if(!isLength){
      message.error('最多只能上传4个txt文件!');
    }

    console.log(`file before upload file.fileList:${file}`)
    
    return isTxt&&isLength;
  } 

  handleChange=(info)=> {
    console.log(`handle change upload file: ${info}`);
    let fileList=info.fileList
    // fileList = fileList.slice(-3);
    this.setState({ fileList });
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      console.log(`fileList:${fileList}`)
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

onChange = ({ target: { value } }) => {
  this.setState({ remark:value });
};


showConfirm=(e,taskId)=>{
  this.setState({
    visible: true,
    taskId:taskId
  });
}


// delTaskData=(taskId)=>{
//   let ruleId=this.props.match.params.ruleId;
//   delTask(ruleId,taskId).then(value=>{
//     if(value>0){
//       this.loadRuleTaskList(ruleId);
//     }
//   })

// }

  getUrl=()=>{
    let ruleId=this.props.match.params.ruleId;
    const data = {
      name: 'uploadFile',
      action: config.baseUrl+ '/rule/upload/'+ruleId+'?remark='+this.state.remark,
      headers: {
        authorization: 'authorization-text',
      },
      multiple: true
    };
    return data
  }

  handleUploadFileOnChange=info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);

      const formData = new FormData();
      formData.append('uploadFile', info.file);
      console.log("this.props.location.query:")
      let ruleId=this.props.match.params.ruleId;
    //   uploadRuleUserFile(formData,ruleId)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }


  okModal = () => {
    this.setState({
      visible: false,
    });
    this.delTaskData(this.state.taskId)
  };

  cancelModal = () => {
    this.setState({
      visible: false,
    });

    
  };

  changePage=(page,pageSize)=>{
    console.log(`page:${page},pageSize:${pageSize}`)
    this.setState({
      currentPage: page,
    })

    
  }

   
    render(){
      const pagination={
        current: this.state.currentPage,
        onChange: this.changePage,
      };


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
 }
//  ,{
//         title: '操作',
//         key: 'action',
//         render: (text, record) => (
//             // onClick={(e)=>{this.handleUpdate(e,record)}}
//             <span>
//                 <Button >修改</Button>
//             </span>
//         ),
//     }
];


        return (
          <div>
            <h3>任务{this.props.match.params.taskId}查询</h3>
            <h3>任务状态：{this.state.status=="4"?"处理失败":this.state.status=="2"? "入库中":this.state.status=="3"?"处理完毕":"待处理"}</h3>
          <br/>
          <br/>
          <br/>
          <div className="gutter-example">
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="赛事列表" bordered={false}>
                    <BasicTable  columns={columns} data={this.state.gameList} pagination={pagination}/>
                    </Card>
                </div>
                <div className="gutter-box">

                </div>
            </Col>
        </Row>
        </div>

        <Modal
          title="删除确认"
          visible={this.state.visible}
          onOk={this.okModal}
          onCancel={this.cancelModal}
          okText="确认"
          cancelText="取消"
        >

        </Modal>
      </div>

          // <div>
          // <h3>规则{this.props.location.query.ruleName}名单库导入</h3>
          // <Upload fileList={this.state.fileList}>     // Upload 为上传组件
          // <Button>
          //   <Icon type="upload" /> Select File
          // </Button>
          // </Upload>
          // <Button onClick={this.handleUpload}>
          //   上传文件
          // </Button>
          // </div>
        );
      

    }


}


export default GameTaskDetail;