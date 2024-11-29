import { weccApi } from '~/service';

// 亮點計畫
export function getIndexSmartLight() {
  return weccApi.get('IndexSmartLight',);
}

// 補助計畫
export function getIndexSmartSupply() {
  return weccApi.get('IndexSmartSupply',);
}

