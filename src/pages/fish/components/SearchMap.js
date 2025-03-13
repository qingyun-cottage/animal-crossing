import _STATUS from '@/pages/utils/status';
import { Select, Button, Switch, Row } from 'antd';

const { Option } = Select;

export default function(props) {
  let { value, onChange, isHide, onSwitch } = props;
  const changeValue = (val, name) => {
    onChange({ ...value, [name]: val });
  };

  const setCurrent = () => {
    const current_month = new Date().getMonth() + 1,
      current_hours = new Date().getHours();
    onChange({
      ...value,
      month: [current_month],
      start_time: current_hours,
      end_time: current_hours + 1,
    });
  };

  return (
    <Row align="middle">
      <Select
        allowClear
        mode="multiple"
        placeholder="选择月份"
        style={{ minWidth: 120, margin: '0 16px 16px 0' }}
        value={value.month}
        onChange={val => changeValue(val, 'month')}
      >
        {_STATUS['MONTH'].map(i => (
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        ))}
      </Select>
      <Select
        allowClear
        mode="multiple"
        placeholder="选择地点"
        style={{ minWidth: 120, margin: '0 16px 16px 0' }}
        value={value.place}
        onChange={val => changeValue(val, 'place')}
      >
        {_STATUS['FISH_PLACE'].map(i => (
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        ))}
      </Select>
      <Select
        allowClear
        mode="multiple"
        placeholder="选择鱼影"
        style={{ minWidth: 120, margin: '0 16px 16px 0' }}
        value={value.shape}
        onChange={val => changeValue(val, 'shape')}
      >
        {_STATUS['FISH_SHAPE'].map(i => (
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        ))}
      </Select>
      <RangeTime
        start_time={value.start_time}
        end_time={value.end_time}
        changeValue={changeValue}
      />
      <Button type="primary" style={{ margin: '0 16px 16px 0' }} onClick={() => setCurrent()}>
        当前日期
      </Button>
      <Button style={{ margin: '0 16px 16px 0' }} onClick={() => onChange({})}>
        重置
      </Button>
      <span style={{ marginBottom: 16 }}>
        过滤查询结果
        <Switch style={{ marginLeft: 6 }} checked={isHide} onChange={onSwitch} />
      </span>
    </Row>
  );
}

export const RangeTime = props => {
  const { start_time, end_time, changeValue } = props;

  let arr = [];
  for (let i = 0; i < 24; i++)
    arr.push(
      <Option key={i} value={i}>
        {i}:00
      </Option>,
    );

  return (
    <Row align="middle" style={{ margin: '0 16px 16px 0' }}>
      <Select
        allowClear
        value={start_time}
        onChange={val => changeValue(val, 'start_time')}
        placeholder="开始时间"
        style={{ width: 105 }}
      >
        {arr}
      </Select>
      <span style={{ margin: '0 6px' }}>—</span>
      <Select
        allowClear
        value={end_time}
        onChange={val => changeValue(val, 'end_time')}
        placeholder="结束时间"
        style={{ width: 105 }}
      >
        {arr}
      </Select>
    </Row>
  );
};
