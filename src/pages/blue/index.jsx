import { useState, useEffect } from 'react';
import { View, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtModal, AtTag, AtInput, AtForm, AtButton } from 'taro-ui';
// import { BleManager } from 'react-native-ble-plx';

import './index.scss';

// export const manager = new BleManager();
export default function Index() {
  // useEffect(() => {
  //   const subscription = manager.onStateChange(state => {
  //     if (state === 'PoweredOn') {
  //       scanAndConnect();
  //       subscription.remove();
  //     }
  //   }, true);
  //   return () => subscription.remove();
  // }, [manager]);
  // function scanAndConnect() {
  //   console.log('Escanear');
  //   manager.startDeviceScan(null, null, async (error, device) => {
  //     console.log(
  //       '🚀 ~ file: index.jsx:23 ~ manager.startDeviceScan ~ device',
  //       device,
  //     );
  //     console.log(device.id);
  //     if (
  //       device.id === 'D1:42:78:C8:AB:FB' ||
  //       device.id === 'D1:42:BF:F1:D9:3C'
  //     ) {
  //       manager.stopDeviceScan();
  //       console.log('ID del dispositivo: ', device.id);
  //       console.log('Nombre del dispositivo: ', device.name);
  //       console.log('RRSI del dispositivo: ', device.rssi);
  //       console.log('MTU del dispositivo: ', device.mtu);

  //       device
  //         .connect()
  //         .then(device => {
  //           const services = device.discoverAllServicesAndCharacteristics();

  //           console.log(services);
  //         })
  //         .catch(error => {
  //           // Handle errors
  //           console.log(error);
  //         });
  //     }
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //   });
  // }
  return (
    <View className="blue">
      <View className="blue_line">
        <View>连接状态</View>
        <AtTag type="primary" circle active>
          已连接
        </AtTag>
      </View>
      <View className="blue_line">
        <View>设备名称</View>
        <View type="primary" circle active>
          CJ-86453106963
        </View>
      </View>
      <View className="blue_line">
        <AtForm className="blue_form">
          <AtInput
            name="value"
            type="text"
            placeholder="open debug"
            value={1}
            // onChange={this.handleChange.bind(this)}
          >
            <AtButton type="primary" size="small">
              发送指令
            </AtButton>
          </AtInput>
        </AtForm>
      </View>
      <View className="blue_view">
        <View className="blue_view_send">
          <View>{'16:09:30:872=>'} </View>
          <View className="blue_view_send_color">open debug</View>
        </View>
        <View className="blue_view_receive">
          <View>{'16:10:10:643=>'} </View>
          <View className="blue_view_receive_color">
            <View className="blue_view_receive_color">DISTANCE1=789mm</View>
            <View className="blue_view_receive_color">SIGNAL1=16294</View>
            <View className="blue_view_receive_color">
              Distance=789mm,Peak=16294
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
