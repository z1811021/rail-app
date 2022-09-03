import { useState, useEffect } from 'react';
import { View, Text, Button, Picker, ScrollView } from '@tarojs/components';
import { axios } from 'taro-axios';
import Taro from '@tarojs/taro';
import { AtList, AtListItem, AtInput, AtMessage, AtForm } from 'taro-ui';
import { apiDomain } from '../../../config/buildConfig';
import sleep from '../../utils/sleep';
import './index.scss';

export default function Index() {
  const [dateSel, setDateSel] = useState('');
  const [dateSelEnd, setDateSelEnd] = useState('');
  // const [value, setVal] = useState('')
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    Taro.getStorage({
      key: 'info',
      success: async function(res) {
        console.log(res.data.token);
        setToken(res.data.token);
        await handleSearch(pageIndex, false);
        console.log(
          '🚀 ~ file: index.jsx ~ line 24 ~ success:function ~ pageIndex',
          pageIndex,
        );
      },
      fail: async function() {
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
  }, []);
  function onDateChange(val) {
    console.log('🚀 ~ file: index.jsx ~ line 10 ~ onDateChange ~ val', val);
    setDateSel(val.detail.value);
  }
  // function handleChangeVal(val) {
  //   console.log('🚀 ~ file: index.jsx ~ line 15 ~ handleChangeVal ~ val', val)
  //   setVal(val)
  // }
  function onDateChangeEnd(val) {
    console.log('🚀 ~ file: index.jsx ~ line 10 ~ onDateChange ~ val', val);
    setDateSelEnd(val.detail.value);
  }

  const scrollToLower = () => {
    console.log(1);
    handleSearch(pageIndex, false);
  };
  const search = () => handleSearch(pageIndex, true);
  async function handleSearch(index, isNewSearch) {
    const params = {
      // scanNum: value,
      // startDate: dateSel,
      // endDate: dateSelEnd,
      pageNum: isNewSearch ? '1' : String(index),
      pageSize: '10',
      isAsc: true,
    };
    console.log(
      '🚀 ~ file: index.jsx ~ line 65 ~ handleSearch ~ params',
      params,
    );
    try {
      const resData = await axios.post(`${apiDomain}/api/device/list`, params, {
        withCredentials: false, // 跨域我们暂时 false
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      });
      console.log(
        '🚀 ~ file: index.jsx ~ line 73 ~ handleSearch ~ resData',
        resData,
      );
      if (resData.data.code === 0 && resData?.data?.rows.length !== 0) {
        isNewSearch
          ? setData(resData?.data?.rows)
          : setData(prev => [...prev, ...resData?.data?.rows]);
        isNewSearch ? setPageIndex(2) : setPageIndex(prev => prev + 1);
      } else if (resData.data.code == 500) {
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
      Taro.atMessage({
        message: '网络波动请稍后再试',
        type: 'error',
      });
      await sleep(1500);
      Taro.redirectTo({
        url: '/pages/index/index',
      });
    }
  }
  function getStatus(val) {
    console.log('🚀 ~ file: index.jsx ~ line 111 ~ getStatus ~ val', val);
    switch (val) {
      case '10':
        return <View className="mine_item_text_suc">状态: 正常</View>;
        break;
      case '20':
        return <View className="mine_item_text_warn">状态: 预警</View>;
        break;
      case '30':
        return <View className="mine_item_text_alert">状态: 报警</View>;
        break;
      case '99':
        return <View className="mine_item_text">状态: 离线</View>;
        break;
      default:
        return <View className="mine_item_text">状态: 无</View>;
        break;
    }
  }
  function update(item) {
    console.log('🚀 ~ file: index.jsx ~ line 131 ~ update ~ item', item);
  }
  return (
    <View className="mine">
      <AtMessage />
      {/* <View className="mine_date_start">
          <Picker mode="date" onChange={onDateChange}>
            <AtList>
              <AtListItem title="请选择开始日期" extraText={dateSel} />
            </AtList>
          </Picker>
        </View>
        <View className="mine_date_end">
          <Picker mode="date" onChange={onDateChangeEnd}>
            <AtList>
              <AtListItem title="请选择结束日期" extraText={dateSelEnd} />
            </AtList>
          </Picker>
        </View>
        <View>
          <Button onClick={search} className="mine_search_button">
            搜索
          </Button>
        </View> */}
      <ScrollView
        scrollY
        lowerThreshold={100}
        onScrollToLower={scrollToLower}
        className="mine_scroll"
        scrollWithAnimation
      >
        {data &&
          data.map((item, index) => {
            return (
              <View className="mine_item_con" key={index}>
                <View className="mine_item_con_flex">
                  <View className="mine_item_text">
                    设备号:
                    <Text className="mine_item_text">
                      {item?.deviceNum || ''}
                    </Text>
                  </View>
                  <Button onClick={() => update(item)}>修改</Button>
                </View>
                <View className="mine_item_text">
                  锚段:
                  <Text className="mine_item_text">
                    {item?.anchorNum || ''}
                  </Text>
                </View>
                <View className="mine_item_text">
                  杆号:
                  <Text className="mine_item_text">{item?.rodNum || ''}</Text>
                </View>
                <View className="mine_item_text">
                  {item?.wireType === 10
                    ? '线类型: 接触网'
                    : item?.wireType === 20
                    ? '线类型: 承力索'
                    : '线类型: 接触网'}
                </View>
                <View className="mine_item_text">
                  {item?.pointType === 10
                    ? '点类型: 头端'
                    : item?.pointType === 20
                    ? '点类型: 尾端'
                    : '点类型: 头端'}
                </View>
                <View className="mine_item_text">
                  {item?.lineType === 10
                    ? '路类型: 上行'
                    : item?.lineType === 20
                    ? '路类型: 下行'
                    : '路类型: 上行'}
                </View>
                <View className="mine_item_text">
                  {item?.weightHeight ? `坠砣高度: ${item?.weightHeight}` : ''}
                </View>
                <View className="mine_item_text">
                  {item?.groundHeight ? `据地高度: ${item?.groundHeight}` : ''}
                </View>
                <View className="mine_item_text">
                  {item?.createAt ? `开始时间: ${item?.createAt}` : ''}
                </View>
                <View className="mine_item_text">
                  {item?.updateAt ? `更新时间: ${item?.updateAt}` : ''}
                </View>
                <View className="mine_item_text">
                  {item?.longitude
                    ? `经纬度: ${item?.longitude || ''} , ${item?.latitude ||
                        ''}`
                    : ''}
                </View>
                {item?.status ? getStatus(item?.status) : ''}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
