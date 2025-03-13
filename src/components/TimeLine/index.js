import classnames from 'classnames';
import styles from './index.less';

const TimeLine = props => {
  const { list } = props;
  let arr = [];
  for (let i = 0; i < 24; i++) {
    arr.push(
      <div
        className={classnames({
          [styles.item]: true,
          [styles.long]: [0, 6, 12, 18].includes(i),
          [styles.middle]: [3, 9, 15, 21].includes(i),
          [styles.short]: ![0, 3, 6, 9, 12, 15, 18, 21].includes(i),
        })}
        key={i}
      >
        <span
          className={classnames({
            [styles.fill]: true,
            [styles.active]: list.length === 0 || (list.includes(i) && list.includes(i + 1)),
          })}
        ></span>
      </div>,
    );
  }
  return (
    <div className={styles.time_box}>
      <div className={styles.time_num}>
        <span style={{ left: -5 }}>0</span>
        <span style={{ left: 44 }}>6</span>
        <span style={{ left: 88 }}>12</span>
        <span style={{ left: 132 }}>18</span>
        <span style={{ left: 181 }}>24</span>
      </div>
      <div className={styles.time_line}>{arr}</div>
    </div>
  );
};

export default TimeLine;
