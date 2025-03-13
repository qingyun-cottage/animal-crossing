import { useState } from 'react';
import { Row, Button, Switch } from 'antd';
import TimeLine from '@/components/TimeLine';
import SearchMap from './components/SearchMap';
import { ImgCard, InfoCard, MonthComp } from '../fish/FishMap';
import {
  initListToMap,
  initWidth,
  requireImg,
  getMarkInfo,
  setMarkInfo,
  setConfigInfo,
  getConfigInfo,
} from '@/pages/utils/utils';
import { initStatus } from '@/pages/utils/status';
import insect_config from '@/pages/utils/insect_config';

import styles from '../fish/FishMap.less';

export default function(props) {
  const ac_config = getConfigInfo(); // 读取开关配置

  const [current, setCurrent] = useState({}), // 当前选中
    [search, setSearch] = useState({}), // 搜索条件
    [isHideSearch, setHideSearch] = useState(ac_config.hide_search ? true : false), // 是否过滤查询结果
    [isHideMark, setHideMark] = useState(ac_config.hide_mark ? true : false), // 是否过滤标记结果
    [mark_mode, setMarkMode] = useState(false), // 是否标记模式
    [mark_list, setMarkList] = useState(getMarkInfo('mango_insect')), // 标记列表
    { local } = props,
    list = initListToMap(
      insect_config,
      isHideSearch,
      local,
      search,
      'INSECT',
      isHideMark,
      mark_list,
    );

  // 储存/取消标记的物种
  const saveMarkInfo = id => {
    let arr = [];
    if (mark_list.includes(id)) {
      arr = mark_list.filter(i => i !== id);
    } else {
      arr = [...mark_list, id];
    }
    setMarkList(arr);
    setMarkInfo(arr, 'mango_insect');
  };

  return (
    <>
      <div className={styles.control}>
        <SearchMap
          isHide={isHideSearch}
          onSwitch={value => {
            setHideSearch(value);
            setConfigInfo({ ...ac_config, hide_search: value });
          }}
          value={search}
          onChange={value => setSearch(value)}
        />
        <div style={{ marginBottom: 0 }}>
          <Button style={{ marginRight: 16 }} onClick={() => setMarkMode(!mark_mode)}>
            {mark_mode ? '退出标记模式' : '标记我有的虫'}
          </Button>
          <span>
            过滤已标记的昆虫
            <Switch
              style={{ marginLeft: 6 }}
              checked={isHideMark}
              onChange={() => {
                let value = !isHideMark;
                setHideMark(value);
                setConfigInfo({ ...ac_config, hide_mark: value });
              }}
            />
          </span>
        </div>
      </div>
      {current.id ? (
        <Row className={styles.info_content}>
          <img
            className={styles.close}
            onClick={() => setCurrent({})}
            src={requireImg('', `close.png`)}
            alt="关闭"
          />
          <InfoCard title="活跃月份">
            <MonthComp
              local={local}
              active={local === 'north' ? current.month_n : current.month_s}
            />
          </InfoCard>
          <InfoCard title="活跃时间">
            <TimeLine list={initStatus(current.time, 'INSECT_TIME', 'list')} />
            <p>{initStatus(current.time, 'INSECT_TIME')}</p>
          </InfoCard>
          <InfoCard title="售价">{current.price}</InfoCard>
          <InfoCard title="地点">
            {initStatus(current.place, 'INSECT_PLACE')}
            {current.desc && <span>({current.desc})</span>}
          </InfoCard>
          <InfoCard title="天气">{initStatus(current.condit, 'INSECT_CONDIT')}</InfoCard>
          <InfoCard title="译名">
            <div>英：{current.eng_name}</div>
            <div>日：{current.jap_name}</div>
          </InfoCard>
        </Row>
      ) : (
        <Row className={styles.info_content}>
          <InfoCard title="活跃月份">
            <MonthComp />
          </InfoCard>
          <InfoCard title="活跃时间"></InfoCard>
          <InfoCard title="售价"></InfoCard>
          <InfoCard title="地点"></InfoCard>
          <InfoCard title="天气"></InfoCard>
          <InfoCard title="译名"></InfoCard>
        </Row>
      )}
      <div className={styles.container} style={{ marginTop: 16 }}>
        <div className={styles.card_list} style={{ width: initWidth(list.length) }}>
          {list.map(i => (
            <ImgCard
              key={i.id}
              info={i}
              type="insect"
              type_status="INSECT"
              current={current}
              search={search}
              local={local}
              isHide={isHideSearch}
              mark_list={mark_list}
              months={local === 'north' ? i.month_n : i.month_s}
              onClick={() => {
                if (mark_mode) {
                  saveMarkInfo(i.id);
                } else {
                  setCurrent(current.id === i.id ? {} : i);
                }
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
