import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from 'react-icons/rx';
import { useMediaQuery } from 'react-responsive';
import { createAnArray, getPagesCut } from '../../utils';
import styles from './Pagination.module.css';
import PaginationItem from './PaginationItem';

function Pagination({ currentPage, total, limit, onPageChange }) {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const pagesCount = Math.ceil(total / limit);
  const pagesCutCount = isTablet ? 5 : 3;
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount, currentPage });
  const pages = createAnArray(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <>
      {total > 0 ? (
        <div className={styles.wrapper}>
          <ul className={styles.pagination}>
            <PaginationItem
              page={isTablet ? 'First' : <RxDoubleArrowLeft />}
              currentPage={currentPage}
              onPageChange={() => onPageChange(1)}
              isDisabled={isFirstPage}
            />
            <PaginationItem
              page={isTablet ? 'Prev' : <RxChevronLeft />}
              currentPage={currentPage}
              onPageChange={() => onPageChange(currentPage - 1)}
              isDisabled={isFirstPage}
            />
            {pages.map(page => (
              <PaginationItem
                key={page}
                page={page}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            ))}
            <PaginationItem
              page={isTablet ? 'Next' : <RxChevronRight />}
              currentPage={currentPage}
              onPageChange={() => onPageChange(currentPage + 1)}
              isDisabled={isLastPage}
            />
            <PaginationItem
              page={isTablet ? 'Last' : <RxDoubleArrowRight />}
              currentPage={currentPage}
              onPageChange={() => onPageChange(pagesCount)}
              isDisabled={isLastPage}
            />
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default Pagination;
