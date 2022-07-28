import { ITEM_LIMIT } from "../constants";

const getOffset = (page: number) => {
  return page === 1 ? 0 : page * ITEM_LIMIT - ITEM_LIMIT;
};

export default getOffset;
