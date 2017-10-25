import * as types from './constants';

export function configure(payload) {
  return { type: types.CONFIGURE_EXPORT_PDF, payload };
}

export function doExport() {
  return { type: types.EXPORT_PDF };
}
export function doExportSuccess(response) {
  return { type: types.EXPORT_PDF_SUCCESS, response };
}
export function resetExport() {
  return { type: types.RESET_EXPORT_PDF };
}
