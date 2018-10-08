/*
 *
 * Created by Stone
 * Email: shanshang130@gmail.com
 * Date: 2018/7/14
 *
 */

import React from "react";
import { LoadingFooter, FooterStatus } from "./LoadingFooter";
import {
  ActivityIndicator,
  Animated,
  View,
  StyleSheet,
  Text
} from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ComponentIcon = Animated.createAnimatedComponent(Icon);

export class NormalFooter extends LoadingFooter {
  render() {
    const { titleColor, refreshTitle } = this.props;
    if (this.state.status === "allLoaded")
      return (
        <View style={styles.container}>
          <Text style={{ color: titleColor }}>{refreshTitle[6]}</Text>
        </View>
      );
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
    const { iconName, iconColor } = this.props;
    const s = this.state.status;
    if (s === "loading" || s === "cancelLoading" || s === "rebound") {
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
                  -this.props.maxHeight - 1,
                  -this.props.maxHeight,
                  50 - this.props.maxHeight,
                  0
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
    if (s === "dragging" || s === "waiting") {
      return refreshTitle[0];
    } else if (s === "draggingEnough") {
      return refreshTitle[1];
    } else if (s === "loading") {
      return refreshTitle[2];
    } else if (s === "draggingCancel") {
      return refreshTitle[3];
    } else if (s === "cancelLoading") {
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
