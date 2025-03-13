import { useState } from 'react';
import classnames from 'classnames';
import { NavHeader } from '../index';
import { Switch } from 'antd';
import fossilIcon from '@/assets/fossil_img.png';
import SearchMap from './components/SearchMap';
import {
  requireImg,
  getMarkInfo,
  setMarkInfo,
  setConfigInfo,
  getConfigInfo,
} from '@/pages/utils/utils';
import fossil_config from '@/pages/utils/fossil_config';
import styles from './index.less';

export default function(props) {
  const ac_config = getConfigInfo(); // 读取开关配置

  const initListToMap = (list, search, isHideMark, mark_list) => {
    if (isHideMark && mark_list.length > 0) {
      list = list.filter(i => !mark_list.includes(i.id) && i.price);
    }

    if (search && search.name) {
      list = list.filter(i => i.name.search(search.name) !== -1);
      return list;
    }

    let arr = [],
      index_arr = [0, 1, 2, 3, 4, 5];
    for (let i of index_arr) {
      for (let j = i, dio = list.length; j < dio; j = j + 6) arr.push(list[j]);
    }
    return arr;
  };

  const [search, setSearch] = useState({}), // 搜索条件
    [mark_list, setMarkList] = useState(getMarkInfo('mango_fossil')), // 标记列表
    [isHideMark, setHideMark] = useState(ac_config.hide_mark ? true : false), // 是否过滤标记结果
    list = initListToMap(fossil_config, search, isHideMark, mark_list);

  // 储存/取消标记的物种
  const saveMarkInfo = id => {
    let arr = [];
    if (mark_list.includes(id)) {
      arr = mark_list.filter(i => i !== id);
    } else {
      arr = [...mark_list, id];
    }
    setMarkList(arr);
    setMarkInfo(arr, 'mango_fossil');
  };

  return (
    <div style={{ padding: 16 }}>
      <NavHeader current="/fossil" />
      <div className={styles.container}>
        <SearchMap value={search} onChange={value => setSearch(value)} />
        <div style={{ marginBottom: 16 }}>
          过滤已拥有的化石
          <Switch
            style={{ marginLeft: 6 }}
            checked={isHideMark}
            onChange={() => {
              let value = !isHideMark;
              setHideMark(value);
              setConfigInfo({ ...ac_config, hide_mark: value });
            }}
          />
        </div>
        <div className={styles.card_list} style={{ width: 130 * Math.ceil(list.length / 6) }}>
          {list.map(i => (
            <ImgCard
              key={i.id}
              info={i}
              search={search}
              mark_list={mark_list}
              onClick={() => saveMarkInfo(i.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 图鉴卡片
const ImgCard = props => {
  const { info, onClick, mark_list } = props;
  return (
    <div
      className={classnames({
        [styles.card]: true,
        [styles.space]: info.price === 0 ? true : false,
        [styles.isMark]: mark_list.includes(info.id),
      })}
      onClick={onClick}
    >
      {info.img ? (
        <img
          className={styles.fossil_img}
          src={requireImg(`fossil/`, `${info.id}.png`)}
          alt="图标"
        />
      ) : (
        <img alt="占位符" className={styles.fossil_space} src={fossilIcon} />
      )}
      <div>{info.name}</div>
      <div style={{ fontSize: 12 }}>￥{info.price}</div>
    </div>
  );
};
