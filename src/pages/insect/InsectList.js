import { Table, Row } from 'antd';
import MonthLine from '@/components/MonthLine';
import { requireImg } from '@/pages/utils/utils';
import insect_config from '@/pages/utils/insect_config';
import { initStatus } from '@/pages/utils/status';

import styles from '../fish/FishList.less';

export default function(props) {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '10%',
      fixed: 'left',
      render: (text, info) => (
        <Row>
          <img
            style={{ height: 24, marginRight: 6 }}
            src={requireImg(`insect/`, `${info.id}.png`)}
            alt="图片"
          />
          {text}
        </Row>
      ),
    },
    { title: '编号', dataIndex: 'id', width: '6%', sorter: (a, b) => a.id - b.id },
    { title: '英译', dataIndex: 'eng_name', width: '10%' },
    { title: '日译', dataIndex: 'jap_name', width: '10%' },
    { title: '价格', width: '5%', dataIndex: 'price', sorter: (a, b) => a.price - b.price },
    {
      title: '地点',
      dataIndex: 'place',
      width: '10%',
      sorter: (a, b) => a.place - b.place,
      render: text => initStatus(text, 'INSECT_PLACE'),
    },
    {
      title: '天气',
      dataIndex: 'condit',
      width: '10%',
      sorter: (a, b) => a.condit - b.condit,
      render: text => initStatus(text, 'INSECT_CONDIT'),
    },
    {
      title: '时间',
      dataIndex: 'time',
      width: '10%',
      sorter: (a, b) => a.time - b.time,
      render: text => initStatus(text, 'INSECT_TIME'),
    },
    {
      title: '月份',
      dataIndex: 'month',
      render: (_, { month_s, month_n }) => {
        const { local } = props,
          arr = local === 'north' ? month_n : month_s;
        return <MonthLine active={arr} />;
      },
    },
  ];

  return (
    <div className={styles.table}>
      <Table
        bordered
        size="small"
        dataSource={insect_config}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </div>
  );
}
