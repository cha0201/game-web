/**
 * Created by hao.cheng on 2017/4/13.
 */

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
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
    // function onChange(dates, dateStrings) {
    //   console.log('From: ', dates[0], ', to: ', dates[1]);
    //   console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
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
          {getFieldDecorator('gameName', {
            rules: [{ required: true, message: '请输入赛事名称!' }],
          })(
            <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} value={this.props.gameName} />} placeholder="赛事名称" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('time', {
            rules: [{ required: true, message: '请输入赛事时间!' }],
          })(
            <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            // onChange={onChange}
          />
            // <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="赛事时间" />
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