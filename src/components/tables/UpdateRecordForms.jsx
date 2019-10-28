/**
 * Created by hao.cheng on 2017/4/13.
 */

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,Select ,Tooltip} from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

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



class UpdateRecordForm extends Component {


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

 

      <Form className="rule-form" align="center">
        <FormItem>
          {getFieldDecorator('id', {
          
          })(
            <Input type='hidden'  placeholder="ID" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('recordDate', {
            // initialValue: moment('2019-01-01 00:00:00'),
            rules: [{ required: true, message: '请输入记录日期!' }],
          })(

          <DatePicker   style={{ width: 250 }}  format="YYYY-MM-DD 00:00:00"  placeholder="记录日期"/>
            // <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="赛事时间" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('recordAccount', {
            rules: [{ required: true, message: '请输入账户!' }],
          })(
            <Input style={{ width: 250 }} prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} value={this.props.recordAccount} />} placeholder="账户名称" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('recordCount', {
            rules: [{ required: true, message: '请输入数据条数!' }],
          })(
            <NumericInput style={{ width: 250 }}  placeholder="数据条数"/>

          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('recordAmount', {
            rules: [{ required: true, message: '请输入下注金额!' }],
          })(
            <NumericInput style={{ width: 250 }}  placeholder="下注金额"/>

          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('recordValidAmount', {
            rules: [{ required: true, message: '请输入有效金额!' }],
          })(
            <NumericInput style={{ width: 250 }}  placeholder="有效金额"/>

          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('recordGain', {
            rules: [{ required: true, message: '请输入输赢金额!' }],
          })(
            <NumericInput style={{ width: 250 }}   placeholder="输赢金额"/>

          )}
        </FormItem>


        <FormItem>
          {getFieldDecorator('gameUserId', {
            rules: [{ required: true, message: '请选择操作用户!' }],
          })(
            <Select style={{ width: 250 }}>
                <Option value="">全部</Option>
                {this.props.userList?this.props.userList.map(user => <Option key={user.userId} value={user.userId}>{user.userNickName}</Option>) :""}
            </Select>
          )}
        </FormItem>

      </Form>
    );
  }

}

const UpdateRecordForms = Form.create({
  mapPropsToFields(props){
    return props.record?{
      id:Form.createFormField({
        value:props.record.id
      }),
      recordDate:Form.createFormField({
        value:moment(props.record.recordDate)
      }),
      recordAccount:Form.createFormField({
        value:props.record.recordAccount
      }),
      recordCount:Form.createFormField({
        value:props.record.recordCount
      }),
      recordAmount:Form.createFormField({
        value:props.record.recordAmount
      }),
      recordValidAmount:Form.createFormField({
        value:props.record.recordValidAmount
      }),
      recordGain:Form.createFormField({
        value:props.record.recordGain
      }),
      gameUserId:Form.createFormField({
        value: props.record.gameUserId
      })
    }:{}
  }
})(UpdateRecordForm);

export default UpdateRecordForms;