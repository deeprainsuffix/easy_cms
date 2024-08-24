import React, { useCallback, useEffect, useState } from 'react';
import { codeGen, type T_region } from './codeGen';
import { DOING, FAIL, SUCCESS, UNDO } from '../Requset/index.const';
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
import { Checkbox } from "@/components/ui/checkbox"
import dayjs from 'dayjs';
import { landing_project_clearTimeMs } from "@/server/http.const";

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
    [UNDO]: '预设',
    [DOING]: '请配置页面结构',
    [SUCCESS]: '成功',
    [FAIL]: '失败',
  } as const,
  DialogDescription_text = {
    [UNDO]: '请点击“生成代码”按钮',
    [DOING]: '请稍后...',
    [SUCCESS]: '代码已生成',
    [FAIL]: '代码生成失败',
  } as const,
  DialogBtn_text = {
    [UNDO]: '开始',
    [DOING]: '生成中',
    [SUCCESS]: '开始',
    [FAIL]: '再试一次',
  };

export function CodeGen_UI() {
  const [_, setState] = useState(0);
  useEffect(() => {
    codeGen.render = () => setState(_ => _ + 1);
  }, []);

  const handleOpen = useCallback(() => {
    codeGen.open();
  }, []);

  const handle_close = useCallback(() => {
    codeGen.close();
  }, []);

  const handle_getAssets = useCallback(() => {
    codeGen.getAssets();
  }, []);

  const {
    state,
    Dialog_show,
    tip_Icon_show, tip_Icon_active, tip_text_show, tip_text,
  } = codeGen;

  return (
    <Dialog open={Dialog_show}>
      <div className='flex'>
        <Button className='w-[90px] text-center' disabled={state === DOING} onClick={handleOpen}>{btn_text[state]}</Button>
        <div className='w-[40px] flex justify-center pageParts-center' onClick={handle_getAssets}>
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
      <DialogContent className="sm:max-w-[520px]" onClose={handle_close}>
        <DialogHeader>
          <DialogTitle>配置页面结构</DialogTitle>
        </DialogHeader>
        <DialogBody />
      </DialogContent>
    </Dialog>
  )
}

function DialogBody() {
  return (
    <div>
      <PagePartSetting />
      <Assets />
    </div>
  )
}

type T_regionLabel = {
  [p in keyof T_region]: string;
}
const regionLabel: T_regionLabel = {
  RegionHeader: '顶部导航栏',
  RegionSideMenuBar: '侧边栏',
} as const;

export function PagePartSetting() {
  const handle_codeGen = useCallback(() => {
    codeGen.codeGen();
  }, []);

  const handle_setRegion = useCallback((regionKey: keyof T_region) => () => {
    codeGen.setRegion(regionKey, !region[regionKey]);
  }, []);

  const {
    state,
    region
  } = codeGen;


  return (
    <div className='flex flex-nowrap'>
      <div className='flex-grow flex-shrink flex flex-col justify-between'>
        {(Object.keys(region) as (keyof T_region)[]).map(part => (
          <div key={part} className="flex items-center space-x-2 mt-[8px]">
            <Checkbox
              disabled={state === DOING}
              checked={region[part]}
              onClick={handle_setRegion(part)}
            >
            </Checkbox>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {regionLabel[part]}
            </label>
          </div>
        ))}
      </div>
      <div className='flex-grow-0 flex-shrink-0 basis-[80px] flex justify-end'>
        {<Button type="submit" disabled={state === DOING} onClick={handle_codeGen}>{DialogBtn_text[state]}</Button>}
      </div>
    </div>
  )
}

const state_content = {
  [UNDO]: '暂无资源生成',
  [DOING]: '正在生成代码文件资源...',
  [SUCCESS]: (birthtimeMs: number) => `资源截止到${dayjs(birthtimeMs + landing_project_clearTimeMs).format('YYYY-MM-DD HH:mm:ss')}失效，请及时下载`,
  [FAIL]: '生成代码失败，请咨询管理员',
} as const;

export function Assets() {
  const handle_downloadAssets = useCallback(() => {
    codeGen.downloadAssets();
  }, []);

  const {
    state,
    data,
    disabledBtnDownloadZip
  } = codeGen;

  return (
    <div className='mt-[20px]'>
      <div className='mb-[10px]'>
        {state === SUCCESS ? state_content[SUCCESS](data ? data.birthtimeMs : 0) : state_content[state]}
      </div>
      <div className='flex justify-end'>
        {state === SUCCESS && <Button type="submit" disabled={disabledBtnDownloadZip} onClick={handle_downloadAssets}>下载文件包zip</Button>}
      </div>
    </div>
  )
}