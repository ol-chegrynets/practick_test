import { useDispatch } from 'react-redux';
import styles from './Filter.module.css';
import { changeFilter } from '../../redux/filter/filterSlice';
export const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <input
      onChange={handleChange}
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
};
