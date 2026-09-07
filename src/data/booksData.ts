import { Book } from '../types';
import { GHATNA_CHAKRA_BOOKS } from './ghatnaChakraBooks';
import { YCT_BOOKS } from './yctBooks';

export const BOOKS_CATALOG: Book[] = [
  ...GHATNA_CHAKRA_BOOKS,
  ...YCT_BOOKS,
];
