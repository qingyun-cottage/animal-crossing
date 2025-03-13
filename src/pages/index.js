import Link from 'umi/link';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import { requireImg } from '@/pages/utils/utils';

import styles from './index.less';

const url_config = [
  { title: '鱼类图鉴', icon: 'fish_icon.jpg', url: '/fish' },
  { title: '昆虫图鉴', icon: 'insect_icon.jpg', url: '/insect' },
  { title: '化石图鉴', icon: 'fossil_icon.jpg', url: '/fossil' },
  { title: '相关备注', icon: 'help_icon.jpg', url: '/desc' },
];

export default function() {
  return (
    <div className={styles.phone}>
      <Row>
        {url_config.map((i, index) => (
          <Col span={8} key={index}>
            <Link to={i.url}>
              <img src={requireImg('', i.icon)} alt="图标" />
              <p>{i.title}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export const NavHeader = props => (
  <div className={styles.nav_container}>
    {url_config.map(i => (
      <Link
        key={i.url}
        className={classnames({
          [styles.nav_item]: true,
          [styles.active]: i.url === props.current,
        })}
        to={i.url}
      >
        <img src={requireImg('', i.icon)} alt="图标" />
        <span>{i.title}</span>
      </Link>
    ))}
  </div>
);
