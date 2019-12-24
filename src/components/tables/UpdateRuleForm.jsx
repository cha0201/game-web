/**
 * Created by hao.cheng on 2017/4/13.
 */

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,Tooltip,Select } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if(value){
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        onChange(value.slice(0, -1));
      }
      if (onBlur) {
        onBlur();
      }
    }
  };

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
    ) : (
      'Input a number'
    );
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          maxLength={25}
        />
      </Tooltip>
    );
  }
}



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
          {getFieldDecorator('dwId', {
            rules: [{ required: true, message: '请选择联赛列表!' }],
          })(
            <Select style={{ width: 250 }}>
                <Option value="">全部</Option>
                {this.props.dwIdList?this.props.dwIdList.map(dwId => <Option key={dwId} value={dwId}>{dwId}</Option>) :""}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('dc', {
            rules: [{ required: true, message: '请输入对冲点位!' }],
          })(
            <NumericInput style={{ width: 250 }}  placeholder="对冲点位"/>

          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('jc', {
            rules: [{ required: true, message: '请输入建仓点位!' }],
          })(
            <NumericInput style={{ width: 250 }}  placeholder="建仓点位"/>

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