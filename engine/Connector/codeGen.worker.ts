import JSZip from 'JSZip';
import { T_Message_from_worker, type T_Message_from_main, ZIP_DOWNLOAD, ZIP_fail, ZIP_SAVED, ZIP_SUCCESS } from './codeGen.worker.type';
import { fetchReqFileWrap } from '../Requset';
import { httpUrl_prefix_assets } from '@/server/http.url';
import { I_Assets } from '@/server/Response/Handle_assets/index.const';

self.onmessage = (({ data }) => {
    zip_manager.receive(data);
});

interface I_Zip_Manager {
    manifest: I_Assets | null;
    Zip_downloader: Zip_downloader | null;
}

class Zip_Manager implements I_Zip_Manager {
    manifest: I_Zip_Manager['manifest'];
    Zip_downloader: I_Zip_Manager['Zip_downloader'];

    constructor() {
        this.manifest = null;
        this.Zip_downloader = null;
    }

    async run_zip_download(downloadUrl_manifest: string) {
        try {
            const manifest = await fetchReqFileWrap(httpUrl_prefix_assets + downloadUrl_manifest, { fileType: 'json' }) as I_Assets;
            if (!manifest) {
                throw 'manifest为空';
            }

            this.manifest = manifest;
            this.Zip_downloader = new Zip_downloader();

            const { manifest: manifest_same, ...assets_other } = manifest;
            for (const fimeName of Object.values(assets_other)) {
                this.Zip_downloader.add(fimeName, httpUrl_prefix_assets + fimeName);
            }

            const succes = await this.Zip_downloader.run();
            if (!succes) {
                throw '下载资产失败';
            }

            await this.Zip_downloader.saveResult(downloadUrl_manifest, manifest);
        } catch (err) {
            throw err;
        }
    }

    async receive(message: T_Message_from_main) {
        try {
            switch (message.type) {
                case ZIP_DOWNLOAD:
                    await this.run_zip_download(message.downloadUrl_manifest);
                    const zip = this.Zip_downloader!.result!;
                    this.sendTransfer({ type: ZIP_SUCCESS, zip }, [zip]);
                    // 其实转移之后就可以置空Zip_downloader了
                    break;
                case ZIP_SAVED:
                    this.manifest = null;
                    this.Zip_downloader = null;
                    break;
            }
        } catch (err) {
            console.log('worker中 -> reveive出错 -> ' + err);
            this.send({ type: ZIP_fail, errMsg: '' + err });
        }
    }

    async send(message: T_Message_from_worker, options?: Parameters<typeof self.postMessage>[1]) {
        self.postMessage(message, options);
    }
    async sendTransfer(message: T_Message_from_worker, transfer: Transferable[]) {
        self.postMessage(message, transfer);
    }

}

const zip_manager = new Zip_Manager();





// 这里简单写一下，不需要控制并发量
interface I_zip_downloader {
    zip: JSZip;
    pool: Function[];
    result_task: { fileName: string, data: string | null }[];
    result: ArrayBuffer | null;
    errMsg: string | null;
}

class Zip_downloader implements I_zip_downloader {
    zip: I_zip_downloader['zip'];
    pool: I_zip_downloader['pool'];
    result_task: I_zip_downloader['result_task'];
    result: I_zip_downloader['result'];
    errMsg: I_zip_downloader['errMsg'];

    constructor() {
        this.zip = new JSZip();
        this.pool = [];
        this.result_task = [];
        this.result = null;
        this.errMsg = null;
    }

    private taskGen(taskId: number, url: string) {
        return async () => {
            const blob = await fetchReqFileWrap(url, { fileType: 'plain' });
            if (!blob) {
                return
            }

            this.result_task[taskId].data = blob;
        }
    }

    public add(fileName: string, url: string) {
        const taskId = this.pool.length;
        this.pool.push(this.taskGen(taskId, url));
        this.result_task.push({ fileName, data: null });
    }

    public async run(): Promise<boolean> {
        try {
            await Promise.allSettled(this.pool.map(task => task()));
            const failed = this.result_task.filter((e) => e.data === null).map(e => e.fileName);
            if (failed.length) {
                this.errMsg = '有下载失败的资源：' + failed.join('、');
                throw this.errMsg;
            }

            return true
        } catch (err) {
            console.log(err);
            return false
        }
    }

    public async saveResult(manifest_fileName: string, manifest: I_Assets) {
        for (const { fileName, data } of this.result_task) {
            this.zip.file(fileName, data!);
        }
        this.zip.file(manifest_fileName, JSON.stringify(manifest));

        this.result = await this.zip.generateAsync({ type: 'arraybuffer' });
    }

    // public release() {
    //     // 不需要了
    // }
}