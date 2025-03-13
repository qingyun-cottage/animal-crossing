import { useState } from 'react';
import { Radio, Row } from 'antd';
import { NavHeader } from '../index';
import FishList from './FishList';
import FishMap from './FishMap';

export default function() {
  const [type, setType] = useState('map');
  const [local, setLocal] = useState('north');

  return (
    <div style={{ padding: 16 }}>
      <NavHeader current="/fish" />
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Radio.Group
          value={type}
          buttonStyle="solid"
          style={{ marginRight: 16 }}
          onChange={({ target }) => setType(target.value)}
        >
          <Radio.Button value="map">图鉴</Radio.Button>
          <Radio.Button value="list">表格</Radio.Button>
        </Radio.Group>
        <Radio.Group value={local} onChange={({ target }) => setLocal(target.value)}>
          <Radio value="north">北半球</Radio>
          <Radio value="south">南半球</Radio>
        </Radio.Group>
      </Row>
      {type === 'list' && <FishList local={local} />}
      {type === 'map' && <FishMap local={local} />}
    </div>
  );
}
