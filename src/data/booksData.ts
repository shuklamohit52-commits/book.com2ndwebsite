import { Book } from '../types';
import { GHATNA_CHAKRA_BOOKS } from './ghatnaChakraBooks';
import { YCT_BOOKS } from './yctBooks';
import { ADDITIONAL_BOOKS } from './additionalBooks';

export const BOOKS_CATALOG: Book[] = [
  ...GHATNA_CHAKRA_BOOKS,
  ...YCT_BOOKS,
  ...ADDITIONAL_BOOKS,
];
