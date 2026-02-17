import { BookData } from './types';
import { intro } from './data/intro';
import { part1 } from './data/part1';
import { part2 } from './data/part2';
import { part3 } from './data/part3';
import { appendix } from './data/appendix';

export const BOOK_DATA: BookData = {
  title: "AI 뮤직 비즈니스",
  subTitle: "SUNO AI를 활용한 완벽한 수익 자동화 시스템",
  chapters: [
    intro,
    part1,
    part2,
    part3
  ],
  appendix: appendix
};