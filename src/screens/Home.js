import React, {useMemo} from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import {t} from 'react-native-tailwindcss';

import data from '../json/RestaurantMenu.json';

const {
  rows: {menu},
} = data;

const VEG_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnjSaOG0_tIO2md739srmHEV_nrny0GGBpVA&usqp=CAU';

const Home = () => {
  const keyExtractor = React.useCallback((item) => item.sectionId, []);

  return (
    <FlatList
      style={[t.p3, t.mT2]}
      data={menu}
      keyExtractor={keyExtractor}
      renderItem={({item}) => <Section section={item} />}
    />
  );
};

const Section = ({section}) => {
  return useMemo(() => {
    return (
      <View>
        <View style={[t.borderB, t.pB2]}>
          <Text style={[t.textLg, t.fontBold]}>{section.sectionName}</Text>
        </View>
        {section?.items?.map((item) => (
          <View key={item.id} style={[t.mY2]}>
            <View style={[t.bgGray200, t.pX2, t.pY3, t.rounded]}>
              <Text style={[t.textGray700]}>{item.itemName}</Text>
            </View>
            <View>
              {item?.variants?.map((variant) => (
                <View
                  key={variant.id}
                  style={[
                    t.flexRow,
                    t.itemsCenter,
                    t.borderB,
                    t.borderGray300,
                    t.pY2,
                  ]}>
                  <View style={[t.hFull, t.pT3]}>
                    <Image
                      source={{uri: VEG_IMAGE}}
                      style={[t.h4, t.w4]}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={[t.flex1, t.p2]}>
                    <Text style={[t.fontBold]}>{variant.itemName}</Text>
                    <Text>&#x20B9;{variant.mrp}</Text>
                  </View>
                  <View>
                    <Pressable
                      style={[t.bgGreen900, t.pX5, t.pY2, t.roundedFull]}>
                      <Text style={[t.textWhite, t.uppercase]}>Add</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }, [section]);
};

export default Home;
