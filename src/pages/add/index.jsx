import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Button, Picker, Text } from '@tarojs/components';
import {
  AtForm,
  AtInput,
  AtMessage,
  AtButton,
  AtList,
  AtListItem,
} from 'taro-ui';
import { apiDomain } from '../../../config/buildConfig';
import { axios } from 'taro-axios';
import sleep from '../../utils/sleep';
import './index.scss';

export default function Index() {
  const [inputInfo, setInputInfo] = useState({
    wireType: 10,
    pointType: 10,
    lineType: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  function takePhoto(key) {
    // 只允许从相机扫码
    Taro.scanCode({
      onlyFromCamera: true,
      success: res => {
        setInputInfo(Object.assign({}, inputInfo, { [key]: res.result }));
      },
    });
  }
  function changeVal(key, value) {
    setInputInfo(Object.assign({}, inputInfo, { [key]: value }));
  }
  function changeSelectorVal(type, e) {
    console.log(
      '🚀 ~ file: index.jsx ~ line 29 ~ changeSelectorVal ~ e',
      e.detail.value,
    );
    setInputInfo(
      Object.assign({}, inputInfo, { [type]: e.detail.value === 0 ? 10 : 20 }),
    );
  }
  function getLong() {
    // todo
    setInputInfo(Object.assign({}, inputInfo, { longitude: '30.5496682776' }));
    return '30.5496682776';
  }
  function getLati() {
    // todo
    setInputInfo(Object.assign({}, inputInfo, { latitude: '104.0462314030' }));
    return '104.0462314030';
  }
  function backTest() {
    Taro.redirectTo({
      url: '/pages/index/index',
    });
  }
  async function submit() {
    console.log(inputInfo);
    Taro.getStorage({
      key: 'info',
      success: async function(res) {
        console.log(res.data.token);
        try {
          setIsLoading(true);
          setIsDisabled(true);
          const resData = await axios.post(
            `${apiDomain}/api/device/add`,
            inputInfo,
            {
              withCredentials: false, // 跨域我们暂时 false
              headers: {
                token: res?.data?.token || '',
              },
            },
          );
          console.log(
            '🚀 ~ file: index.jsx ~ line 76 ~ success:function ~ resData',
            resData,
          );
          if (resData.data.code === 0) {
            setIsLoading(false);
            setIsDisabled(false);
            Taro.atMessage({
              message: resData.data.msg,
              type: 'success',
            });
            await sleep(1500);
            Taro.redirectTo({
              url: '/pages/home/index',
            });
          } else {
            setIsLoading(false);
            setIsDisabled(false);
            Taro.atMessage({
              message: resData.data.msg,
              type: 'error',
            });
            await sleep(1500);
            Taro.redirectTo({
              url: '/pages/home/index',
            });
          }
        } catch (e) {
          setIsLoading(false);
          setIsDisabled(false);
          Taro.atMessage({
            message: '网络波动请稍后再试',
            type: 'error',
          });
          await sleep(1500);
          Taro.redirectTo({
            url: '/pages/index/index',
          });
        }
      },
      fail: async function() {
        setIsLoading(false);
        setIsDisabled(false);
        Taro.atMessage({
          message: '登录过期， 请重新登录',
          type: 'warn',
        });
        await sleep(1500);
        Taro.redirectTo({
          url: '/pages/index/index',
        });
      },
    });
  }
  return (
    <View className="add">
      <AtMessage />
      <AtForm>
        <AtInput
          title="设备号"
          className="add_order_input"
          type="text"
          placeholder="请通过相机扫描"
          value={inputInfo?.deviceNum || ''}
          onChange={val => changeVal('deviceNum', val)}
        >
          <Button
            className="photo_button"
            onClick={() => takePhoto('deviceNum')}
          >
            扫码
          </Button>
        </AtInput>
        <AtInput
          title="锚段号"
          type="text"
          placeholder="请通过相机扫描"
          value={inputInfo?.anchorNum || ''}
          onChange={val => changeVal('anchorNum', val)}
          className="add_order_input"
        >
          <Button
            className="photo_button"
            onClick={() => takePhoto('anchorNum')}
          >
            扫码
          </Button>
        </AtInput>
        <AtInput
          title="杆号"
          type="text"
          placeholder="请通过相机扫描"
          value={inputInfo?.rodNum || ''}
          onChange={val => changeVal('rodNum', val)}
          className="add_order_input"
        >
          <Button className="photo_button" onClick={() => takePhoto('rodNum')}>
            扫码
          </Button>
        </AtInput>
      </AtForm>
      <Text className="page-section-title">线类型</Text>
      <Picker
        mode="selector"
        range={['接触线', '承力索']}
        onChange={val => changeSelectorVal('wireType', val)}
        className="page-section"
        value={
          inputInfo?.wireType
            ? inputInfo?.wireType === 10
              ? '接触线'
              : '承力索'
            : '接触线'
        }
      >
        <View className="picker">
          当前选择：
          {inputInfo?.wireType
            ? inputInfo?.wireType === 10
              ? '接触线'
              : '承力索'
            : '接触线'}
        </View>
      </Picker>
      <Text className="page-section-title">点类型</Text>
      <Picker
        mode="selector"
        range={['头端', '尾端']}
        onChange={val => changeSelectorVal('pointType', val)}
        className="page-section"
        value={
          inputInfo?.pointType
            ? inputInfo?.pointType === 10
              ? '头端'
              : '尾端'
            : '头端'
        }
      >
        <View className="picker">
          当前选择：
          {inputInfo?.pointType
            ? inputInfo?.pointType === 10
              ? '头端'
              : '尾端'
            : '头端'}
        </View>
      </Picker>
      <Text className="page-section-title">路类型</Text>
      <Picker
        mode="selector"
        range={['头端', '尾端']}
        onChange={val => changeSelectorVal('lineType', val)}
        className="page-section"
        value={
          inputInfo?.lineType
            ? inputInfo?.lineType === 10
              ? '上行'
              : '下行'
            : '上行'
        }
      >
        <View className="picker">
          当前选择：
          {inputInfo?.lineType
            ? inputInfo?.lineType === 10
              ? '上行'
              : '下行'
            : '上行'}
        </View>
      </Picker>
      <View className="add_order_list_space_height"></View>
      <AtForm>
        <AtInput
          title="坠砣高度"
          type="text"
          placeholder=""
          value={inputInfo?.weightHeight || ''}
          onChange={val => changeVal('weightHeight', val)}
          className="add_order_input"
        />
        <AtInput
          title="据地高度"
          type="text"
          placeholder=""
          value={inputInfo?.groundHeight || ''}
          onChange={val => changeVal('groundHeight', val)}
          className="add_order_input"
        />
        <AtInput
          title="经纬度"
          type="text"
          placeholder=""
          value={`${inputInfo?.longitude ??
            getLong()} , ${inputInfo?.latitude ?? getLati()}`}
          disabled
          className="add_order_input_long"
        />
      </AtForm>
      <View className="add_order_list_space_height"></View>
      <View className="add_order_list_button">
        <Button className="add_order_list_button_back" onClick={backTest}>
          返回
        </Button>
        <Button
          className="add_order_list_button_submit"
          onClick={submit}
          loading={isLoading}
          disabled={isDisabled}
        >
          确认
        </Button>
      </View>
      <View className="add_order_list_space_height"></View>
      {/* <View className="add_input">

      </View>
      <View className="add_input">

      </View>
      <View className="add_input_around">
        <Picker
          mode="selector"
          range={['接触线', '承力索']}
          onChange={val => changeSelectorVal('wireType', val)}
        >
          <AtList>
            <AtListItem
              title="线类型"
              extraText={
                inputInfo?.wireType
                  ? inputInfo?.wireType === 10
                    ? '接触线'
                    : '承力索'
                  : '接触线'
              }
            />
          </AtList>
        </Picker>
        <Picker
          mode="selector"
          range={['头端', '尾端']}
          onChange={val => changeSelectorVal('pointType', val)}
        >
          <AtList>
            <AtListItem
              title="点类型"
              extraText={
                inputInfo?.pointType
                  ? inputInfo?.pointType === 10
                    ? '头端'
                    : '尾端'
                  : '头端'
              }
            />
          </AtList>
        </Picker>
      </View>
      <View className="add_input_around">
        <Picker
          mode="selector"
          range={['上行', '下行']}
          onChange={val => changeSelectorVal('lineType', val)}
        >
          <AtList>
            <AtListItem
              title="路类型"
              extraText={
                inputInfo?.lineType
                  ? inputInfo?.lineType === 10
                    ? '上行'
                    : '下行'
                  : '上行'
              }
            />
          </AtList>
        </Picker>
      </View>
      <View className="add_input_around">
        <AtInput
          title="坠砣高度"
          type="text"
          placeholder=""
          value={inputInfo?.weightHeight || ''}
          onChange={val => changeVal('weightHeight', val)}
          className="add_order_input"
        />
        <AtInput
          title="据地高度"
          type="text"
          placeholder=""
          value={inputInfo?.groundHeight || ''}
          onChange={val => changeVal('groundHeight', val)}
          className="add_order_input"
        />
      </View>
      <View className="add_input">
        <AtInput
          title="经纬度"
          type="text"
          placeholder=""
          value={`${inputInfo?.longitude ??
            getLong()} , ${inputInfo?.latitude ?? getLati()}`}
          disabled
          className="add_order_input_long"
        />
      </View>
      <View className="add_order_list_button">
        <Button className="add_order_list_button_back" onClick={backTest}>
          返回
        </Button>
        <Button className="add_order_list_button_submit" onClick={submit}>
          确认
        </Button>
      </View>
      <View className="add_order_list_space_height"></View> */}
    </View>
  );
}
