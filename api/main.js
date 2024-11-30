import { weccApi } from '~/service';

// 亮點計畫
export function getIndexSmartLight() {
  return weccApi.get('IndexSmartLight',);
}

// 補助計畫
export function getIndexSmartSupply() {
  return weccApi.get('IndexSmartSupply',);
}

// 耗能總覽
export function getIndexValue() {
  return weccApi.get('IndexValue',);
}

// 亮點計畫 start ==========================================
// 建築物裝置 ID
export function getSmartLightDevice(buildingCode) {
  return weccApi.get(`SmartLightDevice?buildingCode=${buildingCode}`);
}

// 建築物數據 ID
export function getSmartLightDeviceValue(deviceSeq) {
  return weccApi.get(`SmartLightDeviceValue?deviceSeq=${deviceSeq}`);
}
// 亮點計畫 end ==========================================

// 補助計畫 start ==========================================
// ID 有哪些有資料
export function getSmartSupplyIndexValue(BuildingCode) {
  return weccApi.get(`SmartSupplyIndexValue?BuildingCode=${BuildingCode}`);
}

// 年度
export function getSmartSupplyElectricYearValue(BuildingCode, year) {
  return weccApi.get(`SmartSupplyElectricYearValue?BuildingCode=${BuildingCode}&Year=${year}`);
}

// 月統計
export function getSmartSupplyElectricMonthValue(BuildingCode, year, month) {
  return weccApi.get(`SmartSupplyElectricMonthValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}`);
}

// 當日統計
export function getSmartSupplyElectricDayValue(BuildingCode) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return weccApi.get(`SmartSupplyElectricDayValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}&Day=${day}`);
}


// 補助計畫 end ==========================================


