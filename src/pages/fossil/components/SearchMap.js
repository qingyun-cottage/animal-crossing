import { Input, Button, Row } from 'antd';

export default function(props) {
  let { value, onChange } = props;
  const changeValue = (val, name) => {
    onChange({ ...value, [name]: val });
  };

  return (
    <Row align="middle">
      <Input
        style={{ width: 160, margin: '0 16px 16px 0' }}
        placeholder="请输入关键字筛选"
        onChange={({ target }) => changeValue(target.value, 'name')}
      />
      <Button style={{ margin: '0 16px 16px 0' }} onClick={() => onChange({})}>
        重置
      </Button>
    </Row>
  );
}
