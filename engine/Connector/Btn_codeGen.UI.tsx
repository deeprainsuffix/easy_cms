import React, { useCallback, useEffect, useState } from 'react';
import { btn_codeGen, UNDO, DOING, SUCCESS, FAIL } from './Btn_codeGen';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const btn_text = {
    [UNDO]: '生成代码',
    [DOING]: '生成中',
    [SUCCESS]: '生成代码',
    [FAIL]: '生成代码',
} as const,
    tip_Icon = {
        [UNDO]: null,
        [DOING]: <svg className="Icon_tip_codeGen doing" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5487" width="32" height="32"><path d="M540.444 272.782a129.138 129.138 0 1 1 129.138-129.138 129.138 129.138 0 0 1-129.138 129.138z" fill="#2A83C6" p-id="5488"></path><path d="M265.387 375.182a118.044 118.044 0 1 1 117.76-117.76 117.76 117.76 0 0 1-117.76 117.76z" fill="#2C8CCD" p-id="5489"></path><path d="M148.764 641.991A104.107 104.107 0 1 1 252.587 538.17a104.107 104.107 0 0 1-103.823 103.82z" fill="#4299D5" p-id="5490"></path><path d="M265.387 906.24a88.178 88.178 0 1 1 88.177-88.178 88.178 88.178 0 0 1-88.177 88.178z" fill="#58A4DB" p-id="5491"></path><path d="M540.444 1007.218a77.084 77.084 0 1 1 76.8-77.085 77.084 77.084 0 0 1-76.8 77.085z" fill="#6EB1E2" p-id="5492"></path><path d="M818.916 877.227a62.293 62.293 0 1 1 62.862-62.294 62.293 62.293 0 0 1-62.294 62.294z" fill="#84BDE7" p-id="5493"></path><path d="M933.262 589.653a51.2 51.2 0 1 1 50.916-51.2 51.2 51.2 0 0 1-50.916 51.2z" fill="#9BCAED" p-id="5494"></path><path d="M779.378 261.12a39.822 39.822 0 1 0 39.538-39.538 39.822 39.822 0 0 0-39.538 39.538z" fill="#B3D7F2" p-id="5495"></path></svg>,
        [SUCCESS]: <svg className="Icon_tip_codeGen success" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7526" width="32" height="32"><path d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM512 960c-249.6 0-448-204.8-448-448 0-249.6 204.8-448 448-448 249.6 0 448 198.4 448 448C960 761.6 761.6 960 512 960zM691.2 339.2 454.4 576 332.8 454.4c-19.2-19.2-51.2-19.2-76.8 0C243.2 480 243.2 512 262.4 531.2l153.6 153.6c19.2 19.2 51.2 19.2 70.4 0l51.2-51.2 224-224c19.2-19.2 25.6-51.2 0-70.4C742.4 320 710.4 320 691.2 339.2z" fill="#54E283" p-id="7527"></path></svg>,
        [FAIL]: <svg className="Icon_tip_codeGen fail" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7530" width="32" height="32"><path d="M969.182003 701.303054C942.98583 761.818425 907.560805 814.394635 862.909139 859.030351 818.273423 903.682017 765.86402 939.121773 705.727336 965.303215 645.576031 991.515341 581.182839 1004.606061 512.545547 1004.606061 443.925315 1004.606061 379.349482 991.515341 318.818158 965.303215 258.302785 939.121773 205.726577 903.682017 161.090861 859.030351 116.439196 814.393527 80.999438 761.818425 54.817996 701.303054 28.605873 640.772838 15.515152 576.197117 15.515152 507.575665 15.515152 438.938373 28.605873 374.545181 54.817996 314.393878 80.999438 254.257304 116.439196 201.8479 161.090861 157.212073 205.726577 112.560409 258.302785 77.135381 318.818158 50.939208 379.349482 24.743034 443.925203 11.636364 512.545547 11.636364 581.182839 11.636364 645.576031 24.742924 705.727336 50.939208 765.8628 77.1366 818.273311 112.560409 862.909139 157.212073 907.560805 201.848897 942.984611 254.258412 969.182003 314.393878 995.378179 374.545181 1008.484848 438.938373 1008.484848 507.575665 1008.484848 576.197117 995.379287 640.772838 969.182003 701.303054L969.182003 701.303054Z" fill="#FF2E00" p-id="7531"></path><path d="M512 709.220647C472.332325 709.220647 440.203301 741.349668 440.203301 781.017346 440.203301 820.68502 472.332325 852.814044 512 852.814044 551.667675 852.814044 583.796699 820.68502 583.796699 781.017346 583.796699 741.349668 551.667675 709.220647 512 709.220647L512 709.220647Z" fill="#FFFFFF" p-id="7532"></path><path d="M512 639.709091C492.184111 639.709091 476.101651 606.196596 476.101651 564.820837L440.203301 227.823683C440.203301 186.447921 472.332325 152.935427 512 152.935427 551.667675 152.935427 583.796699 186.447921 583.796699 227.823683L547.898349 564.820837C547.898349 606.196596 531.815889 639.709091 512 639.709091L512 639.709091Z" fill="#FFFFFF" p-id="7533"></path></svg>,
    } as const,
    DialogTitle_text = {
        [UNDO]: '未开始',
        [DOING]: '生成中',
        [SUCCESS]: '成功',
        [FAIL]: '失败',
    } as const,
    DialogDescription_text = {
        [UNDO]: '请点击“生成代码”按钮',
        [DOING]: '请稍后...',
        [SUCCESS]: '代码已生成',
        [FAIL]: '代码生成失败',
    } as const;

export function Btn_codeGen() {
    const [_, setState] = useState(0);
    useEffect(() => {
        btn_codeGen.render = () => setState(_ => _ + 1);
    }, []);


    const handle_codeGen = useCallback(() => {
        btn_codeGen.codeGen();
    }, []);

    const handle_codeGenAgain = useCallback(() => {
        btn_codeGen.codeGenAgain();
    }, []);

    const handle_close = useCallback(() => {
        btn_codeGen.close();
    }, []);

    const handle_getAssets = useCallback(() => {
        btn_codeGen.getAssets();
    }, []);

    const handle_downloadAssets = useCallback(() => {
        btn_codeGen.downloadAssets();
    }, []);

    const {
        state,
        Dialog_show, content,
        tip_Icon_show, tip_Icon_active, tip_text_show, tip_text
    } = btn_codeGen;

    return (
        <Dialog open={Dialog_show}>
            <div className='mpg-flex'>
                <Button className='mpg-w-[90px] mpg-text-center' disabled={state === DOING} onClick={handle_codeGen}>{btn_text[state]}</Button>
                <div className='mpg-w-[40px] mpg-flex mpg-justify-center mpg-items-center' onClick={handle_getAssets}>
                    {tip_Icon_show && (
                        <TooltipProvider>
                            <Tooltip open={tip_text_show}>
                                <TooltipTrigger asChild>
                                    <Button variant={'noBackground'} size={'noSize'} className={`${tip_Icon_active ? 'active' : ''}`}>{tip_Icon[state]}</Button>
                                </TooltipTrigger>
                                <TooltipContent>{tip_text}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
            <DialogContent className="sm:max-w-[425px]" onClose={handle_close}>
                <DialogHeader>
                    <DialogTitle>{DialogTitle_text[state]}</DialogTitle>
                    <DialogDescription>{DialogDescription_text[state]}</DialogDescription>
                </DialogHeader>
                {content}
                <DialogFooter>
                    {state === SUCCESS && <Button type="submit" onClick={handle_downloadAssets}>下载文件包zip</Button>}
                    {state === FAIL && <Button type="submit" onClick={handle_codeGenAgain}>再试一次</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}