/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/13
 *
 */

import React from "react";
import PropTypes from 'prop-types';
import { RefreshHeader, HeaderStatus } from "./RefreshHeader";
import {
  ActivityIndicator,
  Animated,
  View,
  StyleSheet,
  Text
} from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ComponentIcon = Animated.createAnimatedComponent(Icon);

export class NormalHeader extends RefreshHeader<HeaderProp> {
  render() {
    const { titleColor } = this.props;
    return (
      <View style={styles.container}>
        {this._renderIcon()}
        <View style={styles.rContainer}>
          <Text style={[styles.text, { color: titleColor }]}>
            {this._getTitle()}
          </Text>
        </View>
      </View>
    );
  }

  _renderIcon() {
    const { iconColor, iconName } = this.props;
    const s = this.state.status;
    if (s === "refreshing" || s === "cancelRefresh" || s === "rebound") {
      return <ActivityIndicator color={iconColor} />;
    }

    return (
      <ComponentIcon
        name={iconName}
        color={iconColor}
        size={24}
        style={{
          transform: [
            {
              rotate: this.props.offset.interpolate({
                inputRange: [
                  0,
                  this.props.maxHeight - 50,
                  this.props.maxHeight,
                  this.props.maxHeight + 1
                ],
                outputRange: ["0deg", "0deg", "180deg", "180deg"]
              })
            }
          ]
        }}
      />
    )
  }

  _getTitle() {
    const { refreshTitle } = this.props;
    const s = this.state.status;
    if (s === "pulling" || s === "waiting") {
      return refreshTitle[0];
    } else if (s === "pullingEnough") {
      return refreshTitle[1];
    } else if (s === "refreshing") {
      return refreshTitle[2];
    } else if (s === "pullingCancel") {
      return refreshTitle[3];
    } else if (s === "cancelRefresh") {
      return refreshTitle[4];
    } else if (s === "rebound") {
      return refreshTitle[5];
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  rContainer: {
    marginLeft: 20
  },
  text: {
    marginVertical: 5,
    color: "#666"
  }
});

// NormalHeader.defaultProps = {
//   iconColor: '#fff',
//   titleColor: '#fff',
//   iconName: 'arrow-upward',
//   refreshTitle: ['Pull down to refresh', 'Release to begin refreshing', 'Refreshing...', 'Give up refreshing', 'Refresh canceled', 'Refresh completed']
// }

// interface HeaderProp {
//   iconColor?: string;
//   titleColor?: string;
//   iconName?: string;
//   refreshTitle?: Array;
// }
