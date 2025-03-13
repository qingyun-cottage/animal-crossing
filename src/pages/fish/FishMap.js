import { useState } from 'react';
import { Row, Button, Switch } from 'antd';
import classnames from 'classnames';
import SearchMap from './components/SearchMap';
import TimeLine from '@/components/TimeLine';
import overTips from '@/assets/over_tips.png';
import nextTips from '@/assets/next_tips.png';
import {
  initListToMap,
  requireImg,
  initCanGet,
  isNeedWarning,
  isNextWarning,
  initWidth,
  getMarkInfo,
  setMarkInfo,
  setConfigInfo,
  getConfigInfo,
} from '@/pages/utils/utils';
import { initStatus } from '@/pages/utils/status';
import fish_config from '@/pages/utils/fish_config';

import styles from './FishMap.less';

export default function(props) {
  const ac_config = getConfigInfo(); // 读取开关配置

  const [current, setCurrent] = useState({}), // 当前选中
    [search, setSearch] = useState({}), // 搜索条件
    [isHideSearch, setHideSearch] = useState(ac_config.hide_search ? true : false), // 是否过滤查询结果
    [isHideMark, setHideMark] = useState(ac_config.hide_mark ? true : false), // 是否过滤标记结果
    [mark_mode, setMarkMode] = useState(false), // 是否标记模式
    [mark_list, setMarkList] = useState(getMarkInfo('mango_fish')), // 标记列表
    { local } = props,
    list = initListToMap(fish_config, isHideSearch, local, search, 'FISH', isHideMark, mark_list);

  // 储存/取消标记的物种
  const saveMarkInfo = id => {
    let arr = [];
    if (mark_list.includes(id)) {
      arr = mark_list.filter(i => i !== id);
    } else {
      arr = [...mark_list, id];
    }
    setMarkList(arr);
    setMarkInfo(arr, 'mango_fish');
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
            {mark_mode ? '退出标记模式' : '标记我有的鱼'}
          </Button>
          <span>
            过滤已标记的鱼
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
            <TimeLine list={initStatus(current.time, 'FISH_TIME', 'list') || []} />
            <p>{initStatus(current.time, 'FISH_TIME')}</p>
          </InfoCard>
          <InfoCard title="售价">{current.price}</InfoCard>
          <InfoCard title="地点">{initStatus(current.place, 'FISH_PLACE')}</InfoCard>
          <InfoCard title="鱼影">
            {initStatus(current.shape, 'FISH_SHAPE')}
            {/* <img
              src={requireImg('fish_shape/', `${initStatus(current.shape, 'FISH_SHAPE')}.png`)}
              alt="鱼影"
            /> */}
          </InfoCard>
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
          <InfoCard title="鱼影"></InfoCard>
          <InfoCard title="译名"></InfoCard>
        </Row>
      )}
      <div className={styles.container} style={{ marginTop: 16 }}>
        <div className={styles.card_list} style={{ width: initWidth(list.length) }}>
          {list.map(i => (
            <ImgCard
              key={i.id}
              info={i}
              type="fish"
              type_status="FISH"
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

// 图鉴卡片
export const ImgCard = props => {
  const {
    info,
    local,
    months,
    isHide,
    current,
    search,
    onClick,
    type,
    type_status,
    mark_list,
  } = props;
  return (
    <div
      className={classnames({
        [styles.card]: true,
        [styles.canGet]: !isHide && initCanGet(local, info, search, type_status),
        [styles.active]: info.id === current.id,
        [styles.isMark]: mark_list.includes(info.id),
      })}
      onClick={onClick}
    >
      <img className={styles.pic} src={requireImg(`${type}/`, `${info.id}.png`)} alt="图标" />
      <div>{info.name.length > 6 ? `${info.name.substring(0, 6)}...` : info.name}</div>
      <div style={{ fontSize: 12 }}>￥{info.price}</div>
      <img
        alt="过期提醒"
        className={classnames({
          [styles.tips_img]: true,
          [styles.show]: isNeedWarning(months),
        })}
        src={overTips}
      />
      <img
        alt="即将上线"
        className={classnames({
          [styles.next_img]: true,
          [styles.show]: isNextWarning(months),
        })}
        src={nextTips}
      />
    </div>
  );
};

// 标题信息
export const InfoCard = props => (
  <div className={styles.info_card}>
    <div className={styles.title}>{props.title}</div>
    <div>{props.children}</div>
  </div>
);

// 月份组件
export const MonthComp = props => {
  let list = [],
    { active = [] } = props;
  for (let i = 0, dio = 12; i < dio; i++) {
    let bool = active.includes(i + 1) || active.length === 0 ? true : false;
    list.push(
      <div key={i}>
        <span className={bool ? styles.active : styles.normal}>{i + 1}月</span>
      </div>,
    );
  }
  return <div className={styles.month_table}>{list}</div>;
};
