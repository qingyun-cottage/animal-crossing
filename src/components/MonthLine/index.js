import styles from './index.less';

const MonthLine = props => {
  let list = [],
    { active = [] } = props;
  for (let i = 0, dio = 12; i < dio; i++) {
    let bool = active.includes(i + 1) || active.length === 0 ? true : false;
    list.push(
      <div key={i}>
        <span className={bool ? styles.active : styles.normal}>{i + 1}</span>
      </div>,
    );
  }
  return <div className={styles.month_table}>{list}</div>;
};

export default MonthLine;
