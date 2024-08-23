export const ZIP_DOWNLOAD = 'zip_download';
interface I_Message_zip_download {
    type: typeof ZIP_DOWNLOAD;
    downloadUrl_manifest: string;
}

export const ZIP_SAVED = 'zip_saved';
interface I_Message_zip_saved {
    type: typeof ZIP_SAVED;
}


export type T_Message_from_main =
    I_Message_zip_download |
    I_Message_zip_saved
    ;


export const ZIP_SUCCESS = 'zip_success';
interface I_Message_zip_success {
    type: typeof ZIP_SUCCESS;
    zip: ArrayBuffer;
}

export const ZIP_fail = 'zip_fail';
interface I_Message_zip_fail {
    type: typeof ZIP_fail;
    errMsg: string;
}

export type T_Message_from_worker =
    I_Message_zip_success |
    I_Message_zip_fail
    ;
