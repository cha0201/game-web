/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
import beauty from '@/style/imgs/beauty.jpg';

class Basic extends Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="权限管理" second="基础演示" />
            </div>

        )
    }
}

export default Basic;