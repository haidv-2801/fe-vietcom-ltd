export const TEXT_FALL_BACK = {
  TYPE_1: '- - -',
  TYPE_2: '--',
  TYPE_3: '- -',
  TYPE_4: '---',
};

export const PATH_NAME = {
  HOME: '/trang-chu',
  REGISTER: '/dang-ky',
  LOGIN: '/dang-nhap',
  ABOUT: '/gioi-thieu',
  USER: '/nguoi-dung',
  NEWS: '/tin-tuc',
  NOTIFICATION: '/thong-bao',
  RESOURCES: '/tai-nguyen-bo-suu-tap',
  SERVICES: '/dich-vu-tien-ich',
  PRIVATE_DOCUMENTS: '/tai-lieu-noi-bo',
  BORROWING_RETURNING_BOOK: '/muon-tra-tai-lieu',
  NEW_BOOKS_INTRODUCTION: '/gioi-thieu-sach-moi',

  //admin
  ADMIN: '/admin',
  ADMIN_DASBOARD: '/admin/dashboard',
  ADMIN_POST_PAGE: '/admin/post',
  ADMIN_CREATE_POST_PAGE: '/admin/tin-tuc/post/new',
};

export const BUTTON_TYPE = {
  NORMAL: 1,
  LEFT_ICON: 2,
  RIGHT_ICON: 3,
};

export const BUTTON_SHAPE = {
  ROUND: 1,
  NORMAL: 2,
};

export const BUTTON_THEME = {
  /**
   * nền xanh chữ trắng
   */
  THEME_1: 1,
  /**
   * nền trắng chữ đen viền xanh
   */
  THEME_2: 2,
  /**
   * nền trắng viền đen
   */
  THEME_3: 3,
  /**
   * nền trắng viền đỏ chữ xanh
   */
  THEME_4: 4,
  /**
   * nền đỏ chữ trắng hover-> nền trắng viền đỏ chữ xanh
   */
  THEME_5: 5,
  /**
   * nền trắng không viền
   */
  THEME_6: 6,
};

export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
  //eslint-disable-next-line
  PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/, //ít nhất 8 kí tự
};

export const KEY_CODE = {
  ENTER: 13,
};

export const CHECKBOX_TYPE = {
  CIRCLE: 1,
  SQUARE: 2,
};

export const DATE_FORMAT = {
  TYPE_1: 'DD-MM-YYYY HH:mm:ss',
  TYPE_2: 'HH:mm DD-MM-YYYY',
  TYPE_3: 'DD-MM-YYYY',
  TYPE_4: 'DD/MM/YYYY',
};

export const OPERATOR = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  CONTAINS: 'CONTAINS',
  START_WIDTH: 'START_WIDTH',
  END_WIDTH: 'END_WIDTH',
  EQUAL: '=',
  NOT_EQUAL: '<>',
};

export const PAGEGING = [5, 10, 20, 50];

export const GUID_NULL = '00000000-0000-0000-0000-000000000000';

/**
 * Menu type trong header
 * 0: là trang html render khi đó render path dạng: /hmtl/ + slug
 * 1: là redirect đến trang khác render khi đó render path dạng: link
 * 2: là trang bình thường khi đó render path dạng: slug
 * 3: thường là menu chứa menu con khi click vào không có sk
 */
export const MENU_TYPE = {
  HTML_RENDER: 0,
  REDIRECT: 1,
  NORMAL: 2,
  NONE_EVENT: 3,
};

export const ADDRESS_TYPE = {
  IP: 0,
  MAC: 1,
};

/**
 * Số page tối đa
 */
export const MAXIMUM_PAGESIZE = 9999;

/**
 * Gắn thêm vào body filter base
 */
export const ACTIVE_RECORD_FILTER = [
  OPERATOR.AND,
  ['IsDeleted', OPERATOR.EQUAL, '0'],
  OPERATOR.AND,
  ['Status', OPERATOR.EQUAL, '1'],
];

export const STATUS_CODE = {
  UNAUTHORIZE: 401,
  BAD_REQUEST: 300,
};

export const MAXIMUM_FILE_SIZE = 1000000;

export const ACCEPT_FILE =
  '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel';

export const ACCEPT_FILE_PDF = 'application/pdf';

export const SECTION_TEXT = {
  DOCUMENT_NEW: 'Tài liệu mới',
  BORROWED_DOCUMENTS_A_LOT: 'Tài liệu mượn nhiều',
  E_DOCUMENT_NEW: 'Tài liệu số',
  BORROWED_EDOCUMENTS_A_LOT: 'Tài liệu số mượn nhiều',
};

/**
 * Các key lưu localstorage
 */
export const LOCAL_STORATE_KEY = {
  BOOK_CODE_FROM_BOOK_LENDING: 'BOOK_CODE_FROM_BOOK_LENDING',
  REMEMBER_ME: 'REMEMBER_ME',
  AVATAR: 'AVATAR',
  MEMBER_INFO: 'MEMBER_INFO',
  USER_INFO: 'USER_INFO',
  FULL_NAME: 't_full_name',
  ACCOUNT_NAME: 't_account_name',
};

export const EXTERNAL_LINK = {
  UTC: 'https://www.utc.edu.vn/',
  UTC_CONTACT: 'https://www.utc.edu.vn/lich-cong-tac#footer',
};

export const CONTACT_INFORS = {
  PHONE: '+84 24 37719534',
  HOTLINE: '+84 896931931',
  EMAIL: 'intel_info@vietcomltd.vn',
};
