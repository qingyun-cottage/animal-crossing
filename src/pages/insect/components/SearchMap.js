import _STATUS from '@/pages/utils/status';
import { RangeTime } from '../../fish/components/SearchMap';
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
        dropdownMatchSelectWidth={false}
        onChange={val => changeValue(val, 'place')}
      >
        {_STATUS['INSECT_PLACE'].map(i => (
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        ))}
      </Select>
      <Select
        allowClear
        placeholder="选择天气"
        style={{ width: 120, margin: '0 16px 16px 0' }}
        value={value.condit}
        onChange={val => changeValue(val, 'condit')}
      >
        {_STATUS['INSECT_CONDIT'].map(i => (
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
