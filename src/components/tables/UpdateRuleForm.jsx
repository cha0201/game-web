/**
 * Created by hao.cheng on 2017/4/13.
 */

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class UpdateRuleForm extends Component {


    //   state={
    //     columns:[],
    //     data:[],
    //     ruleId: this.props.record.ruleId,
    //     ruleName: this.props.record.ruleName,
    //     listName: this.props.record.listName
    //   }


    // componentDidMount() {
    //     this.props.form.setFieldsValue({
    //         ruleId: this.props.record.ruleId,
    //         ruleName: this.props.record.ruleName,
    //         listName: this.props.record.listName
    //      });

    //     console.log(this.props.form.setFieldsValue);
    // }
    


    
  render() {
    const { getFieldDecorator } = this.props.form;

    return (

 

      <Form className="rule-form">
        <FormItem>
          {getFieldDecorator('ruleId', {
          
          })(
            <Input type='hidden'  placeholder="规则ID" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('ruleName', {
            rules: [{ required: true, message: '请输入规则名称!' }],
          })(
            <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} value={this.props.ruleName} />} placeholder="规则名称" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('listName', {
            rules: [{ required: true, message: '请输入名单库名称!' }],
          })(
            <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="名单库名称" />
          )}
        </FormItem>
      </Form>
    );
  }

}

const UpdateRuleForms = Form.create({
  mapPropsToFields(props){
    return props.record?{
      ruleId:Form.createFormField({
        value:props.record.ruleId
      }),
      ruleName:Form.createFormField({
        value:props.record.ruleName
      }),
      listName:Form.createFormField({
        value:props.record.listName
      })
    }:{}
  }
})(UpdateRuleForm);

export default UpdateRuleForms;