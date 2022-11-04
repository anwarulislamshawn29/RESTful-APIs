import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  getMetaData(
    total: number,
    offset: number,
    limit: number,
    term: string,
    sort: string,
  ) {
    const pageCount = Math.ceil(total / limit);
    const currentPage = Number(offset / limit + 1);
    const previousOffset = currentPage === 1 ? null : Number(offset - limit);
    const nextOffset =
      currentPage === pageCount ? null : Number(offset + limit);

    return {
      term,
      sort,
      offset: offset ? Number(offset) : undefined,
      limit: limit ? Number(limit) : undefined,
      previousOffset,
      nextOffset,
      currentPage,
      pageCount,
      total,
    };
  }

  generatCode(prefix: string, length: number) {
    const code = Math.random().toString(36).substr(2, length);
    return `${prefix}${code}`;
  }
}
