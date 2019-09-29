import React from 'react';
import * as config from '../../axios/config';
import { Upload, message, Button, Icon } from 'antd';
import {uploadRuleUserFile} from '../../axios/index'


class UploadPanel extends React.Component{

  constructor(props){
    super(props)

  };


  getUrl=()=>{
    let ruleId=this.props.match.params.ruleId;
    const data = {
      name: 'uploadFile',
      action: config.baseUrl+ '/rule/upload/'+ruleId,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
    
          // const formData = new FormData();
          // formData.append('uploadFile', info.file);
          // console.log("this.props.location.query:")
          // console.log(this.props.location.query);
          // let ruleId=this.props.location.query.ruleNo;
          // uploadRuleUserFile(formData,ruleId)
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

  handleUploadFileOnChange=info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);

      const formData = new FormData();
      formData.append('uploadFile', info.file);
      console.log("this.props.location.query:")
      let ruleId=this.props.match.params.ruleId;
      uploadRuleUserFile(formData,ruleId)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
   
    render(){

        return (
          <div>
            <h3>规则{this.props.match.params.ruleName}名单库导入</h3>
            <Upload {...this.getUrl()}  >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
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


export default UploadPanel;