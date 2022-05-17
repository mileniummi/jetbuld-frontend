import { ITEM_LIMIT } from "../redux/constants/app";

export default class AppService {
  getOffset(page) {
    return page === 1 ? 0 : page * ITEM_LIMIT - ITEM_LIMIT;
  }
}
