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

// 數位電表 年度
export function getSmartSupplyElectricYearValue(BuildingCode, year) {
  return weccApi.get(`SmartSupplyElectricYearValue?BuildingCode=${BuildingCode}&Year=${year}`);
}

// 數位電表 月統計
export function getSmartSupplyElectricMonthValue(BuildingCode, year, month) {
  return weccApi.get(`SmartSupplyElectricMonthValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}`);
}

// 數位電表 當日統計
export function getSmartSupplyElectricDayValue(BuildingCode) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return weccApi.get(`SmartSupplyElectricDayValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}&Day=${day}`);
}

// 雨水筏基水位監測 年度
export function getSmartSupplyRainYearValue(BuildingCode, year) {
  return weccApi.get(`SmartSupplyRainYearValue?BuildingCode=${BuildingCode}&Year=${year}`);
}

// 雨水筏基水位監測 月統計
export function getSmartSupplyRainMonthValue(BuildingCode, year, month) {
  return weccApi.get(`SmartSupplyRainMonthValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}`);
}

// 雨水筏基水位監測 當日統計
export function getSmartSupplyRainDayValue(BuildingCode) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return weccApi.get(`SmartSupplyRainDayValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}&Day=${day}`);
}

// 淹水偵測器
export function getSmartSupplyFloodValue(BuildingCode) {
  return weccApi.get(`SmartSupplyFloodValue?BuildingCode=${BuildingCode}`);
}

// 數位水表 年度
export function getSmartSupplyWaterYearValue(BuildingCode, year) {
  return weccApi.get(`SmartSupplyWaterYearValue?BuildingCode=${BuildingCode}&Year=${year}`);
}

// 數位水表 月統計
export function getSmartSupplyWaterMonthValue(BuildingCode, year, month) {
  return weccApi.get(`SmartSupplyWaterMonthValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}`);
}

// 數位水表 當日統計
export function getSmartSupplyWaterDayValue(BuildingCode) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return weccApi.get(`SmartSupplyWaterDayValue?BuildingCode=${BuildingCode}&Year=${year}&Month=${month}&Day=${day}`);
}
// 補助計畫 end ==========================================


