import * as types from './constants';

export function configure(payload) {
  return { type: types.CONFIGURE_EXPORT_PDF, payload };
}

export function exportPDF() {
  return { type: types.EXPORT_PDF };
}
export function exportPDFsuccess(response) {
  return { type: types.EXPORT_PDF_SUCCESS, response };
}
